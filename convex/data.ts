import { query, QueryCtx } from "./_generated/server";

export const getAllTexts = query(async ({ db }: QueryCtx) => {
  return await db.query("companyData").collect();
});
