import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companyData: defineTable({
    text: v.string(),
  }),
});