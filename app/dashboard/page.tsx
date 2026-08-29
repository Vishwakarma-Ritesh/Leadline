import type { Metadata } from "next";
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
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-18 w-[min(100%-2rem,90rem)] items-center justify-between">
          <Brand />
          <Button asChild size="sm" variant="outline">
            <Link href="/">
              <ArrowLeft className="sm:hidden" />
              <span className="hidden sm:inline">Back to website</span>
              <ExternalLink className="hidden sm:block" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-[min(100%-2rem,90rem)] py-8 sm:py-12">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Lead management
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl">
            Leads
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Review new enquiries, keep follow-up context together, and update
            each lead as the conversation progresses.
          </p>
        </div>

        <LeadDashboard initialLeads={leads} />
      </main>
    </div>
  );
}
