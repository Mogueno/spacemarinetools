"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "./hooks/useCurrentUser";

export default function Home() {
  return (
    <div className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Spacemarine tools
      </h1>
      <Authenticated>
        <SignedInContent />
      </Authenticated>
      <Unauthenticated>
        <p>Click one of the buttons in the top right corner to sign in.</p>
      </Unauthenticated>
    </div>
  );
}

function SignedInContent() {
  const currentUser = useCurrentUser();

  const user = useQuery(api.users.current);

  if (currentUser.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>Welcome {(currentUser.isAuthenticated && user?.name) ?? "N/A"}!</p>
    </>
  );
}
