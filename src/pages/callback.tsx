"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import userManager from "@/lib/auth";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      router.push("/");
    });
  }, []);

  return <p>Processing login...</p>;
}
