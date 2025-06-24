import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { User } from "lucide-react";
import { MessageContent } from "./MessageContent";

interface ChatMessageProps {
  message: {
    id: string;
    sender: "user" | "bot";
    content: string;
    timestamp: Date;
  };
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex gap-3 p-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0 bg-green-100">
        <AvatarFallback className={isUser ? "bg-green-abc" : "bg-secondary"}>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col max-w-[80%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-2 py-2 rounded-2xl shadow-sm w-full ${
            isUser
              ? "bg-green-abc rounded-br-md"
              : "bg-gray-100 border rounded-bl-md"
          }`}
        >
          <MessageContent content={message.content} />
        </div>

        <span className="text-xs text-gray-400 mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
