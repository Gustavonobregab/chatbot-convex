// convex/companyData.ts
import { query } from "./_generated/server";

export const getCompanyText = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("companyData").collect();
    return entries.map(entry => entry.text).join("\n\n");
  },
});
