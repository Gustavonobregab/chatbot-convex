import { query, QueryCtx } from "./_generated/server";
export { getCompanyText } from "./companyData";
export { askLLM } from "./askLLM";


export const getAllTexts = query(async ({ db }: QueryCtx) => {
  return await db.query("companyData").collect();
});
