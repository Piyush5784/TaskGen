"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function SessionP({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
