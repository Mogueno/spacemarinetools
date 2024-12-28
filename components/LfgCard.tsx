import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, MapPin } from "lucide-react";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";
import { TagBadge } from "./TagBadge";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface LfgCardProps {
  hostId: Id<"users">;
  participantsIds: Id<"users">[];
  maxParticipants: number;
  inviteCode: string;
  tags: Id<"lookingForDefinitions">[];
  region: string;
  isHostOnline: boolean;
}

export function LfgCard({
  hostId,
  isHostOnline,
  participantsIds,
  maxParticipants,
  inviteCode,
  tags,
  region,
}: LfgCardProps) {
  const [isFull, setIsFull] = useState(false);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = (inviteCode: string) => {
    copyToClipboard(inviteCode)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    setIsFull(participantsIds.length >= maxParticipants);
  }, [participantsIds, maxParticipants]);

  const user = useQuery(api.users.getById, { id: hostId });
  const participants = useQuery(api.users.getByIds, { ids: participantsIds });

  return (
    <Card className={`bg-gray-900 w-full ${isFull ? "opacity-50" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${isHostOnline ? "bg-green-500" : "bg-gray-300"}`}
              ></span>
              <span className="text-sm text-gray-500">
                {isHostOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {region}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <TagBadge key={index} tagId={tag} />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">
            Participants ({participantsIds?.length}/{maxParticipants})
          </h4>
          <div className="flex space-x-2">
            {participants?.map((participant) => (
              <Avatar key={participant._id}>
                <AvatarImage src={""} alt={participant.name} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {[
              ...Array(Math.max(0, maxParticipants - participantsIds.length)),
            ].map((_, i) => (
              <Avatar key={`empty-${i}`}>
                <AvatarFallback className="bg-gray-200"></AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {!isFull && (
          <div className="flex items-center space-x-2">
            <Input value={inviteCode} readOnly className="flex-1" />
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleCopy(inviteCode)}
              disabled={isCopied}
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Badge
          variant={isFull ? "secondary" : "default"}
          className="w-full justify-center"
        >
          {isFull
            ? "Group is full"
            : `${maxParticipants - participantsIds.length} spot${maxParticipants - participantsIds.length !== 1 ? "s" : ""} available`}
        </Badge>
      </CardFooter>
    </Card>
  );
}
