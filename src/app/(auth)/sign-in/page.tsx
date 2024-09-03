"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-blue-500 px-4 rounded py-2 mt-5  text-white"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
