"use client"; // Chỉ client component mới dùng được `useSession()`

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
