import React from "react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface TagBadgeProps {
  tagId: Id<"lookingForDefinitions">;
}

const tagColors: { [key: string]: string } = {
  Speedrun: "bg-red-100 text-red-800",
  Beginner: "bg-green-100 text-green-800",
  Experienced: "bg-blue-100 text-blue-800",
  Campaign: "bg-purple-100 text-purple-800",
  Leveling: "bg-yellow-100 text-yellow-800",
};

export function TagBadge({ tagId }: TagBadgeProps) {
  const tag = useQuery(api.myFunctions.getTag, { id: tagId });
  if (!tag) {
    return null;
  }

  const colorClass =
    tagColors[tag.definition || ""] || "bg-gray-100 text-gray-800";

  return (
    <Badge variant="default" className={`${colorClass} font-medium`}>
      {tag.definition}
    </Badge>
  );
}
