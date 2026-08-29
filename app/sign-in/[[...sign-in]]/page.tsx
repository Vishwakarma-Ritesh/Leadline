import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

import { Brand } from "@/components/brand";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access the Leadline leads dashboard.",
};

export default function SignInPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f7f9fc] px-4 py-12">
      <div className="pointer-events-none absolute -top-48 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-[#dce5ff]/70 blur-3xl" />
      <div className="relative flex w-full flex-col items-center">
        <Brand className="mb-8" />
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </main>
  );
}
