import { ArrowRight, CheckCircle2, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

const previewLeads = [
  { initials: "AM", name: "Ava Morgan", company: "North & Pine", status: "New" },
  {
    initials: "JL",
    name: "Jonah Lee",
    company: "Fieldwork Studio",
    status: "Contacted",
  },
  {
    initials: "SK",
    name: "Sofia Khan",
    company: "Harbour Goods",
    status: "Qualified",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[90%]" />
      <div className="pointer-events-none absolute -top-48 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-[#dce5ff]/70 blur-3xl" />

      <div className="page-shell relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="animate-rise max-w-2xl">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-[#35a989]" />
            A clearer way to manage enquiries
          </span>
          <h1 className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[0.96] tracking-[-0.065em] text-ink">
            Every lead, <span className="text-primary">moving forward.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Capture every sales enquiry, keep the important context together,
            and know exactly who to follow up with next.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#demo">
                Request a demo
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#features">Explore features</a>
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-[#249374]" />
            Simple setup. No complicated CRM required.
          </p>
        </div>

        <div className="animate-rise-late relative mx-auto w-full max-w-2xl">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/12 via-transparent to-[#53c8a8]/15 blur-2xl" />
          <div className="surface-shadow relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-white p-2 sm:p-3">
            <div className="overflow-hidden rounded-[1.1rem] border border-border bg-[#f7f9fc]">
              <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3.5 sm:px-5">
                <div>
                  <p className="text-sm font-semibold text-ink">Recent leads</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Your latest demo enquiries
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-accent-foreground">
                  <span className="size-1.5 rounded-full bg-[#2ca184]" />
                  All caught up
                </div>
              </div>

              <div className="space-y-2.5 p-3 sm:p-4">
                {previewLeads.map((lead, index) => (
                  <div
                    key={lead.name}
                    className="flex items-center gap-3 rounded-xl border border-border/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(18,27,48,0.03)]"
                  >
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                        index === 0
                          ? "bg-[#e5ecff] text-[#3157d5]"
                          : index === 1
                            ? "bg-[#fff1cf] text-[#8b5d00]"
                            : "bg-[#dff7eb] text-[#19724f]"
                      }`}
                    >
                      {lead.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {lead.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.company}
                      </p>
                    </div>
                    <span
                      className={`hidden rounded-full px-2.5 py-1 text-[10px] font-semibold sm:inline ${
                        lead.status === "New"
                          ? "status-new"
                          : lead.status === "Contacted"
                            ? "status-contacted"
                            : "status-qualified"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-float absolute -bottom-7 -left-4 hidden items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:flex">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-primary">
              <Inbox className="size-4" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-ink">
                New enquiry captured
              </span>
              <span className="mt-0.5 block text-[10px] text-muted-foreground">
                Just now
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="page-shell relative mt-20 border-t border-border/80 pt-7 sm:mt-28">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Built for service teams that value simple, thoughtful follow-up
        </p>
      </div>
    </section>
  );
}
