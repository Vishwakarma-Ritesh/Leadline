"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b border-[#e8ebf0] bg-white">
        <div className="mx-auto flex h-16 w-[min(100%-2rem,80rem)] items-center sm:w-[min(100%-3rem,80rem)]">
          <Brand />
        </div>
      </header>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] w-[min(100%-2rem,80rem)] place-items-center py-12 sm:w-[min(100%-3rem,80rem)]">
        <div className="w-full max-w-lg rounded-[1.35rem] border border-[#e7eaf0] bg-white p-8 text-center shadow-[0_12px_36px_rgba(23,36,66,0.06)] sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#fff0f1] text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-ink">
            We couldn’t load your leads
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Check the Supabase configuration and your connection, then try
            again. Your data has not been changed.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset}>
              <RefreshCw />
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft />
                Back to website
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
