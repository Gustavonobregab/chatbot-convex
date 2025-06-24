import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import OpenAI from "openai";

export const askLLM = action({
  args: {
    input: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    console.log("🔁 Starting askLLM handler...");

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("📦 Fetched OPENAI_API_KEY:", apiKey ? apiKey.slice(0, 5) + "...(truncated)" : "❌ MISSING");

    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY is missing in environment");
      throw new Error("OPENAI_API_KEY is missing in environment");
    }

    const openai = new OpenAI({ apiKey });

    console.log("📡 Fetching company content from DB...");
    const companyContent: string = await ctx.runQuery(api.companyData.getCompanyText, {});
    console.log("✅ Retrieved company content (chars):", companyContent.length);

    
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

console.log("📄 Full prompt content:\n", prompt);


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are Voding's assistant. Only respond based on the internal company information provided by the user. Do not invent or add anything beyond that. 
        
        You speak on behalf of Voding. If a user asks a question using "you", respond using "we", as if representing the Voding team.` 
        },
        { role: "user", content: prompt },
      ],
    });

    const answer = response.choices[0]?.message?.content ?? "No answer available.";
    console.log("📬 OpenAI response received (chars):", answer.length);

    return answer;
  },
});
