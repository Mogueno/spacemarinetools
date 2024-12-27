"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { ScrollArea } from "../ui/scroll-area";
import { ResponsiveSidebarButton } from "./responsive-sidebar-button";
import { StickyHeader } from "./sticky-header";
import { StickySidebar } from "./sticky-sidebar";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

function MainWrapper({ children }: { children: React.ReactNode }) {
  const sidebar = (
    <div className="m-2 grid grid-cols-1 space-y-2">
      <Link href="/lfg">
        <p className="text-lg p-2 bg-green-800 text-gray-50 rounded w-100">
          LFG (Looking for Group){" "}
        </p>{" "}
      </Link>
      <p className="text-lg p-2 bg-gray-800 text-gray-500 rounded">
        Builds (Coming soon)
      </p>
    </div>
  );
  return (
    <main className="min-h-[calc(100vh-(3.25rem+1px))]">
      <StickyHeader className="p-2 flex items-center justify-between h-[3.25rem]">
        <div className="flex justify-start sm:w-full md:justify-end items-center w-full">
          <SignInAndSignUpButtons />
        </div>
        <ResponsiveSidebarButton className="sm:hidden">
          <div className="sm:hidden fixed bg-background w-screen top-[calc(3.25rem+1px)] h-[calc(100vh-(3.25rem+1px))]">
            <ScrollArea className="h-full">{sidebar}</ScrollArea>
          </div>
        </ResponsiveSidebarButton>
      </StickyHeader>
      <div className="container sm:grid grid-cols-[240px_minmax(0,1fr)]">
        <StickySidebar className="hidden sm:block top-[calc(3.25rem+1px)] h-[calc(100vh-(3.25rem+1px))]">
          {sidebar}
        </StickySidebar>
        {children}
      </div>
    </main>
  );
}

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

export default MainWrapper;
