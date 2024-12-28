"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { LfgGrid } from "@/components/LgfGrid";

export default function Home() {
  return (
    <div className="container flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Spacemarine tools
      </h1>
      <Authenticated>
        <SignedInContent />
      </Authenticated>
      <Unauthenticated>
        <LfgList />
      </Unauthenticated>
    </div>
  );
}

function LfgList() {
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

function SignedInContent() {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <LfgList />
    </>
  );
}
