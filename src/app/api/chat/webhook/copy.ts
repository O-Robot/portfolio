// app/api/chat/webhook/route.ts
// ---------------------------------------------
// Chatwoot bot webhook with:
//  - Auto model switching (keyword heuristics + fallbacks on rate limit)
//  - 20 user-message limit (bot replies not counted)
//  - Stop responding when a human agent is assigned
//  - Context via summary of last 20 user messages
// ---------------------------------------------

import { NextRequest, NextResponse } from "next/server";

// ==== ENV ====
// Required:
//   CHATWOOT_URL              (e.g. "http://localhost:3000" or "https://<ngrok>.ngrok-free.app")
//   CHATWOOT_ACCOUNT_ID       (e.g. "1")
//   CHATWOOT_BOT_TOKEN        (Bot Access Token)
//   GROQ_API_KEY
const CHATWOOT_URL =
  process.env.CHATWOOT_URL || "https://57287ec6edbc.ngrok-free.app/";
const CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID || "1";
const CHATWOOT_BOT_TOKEN = process.env.CHATWOOT_API_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

// ==== In-memory stores (replace with Redis/DB in prod) ====
type ConvoId = number;
const userCounts: Record<ConvoId, number> = {}; // counts ONLY user messages
const userHistory: Record<ConvoId, string[]> = {}; // last ~20 user messages (strings only)
const convoWelcomed: Record<ConvoId, boolean> = {}; // avoid duplicate welcome
const convoSummaryCache: Record<ConvoId, string> = {}; // last computed summary

// ==== Models & routing ====
// Groq model names (adjust to what your account has access to).
// We'll pick dynamically based on content and fall back on errors/429.
const MODELS = {
  FAST: "llama-3.1-8b-instant",
  STRONG: "llama-3.1-70b-versatile",
  ALT: "gemma-7b-it",
} as const;

// Heuristic: detect developer-ish inputs (logs, stack traces, commands, code).
function isDeveloperQuery(text: string): boolean {
  const t = text.toLowerCase();

  // quick signals
  if (t.includes("```") || t.includes("stack trace") || t.includes("traceback"))
    return true;
  if (
    /\b(error|exception|undefined|referenceerror|typeerror|syntaxerror|importerror)\b/.test(
      t
    )
  )
    return true;

  // tech keywords
  const keywords = [
    "nextjs",
    "next.js",
    "react",
    "node",
    "express",
    "nginx",
    "docker",
    "kubernetes",
    "k8s",
    "redis",
    "postgres",
    "mysql",
    "sqlite",
    "mongodb",
    "prisma",
    "sequelize",
    "typeorm",
    "django",
    "rails",
    "laravel",
    "ngrok",
    "webhook",
    "cors",
    "graphql",
    "rest",
    "jwt",
    "oauth",
    "sso",
    "npm",
    "yarn",
    "pnpm",
    "npx",
    "ts-node",
    "vite",
    "webpack",
    "babel",
    "typescript",
    "tsx",
    "jsx",
    "python",
    "rust",
    "go",
    "golang",
    "java",
    "c#",
    "c++",
    "bash",
    "zsh",
    "curl",
    "wget",
    "regex",
    "http",
    "https",
    "status code",
    "proxy",
    "load balancer",
    "ingress",
  ];
  if (keywords.some((k) => t.includes(k))) return true;

  // looks like a command line or log
  if (/^\s*(\$|>|\#)\s+\S+/.test(text)) return true; // shell prompt lines
  if (/\sat\s.+\:\d+\:\d+/.test(text)) return true; // stack frames
  if (/\bGET|POST|PUT|DELETE|PATCH\b\s+\/\S+/.test(text)) return true; // HTTP logs

  return false;
}

// Heuristic: pick initial model based on content length & dev-ness.
function pickPrimaryModel(text: string): string {
  const lengthy = text.length > 700 || text.split("\n").length > 20;
  const dev = isDeveloperQuery(text);
  if (dev && lengthy) return MODELS.STRONG; // deep reasoning on dev logs
  if (dev) return MODELS.STRONG; // keep quality for dev replies
  if (lengthy) return MODELS.STRONG; // longer non-dev: better quality
  return MODELS.FAST; // quick generic replies
}

// Call Groq with automatic fallback on 429/5xx and network errors.
// We also include a compressed context (summary of last 20 user messages) in the system prompt.
async function callGroqWithFallback(opts: {
  currentUserMessage: string;
  summary: string; // summary of last 20 user messages
  recentUserBullets: string[]; // a few recent user-only snippets
  primaryModel: string;
  fallbacks?: string[];
}): Promise<string> {
  const { currentUserMessage, summary, recentUserBullets, primaryModel } = opts;
  const fallbacks = opts.fallbacks ?? [MODELS.FAST, MODELS.ALT];

  const messages = [
    {
      role: "system",
      content: [
        "You are a concise, accurate assistant.",
        "Use the conversation context below. If the user asks for code, provide minimal, runnable snippets.",
        "",
        "=== Prior conversation (user-only) summary ===",
        summary || "(no prior summary)",
        "",
        "=== Recent user-only snippets ===",
        ...(recentUserBullets.length ? recentUserBullets : ["(none)"]),
        "",
        "When uncertain, ask a brief clarifying question before proposing a fix.",
      ].join("\n"),
    },
    { role: "user", content: currentUserMessage },
  ];

  const tryModels = [primaryModel, ...fallbacks].filter(Boolean);

  for (const model of tryModels) {
    try {
      const resp = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.2,
          }),
        }
      );

      if (!resp.ok) {
        const text = await resp.text();
        console.warn(`[Groq:${model}] non-OK ${resp.status}: ${text}`);
        // If rate-limited or server error, try next model
        if (resp.status === 429 || (resp.status >= 500 && resp.status < 600)) {
          continue;
        }
        // For other errors, also try next model (best-effort)
        continue;
      }

      const data = await resp.json();
      const out = data?.choices?.[0]?.message?.content?.trim();
      if (out) return out;
      // If no content, try next model
    } catch (e) {
      console.warn(`[Groq:${model}] request failed, trying fallback`, e);
      // network error → try next model
      continue;
    }
  }

  // Last resort
  return "I’m having trouble reaching my AI models right now. Please try again in a moment or ask for a human agent 🙏.";
}

