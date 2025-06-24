import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import OpenAI from "openai";

export const askLLM = action({
  args: {
    input: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // ✅ Verifica e instancia AQUI dentro
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is missing in environment");
    }

    const openai = new OpenAI({ apiKey });

    const companyContent: string = await ctx.runQuery(api.companyData.getCompanyText, {});

    const prompt: string = `
You are Voding's friendly assistant. Always answer clearly, directly, and only based on the company's information below.

If the question is outside the company scope, politely say you can only answer questions about Voding.

--- Company Info ---
${companyContent}
--------------------

User's question:
${args.input}

Answer:
`;


    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant for a digital agency." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0]?.message?.content ?? "No answer available.";
  },
});
