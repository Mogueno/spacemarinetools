import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

export const getLfgListings = query({
  handler: async (ctx) => {
    // TODO if you are logged in, the first listing is always the one that you are hosting

    const lfgListings = await ctx.db.query("lgfListing").collect();

    return lfgListings;
  },
});

export const getPlatforms = query({
  handler: async (ctx) => {
    const platforms = ctx.db.query("platforms").collect();

    return platforms;
  },
});

export const getRegions = query({
  handler: async (ctx) => {
    return await ctx.db.query("regions").collect();
  },
});

export const getLanguages = query({
  handler: async (ctx) => {
    return await ctx.db.query("languages").collect();
  },
});

export const getTags = query({
  handler: async (ctx) => {
    return await ctx.db.query("lookingForDefinitions").collect();
  },
});

export const getTag = query({
  args: { id: v.id("lookingForDefinitions") },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("lookingForDefinitions")
      .withIndex("by_id", (q) => q.eq("_id", id))
      .unique();
  },
});

export const updateUser = mutation({
  args: {
    name: v.string(),
    platform: v.id("platforms"),
    region: v.id("regions"),
    languages: v.array(v.id("languages")),
  },

  handler: async (ctx, args) => {
    const { name, platform, region, languages } = args;
    const user = await getCurrentUserOrThrow(ctx);

    const id = await ctx.db.insert("users", {
      name,
      platform,
      region,
      languages,
      externalId: user._id as string,
    });
    return id;
  },
});

export const createLfgListing = mutation({
  args: {
    hostUserId: v.id("users"),
    maxParticipants: v.number(),
    participants: v.array(v.id("users")),
    lookingFor: v.array(v.id("lookingForDefinitions")),
    joinCode: v.string(),
  },

  handler: async (ctx, args) => {
    const { hostUserId, maxParticipants, participants, lookingFor, joinCode } =
      args;
    const id = await ctx.db.insert("lgfListing", {
      lookingFor,
      hostUserId,
      maxParticipants,
      participants,
      joinCode,
    });
    return id;
  },
});
