import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getLfgListings = query({
  handler: async (ctx) => {
    // TODO if you are logged in, the first listing is always the one that you are hosting

    const lfgListings = ctx.db.query("lgfListing").collect();

    return lfgListings;
  },
});

export const getUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const user = ctx.db
      .query("users")
      .withIndex("by_external_id", (q) =>
        q.eq("externalId", identity.id as string),
      )
      .unique();

    return user;
  },
});

export const getPlatforms = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const platforms = ctx.db.query("platforms").collect();

    return platforms;
  },
});

export const getRegions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const regions = ctx.db.query("regions").collect();

    return regions;
  },
});

export const getLanguages = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const languages = ctx.db.query("languages").collect();

    return languages;
  },
});

export const getLookingForDefinitions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const lookingForDefinitions = ctx.db
      .query("lookingForDefinitions")
      .collect();

    return lookingForDefinitions;
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
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("non authenticated");
    }

    const id = await ctx.db.insert("users", {
      name,
      platform,
      region,
      languages,
      externalId: identity.id as string,
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
    isHostOnline: v.boolean(),
    isLfgFull: v.boolean(),
  },

  handler: async (ctx, args) => {
    const {
      hostUserId,
      maxParticipants,
      participants,
      lookingFor,
      isHostOnline,
      isLfgFull,
    } = args;
    const id = await ctx.db.insert("lgfListing", {
      lookingFor,
      hostUserId,
      maxParticipants,
      participants,
      isHostOnline,
      isLfgFull,
    });
    return id;
  },
});