// Maintain user-only history (cap to last 20)
function pushUserHistory(convoId: ConvoId, content: string) {
  if (!userHistory[convoId]) userHistory[convoId] = [];
  userHistory[convoId].push(content);
  if (userHistory[convoId].length > 20) {
    userHistory[convoId] = userHistory[convoId].slice(-20);
  }
}

// Build a very small list of recent user snippets (last 3) for recency cues
function recentUserBullets(convoId: ConvoId): string[] {
  const arr = userHistory[convoId] || [];
  const last3 = arr.slice(-3);
  return last3.map(
    (m, i) => `• [U-${arr.length - (last3.length - i) + 1}] ${truncate(m, 220)}`
  );
}

// Truncate helper
function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

// Summarize last 20 user-only messages via a quick model (FAST) and cache it.
// We recompute every time to keep it simple; you can memoize if needed.
async function summarizeUserHistory(convoId: ConvoId): Promise<string> {
  const items = userHistory[convoId] || [];
  if (!items.length) return "";
  const joined = items.map((m, i) => `(${i + 1}) ${m}`).join("\n");

  const prompt =
    "Summarize the following user-only messages into 4-6 bullet points capturing goals, constraints, decisions, and pending questions. " +
    "Do not invent details.\n\n" +
    joined;

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.FAST, // use a cheap/fast model for summaries
      messages: [
        {
          role: "system",
          content: "You summarize user conversations faithfully and concisely.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
    }),
  });

  if (!resp.ok) {
    console.warn("Summary call failed:", await resp.text());
    return convoSummaryCache[convoId] || ""; // fallback to last summary if any
  }

  const data = await resp.json();
  const summary = data?.choices?.[0]?.message?.content?.trim() || "";
  convoSummaryCache[convoId] = summary;
  return summary;
}

