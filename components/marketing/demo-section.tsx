import Link from "next/link";
import { Check, Clock3, Layers3 } from "lucide-react";

import { Brand } from "@/components/brand";
import { DemoForm } from "@/components/marketing/demo-form";

const assurances = [
  "A practical walkthrough tailored to your team",
  "No pressure and no complicated setup",
  "Clear answers to your questions",
];

export function DemoSection() {
  return (
    <>
      <section
        id="demo"
        className="relative overflow-hidden bg-ink py-20 text-white sm:py-28"
      >
        <div className="pointer-events-none absolute -top-48 -right-40 size-[32rem] rounded-full bg-primary/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 -left-36 size-[32rem] rounded-full bg-[#17866c]/25 blur-3xl" />
        <div className="page-shell relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <span className="inline-flex rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-xs font-semibold text-[#a9f0dc]">
              See Leadline in action
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
              Ready for a calmer way to manage leads?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/62">
              Tell us a little about your team. We’ll show you how Leadline can
              turn incoming enquiries into clear next steps.
            </p>
            <ul className="mt-8 space-y-4">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/78">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-[#7fe0c4]">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/62">
                <Clock3 className="size-3.5" />
                20-minute demo
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/62">
                <Layers3 className="size-3.5" />
                Focused on the essentials
              </span>
            </div>
          </div>
          <DemoForm />
        </div>
      </section>

      <footer className="border-t border-border bg-white py-8">
        <div className="page-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <Brand />
          <nav
            aria-label="Footer navigation"
            className="flex items-center gap-5 text-sm text-muted-foreground"
          >
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Leadline
          </p>
        </div>
      </footer>
    </>
  );
}
