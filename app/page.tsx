"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignedInContent } from "@/components/SignedInContent";

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
        <p className="text-center">Please sign in to see the list of LFGs</p>
      </Unauthenticated>
    </div>
  );
}
