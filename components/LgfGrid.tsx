import React from "react";
import { LfgCard } from "./LfgCard";
import { Doc } from "@/convex/_generated/dataModel";

interface LfgGridProps {
  lfgList: Doc<"lgfListing">[];
  region: string;
}

export function LfgGrid({ lfgList, region }: LfgGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {lfgList.map((lfg) => (
        <LfgCard
          key={lfg._id}
          hostId={lfg.hostUserId}
          participantsIds={lfg.participants}
          maxParticipants={lfg.maxParticipants}
          inviteCode={lfg.joinCode}
          tags={lfg.lookingFor}
          region={region}
          isHostOnline
        />
      ))}
    </div>
  );
}
