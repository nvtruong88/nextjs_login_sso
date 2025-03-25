"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginButton() {

  return ( <button onClick={() => signIn("identityserver")}>Sign in</button>);
}
