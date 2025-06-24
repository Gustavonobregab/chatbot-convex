import { Components } from "react-markdown";
import { CodeBlock } from "@/app/components/CodeBlock";

export const useMarkdown = () => {
  const components: Components = {
    pre: ({ children }) => (
      <pre className="bg-background/50 p-2 rounded-md overflow-x-auto max-w-full text-black dark:text-white">
        {children}
      </pre>
    ),
    code: ({ children, className, node, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "";
      const isInline = node?.position?.start.line === node?.position?.end.line;

      return (
        <CodeBlock
          code={String(children)}
          language={lang}
          isInline={isInline}
          {...props}
        />
      );
    },
  };

  return { components };
};
