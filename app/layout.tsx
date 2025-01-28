import * as React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Footer } from "@/components/layout/footer";
import MainWrapper from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Marine Tools",
  description:
    "Tools for  Marine 2 players. LFG, best builds, updates and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <MainWrapper>{children}</MainWrapper>
          <Footer>Footer below fold</Footer>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
