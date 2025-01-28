import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { LfgGrid } from "./LgfGrid";

export function LfgList() {
  const lfgList = useQuery(api.myFunctions.getLfgListings);

  if (!lfgList) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <LfgGrid lfgList={lfgList} region="NA" />
    </div>
  );
}
