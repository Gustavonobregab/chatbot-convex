import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const uploadCompanyData = mutation({
  args: {
    text: v.string(),
  },
  handler: async ({ db }, { text }) => {
    await db.insert("companyData", { text });
  },
});
