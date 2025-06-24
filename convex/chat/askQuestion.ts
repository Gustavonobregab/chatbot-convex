import { action } from "../_generated/server";
import { api } from "../_generated/api";
import { v } from "convex/values";

export const askQuestion = action({
  args: {
    question: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const texts = await ctx.runQuery(api.data.getAllTexts, {});

    const context = texts.map((doc) => doc.text).join("\n\n");

    return `🤖 [RESPOSTA MOCKADA]

📥 Pergunta: "${args.question}"
Lidos ${texts.length} textos do banco. Exemplo de conteúdo:
${context.slice(0, 200)}...`;
  },
});
