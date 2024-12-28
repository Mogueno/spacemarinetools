import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    platforms: defineTable({
      name: v.string(),
    }),
    regions: defineTable({
      name: v.string(),
    }),
    languages: defineTable({
      name: v.string(),
    }),
    lookingForDefinitions: defineTable({
      definition: v.string(),
    }),
    users: defineTable({
      name: v.string(),
      platform: v.optional(v.id("platforms")),
      region: v.optional(v.id("regions")),
      languages: v.optional(v.array(v.id("languages"))),
      avatarUrl: v.optional(v.string()),
      externalId: v.string(),
    }).index("by_external_id", ["externalId"]),
    lgfListing: defineTable({
      hostUserId: v.id("users"),
      joinCode: v.string(),
      maxParticipants: v.number(),
      participants: v.array(v.id("users")),
      lookingFor: v.array(v.id("lookingForDefinitions")),
      isHostOnline: v.optional(v.boolean()),
      isLfgFull: v.optional(v.boolean()),
    }),
  },
  { schemaValidation: true },
);
