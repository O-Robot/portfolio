"use client";

import { useState } from "react";
import { askBot } from "@/utils/robot";

export default function ChatComponent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    try {
      const res = await askBot(question);
      setAnswer(res.text ?? JSON.stringify(res));
    } catch (err: any) {
      console.error(err);
      setAnswer(err || "❌ Bot not responding. Check Flowise.");
    }
  };

  return (
    <div className="p-4 pt-40">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        className="border p-2 w-full"
      />
      <button
        onClick={handleAsk}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ask Bot
      </button>

      {answer && <p className="mt-4 p-2 bg-gray-100">{answer}</p>}
    </div>
  );
}