// Send a message back to Chatwoot (as bot)
async function sendChatwootMessage(convoId: ConvoId, content: string) {
  const url = `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${convoId}/messages`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_access_token: CHATWOOT_BOT_TOKEN,
      // This header helps bypass ngrok's browser banner if you're tunneling your Chatwoot
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      content,
      message_type: "outgoing",
      private: false,
    }),
  });

  const text = await resp.text();
  console.log("Chatwoot send status:", resp.status, text);
}

// Clear state when conversation is assigned to a human (nice hygiene)
function clearConvoState(convoId: ConvoId) {
  delete userCounts[convoId];
  delete userHistory[convoId];
  delete convoWelcomed[convoId];
  delete convoSummaryCache[convoId];
}

// ====== Main handler ======
export async function POST(req: NextRequest) {
  // Basic sanity for missing keys
  if (!GROQ_API_KEY || !CHATWOOT_BOT_TOKEN) {
    console.error("Missing GROQ_API_KEY or CHATWOOT_BOT_TOKEN env.");
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    console.log("Webhook loaded");
    console.log("Incoming webhook:", body);

    const event = body.event as string;
    const convoId: ConvoId | undefined = body?.conversation?.id;
    const isIncoming = body?.message_type === "incoming";
    const content: string | undefined = body?.content;
    const assignee = body?.conversation?.meta?.assignee;

    // Without a conversation, we can't act
    if (!convoId) {
      console.log("No conversation id in payload; ignoring.");
      return NextResponse.json({ status: "ignored" });
    }

    // If a human agent is assigned, the bot must stay silent (and we wipe counters)
    if (assignee) {
      console.log(`Conversation ${convoId} has human assignee → bot exits.`);
      await fetch(
        `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${convoId}/toggle_typing_status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_access_token: CHATWOOT_BOT_TOKEN,
          },
          body: JSON.stringify({ typing_status: "off" }),
        }
      );
      clearConvoState(convoId);
      return NextResponse.json({ status: "skipped_agent_assigned" });
    }

    // Welcome on conversation creation (only once)
    if (event === "conversation_created") {
      if (!convoWelcomed[convoId]) {
        convoWelcomed[convoId] = true;
        await sendChatwootMessage(
          convoId,
          "👋 Hi there! I’m your assistant. Ask me anything—tech, debugging, or general questions."
        );
      }
      return NextResponse.json({ status: "ok" });
    }

    // Only reply to actual user messages
    if (
      event === "message_created" &&
      isIncoming &&
      typeof content === "string"
    ) {
      // Count USER messages for the 20-limit; bot replies are NOT counted
      userCounts[convoId] = (userCounts[convoId] || 0) + 1;
      console.log(`User count for convo ${convoId}:`, userCounts[convoId]);

      // If limit exceeded → stop replying (don't count bot reply), optionally nudge for human
      if (userCounts[convoId] > 20) {
        console.log(
          `Convo ${convoId} exceeded 20 user messages → stop replying.`
        );
        await sendChatwootMessage(
          convoId,
          "You’ve reached my auto-reply limit. I’ll let a human agent help from here. 🙏"
        );
        return NextResponse.json({ status: "limit_reached" });
      }

      // Track user history (user-only)
      pushUserHistory(convoId, content);

      // Summarize last 20 user messages for context
      const summary = await summarizeUserHistory(convoId);

      // Pick initial model based on content (auto-switching)
      const primaryModel = pickPrimaryModel(content);

      // Also pass a tiny list of the last 3 user snippets for recency
      const bullets = recentUserBullets(convoId);

      // Query Groq with fallback if primary is rate-limited or errors
      const aiText = await callGroqWithFallback({
        currentUserMessage: content,
        summary,
        recentUserBullets: bullets,
        primaryModel,
        // Fallback chain tries FAST, then ALT (Gemma)
        fallbacks:
          primaryModel === MODELS.STRONG
            ? [MODELS.FAST, MODELS.ALT]
            : [MODELS.STRONG, MODELS.ALT],
      });

      // Send the AI reply
      await sendChatwootMessage(convoId, aiText);

      return NextResponse.json({ status: "ok" });
    }

    // Ignore anything else (e.g., webwidget_triggered, outgoing echoes, etc.)
    console.log(`Ignoring event: ${event}`);
    return NextResponse.json({ status: "ignored" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
