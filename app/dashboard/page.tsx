import type { Metadata } from "next";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Brand } from "@/components/brand";
import { LeadDashboard } from "@/components/dashboard/lead-dashboard";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Lead } from "@/types/lead";

export const metadata: Metadata = {
  title: "Leads",
  description: "Review and manage incoming Leadline demo enquiries.",
};

export const dynamic = "force-dynamic";

async function getLeads(): Promise<Lead[]> {
  await auth.protect({ unauthenticatedUrl: "/sign-in" });

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, name, email, company, message, status, note, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Lead fetch failed:", error.message);
    throw new Error("Unable to load leads.");
  }

  return (data ?? []) as Lead[];
}

export default async function DashboardPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b border-[#e8ebf0] bg-white">
        <div className="mx-auto flex h-16 w-[min(100%-2rem,80rem)] items-center justify-between sm:w-[min(100%-3rem,80rem)]">
          <Brand />
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
            >
              <Link href="/">
                <ArrowLeft className="sm:hidden" />
                <span className="hidden sm:inline">Back to website</span>
                <ExternalLink className="hidden sm:block" />
              </Link>
            </Button>
            <span className="h-6 w-px bg-[#e5e8ee]" aria-hidden="true" />
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(100%-2rem,80rem)] py-7 sm:w-[min(100%-3rem,80rem)] sm:py-9">
        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground">
            Lead management
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-ink sm:text-3xl">
            Leads
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review new enquiries, keep follow-up context together, and update
            each lead as the conversation progresses.
          </p>
        </div>

        <LeadDashboard initialLeads={leads} />
      </main>
    </div>
  );
}
