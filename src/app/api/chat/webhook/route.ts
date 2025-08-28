import { NextResponse } from "next/server";

// Replace with your Chatwoot API key
const CHATWOOT_API_KEY = process.env.CHATWOOT_API_KEY;
// Replace with your Chatwoot instance URL
const CHATWOOT_URL =
  process.env.CHATWOOT_URL || "https://2ca5ac3ce5cd.ngrok-free.app/";

export async function POST(req: Request) {
  console.log("Webhook loaded");
  try {
    const body = await req.json();
    const { event, data } = body;

    if (!data?.content || !data?.conversation?.id) {
      console.log("Invalid payload:", body);
      return NextResponse.json(
        { status: "error", message: "Invalid payload" },
        { status: 400 }
      );
    }

    const conversationId = data.conversation.id;
    const accountId = data.account?.id || process.env.CHATWOOT_ACCOUNT_ID;
    const incomingMessage = data.content.toLowerCase();
    console.log("Incoming message:", incomingMessage);
    console.log("Incoming Data Act ID:", data.account?.id);
    console.log("Incoming Data Convo ID:", data.conversation?.id);
    let botReply: string | null = null;

    if (incomingMessage.includes("hello")) {
      botReply = "Hello 👋! I’m your assistant bot. How can I help?";
    } else if (incomingMessage.includes("pricing")) {
      botReply = "Our pricing starts at $99/month.";
    } else {
      botReply = "I’m still learning 🤖. A human will reply soon!";
    }

    // Send message back to Chatwoot
    if (botReply) {
      try {
        const response = await fetch(
          `${CHATWOOT_URL}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`,
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              api_access_token: CHATWOOT_API_KEY ?? "",
            }),
            body: JSON.stringify({
              content: botReply,
              message_type: 1, // 1 = outgoing message from inbox/bot
            }),
          }
        );
        console.log("Chatwoot API response status:", response.status);
      } catch (err) {
        console.error("Failed to send message to Chatwoot:", err);
      }
    }

    return NextResponse.json({ status: "ok", botReply });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { status: "error", message: "Internal error" },
      { status: 500 }
    );
  }
}
