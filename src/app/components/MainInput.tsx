import { Loader2 } from "lucide-react";
import React, { useRef } from "react";

// Ícone de envio mockado (substituir depois pelo ícone real)
const IconSubmit = () => (
  <span className="inline-block w-5 h-5 text-white text-sm px-2">→</span>
);

export interface MainInputProps {
  value: string;
  onChange: (s: string) => void;
  onSubmit: (s: string) => void;
  isLoading: boolean;
}

export default function MainInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: MainInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  const onPressSubmitButton = () => {
    onSubmit(value);
  };

  return (
    <div
      className="
        flex flex-col w-full max-w-3xl rounded-2xl h-full
        bg-[#F6F8FA] 
        focus-within:ring-1 focus-within:ring-green-abc
        focus-within:shadow-[0_0_16px] focus-within:shadow-green-abc
        focus-within:outline-none
        px-4 pt-5 pb-3
        z-1
      "
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextareaChange}
        placeholder="I want to know..."
        className="
              w-full h-full resize-none
              text-[#121217] text-base font-normal
              placeholder-[#7A7A8C] focus:outline-none
            "
        onKeyDown={handleKeyPress}
      />

      <div className="flex flex-1 justify-end">
        <button
          disabled={isLoading || value.length == 0}
          onClick={onPressSubmitButton}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-auto bg-green-abc rounded-full"
        >
          {!isLoading ? (
            <IconSubmit />
          ) : (
            <Loader2 className="w-5 h-5 animate-spin m-2" />
          )}
        </button>
      </div>
    </div>
  );
}
