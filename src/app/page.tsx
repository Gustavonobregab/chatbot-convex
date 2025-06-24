"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexClientProvider } from "./convexClientProvider";

export default function Home() {
  const askQuestion = useAction(api.chat.askQuestion.askQuestion);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await askQuestion({ question });
    setAnswer(result);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
      <h1 className="text-2xl font-bold">🤖 Chatbot da Empresa</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading || !question}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Pensando..." : "Perguntar"}
        </button>
      </form>

      {answer && (
        <div className="mt-4 p-4 border rounded bg-gray-100 max-w-xl whitespace-pre-wrap">
          <strong>Resposta:</strong>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}
