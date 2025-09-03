// app/api/chat/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

// --- ENVIRONMENT VARIABLES ---
const CHATWOOT_URL = process.env.CHATWOOT_URL || "http://localhost:3000";
const CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID || 1;
const CHATWOOT_BOT_TOKEN =
  process.env.CHATWOOT_BOT_TOKEN || process.env.CHATWOOT_API_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OGOOLUWANI_AGENT_ID = process.env.OGOOLUWANI_AGENT_ID || 1;

// --- MODEL OPTIONS ---
const MODELS = ["llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma-7b-it"];

// --- CONVERSATION STATE ---
interface ConversationState {
  messageCount: number;
  conversationHistory: Array<{ role: string; content: string }>;
  hasBeenGreeted: boolean;
  isTransferRequested: boolean;
}

const conversationStates = new Map<number, ConversationState>();

// --- MAIN HANDLER ---
export async function POST(req: NextRequest) {
  try {
    if (
      !CHATWOOT_URL ||
      !CHATWOOT_ACCOUNT_ID ||
      !CHATWOOT_BOT_TOKEN ||
      !GROQ_API_KEY
    ) {
      console.error("❌ Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = await req.json();
    console.log("📥 Webhook payload:", JSON.stringify(payload, null, 2));

    const event = payload.event;
    const conversationId = payload.conversation?.id;
    const messageContent = payload.content;
    const messageType = payload.message_type;
    const senderName = payload.sender?.name || "Guest";

    if (!conversationId) {
      return NextResponse.json({
        status: "ignored",
        reason: "No conversation ID",
      });
    }

    // Extract first name for friendliness
    const firstName = senderName.split(" ")[0] || "Guest";

    // --- INIT STATE ---
    if (!conversationStates.has(conversationId)) {
      conversationStates.set(conversationId, {
        messageCount: 0,
        conversationHistory: [],
        hasBeenGreeted: false,
        isTransferRequested: false,
      });
    }
    const convoState = conversationStates.get(conversationId)!;

    // --- GREETING ---
    if (event === "conversation_created" && !convoState.hasBeenGreeted) {
      convoState.hasBeenGreeted = true;
      await sendChatwootMessage(
        conversationId,
        `👋 Hi ${firstName}! I'm Robot, Ogooluwani’s assistant.  
I can help with project inquiries, pricing estimates, and general web development questions.  
How can I help you today?`
      );
      return NextResponse.json({ status: "greeted" });
    }

    // --- ONLY PROCESS USER MESSAGES ---
    if (
      event !== "message_created" ||
      messageType !== "incoming" ||
      !messageContent
    ) {
      return NextResponse.json({
        status: "ignored",
        reason: "Not a user message",
      });
    }

    // --- HANDLE TRANSFER ---
    if (convoState.isTransferRequested) {
      if (messageContent.toLowerCase().includes("transfer")) {
        await transferToHuman(conversationId);
        conversationStates.delete(conversationId);
        return NextResponse.json({ status: "transferred" });
      } else {
        convoState.isTransferRequested = false;
        await sendChatwootMessage(
          conversationId,
          "✅ Got it! Let's continue chatting. How else can I help you?"
        );
        return NextResponse.json({ status: "continued_chat" });
      }
    }

    // --- SAVE HISTORY ---
    convoState.messageCount++;
    convoState.conversationHistory.push({
      role: "user",
      content: messageContent,
    });
    if (convoState.conversationHistory.length > 20) {
      convoState.conversationHistory =
        convoState.conversationHistory.slice(-20);
    }

    // --- GENERATE RESPONSE ---
    const response = await generateGroqResponse(
      messageContent,
      convoState.conversationHistory,
      firstName
    );

    convoState.conversationHistory.push({
      role: "assistant",
      content: response,
    });

    if (response.includes("TRANSFER_REQUEST")) {
      convoState.isTransferRequested = true;
      const cleanResponse = response.replace("TRANSFER_REQUEST", "").trim();

      await sendChatwootMessage(
        conversationId,
        `${cleanResponse}\n\n👉 Please choose:\n- Type *transfer* to speak directly with Ogooluwani\n- Or continue chatting with me`
      );
    } else {
      await sendChatwootMessage(conversationId, response);
    }

    return NextResponse.json({ status: "processed" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// --- GROQ RESPONSE GENERATOR ---
async function generateGroqResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  firstName: string
): Promise<string> {
  const systemPrompt = `You are Robot, Ogooluwani's AI assistant.  

ABOUT OGOOLUWANI:  
- Male full-stack developer (React, Next.js, Node.js).  
- Builds responsive, accessible web applications.  
- Based in Nigeria 🇳🇬 — pricing may be in USD or NGN depending on the client.  
- Provides competitive pricing based on project scope.  

WHAT YOU CAN DO:  
- Answer questions about web development services.  
- Provide general pricing guidance (always say final confirmation is from Ogooluwani).  
- Discuss project requirements and timelines.  
- Explain technical concepts simply.  

PRICING GUIDELINES:  
- Small website: $500–$1500  
- Medium web app: $1500–$5000  
- Complex app: $5000+  
- Always note: "Exact pricing depends on specific requirements."  

TRANSFER RULES:  
If asked about:  
- Personal matters  
- Final contract/pricing confirmation  
- Scheduling a meeting  
- Anything outside web development  
Respond with: "I cannot answer that specifically. Would you like me to transfer you to Ogooluwani? TRANSFER_REQUEST"  

STYLE:  
- Friendly but professional  
- Use UK English spelling  
- Be concise but helpful  
- Always address the client by first name: ${firstName}`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODELS[0],
          messages: [
            { role: "system", content: systemPrompt },
            ...history.slice(-6),
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ Groq API error:", error);
    return "⚠️ I'm having some technical difficulties. You can try again, or ask me to transfer you to Ogooluwani.";
  }
}

// --- CHATWOOT MESSAGE ---
async function sendChatwootMessage(conversationId: number, message: string) {
  try {
    const response = await fetch(
      `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_access_token: CHATWOOT_BOT_TOKEN ?? "",
        },
        body: JSON.stringify({ content: message, message_type: "outgoing" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Chatwoot API error: ${response.status}`);
    }
  } catch (error) {
    console.error("❌ Failed to send message to Chatwoot:", error);
  }
}

// --- TRANSFER TO HUMAN ---
async function transferToHuman(conversationId: number) {
  try {
    await sendChatwootMessage(
      conversationId,
      "🔀 Transferring you to Ogooluwani. He’ll be with you shortly!"
    );

    if (OGOOLUWANI_AGENT_ID) {
      await fetch(
        `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/assignments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_access_token: CHATWOOT_BOT_TOKEN ?? "",
          },
          body: JSON.stringify({ assignee_id: OGOOLUWANI_AGENT_ID }),
        }
      );
    }
  } catch (error) {
    console.error("❌ Transfer failed:", error);
  }
}
