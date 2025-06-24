import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const askLLM = useAction(api.askLLM.askLLM);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsFirstMessage(false);
    setIsLoading(true);

    try {
      const botReply = await askLLM({ input: userMessage.content });

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Convex/LLM error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          content: "⚠️ There was an error. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptText = `What does Voding do?`;

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isFirstMessage,
    sendMessage,
    promptText,
  };
}
