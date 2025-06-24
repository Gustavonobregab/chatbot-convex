interface MessageContentProps {
  content: string | null;
}

export const MessageContent = ({ content }: MessageContentProps) => {
  if (!content) {
    return <span>⏳ Carregando...</span>;
  }

  return (
    <div className="text-sm font-normal leading-relaxed break-words overflow-hidden">
      {content}
    </div>
  );
};
