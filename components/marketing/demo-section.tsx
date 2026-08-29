import Link from "next/link";
import { Check, Clock3, Layers3 } from "lucide-react";

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
        className="relative z-30 -mt-10 overflow-hidden rounded-t-[2.75rem] bg-white py-16 text-white shadow-[0_-20px_60px_rgba(31,52,105,0.07)] sm:-mt-14 sm:rounded-t-[3.5rem] sm:py-24"
      >
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-12 shadow-[0_32px_90px_rgba(17,26,46,0.18)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -top-56 -right-32 size-[34rem] rounded-full bg-[#3157d5]/45 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-64 -left-32 size-[36rem] rounded-full bg-[#17866c]/35 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:20px_20px] [mask-image:linear-gradient(to_right,black,transparent_72%)]" />

            <div className="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
              <div>
                <span className="inline-flex rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold text-[#a9f0dc]">
                  See Leadline in action
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                  A calmer way to manage every lead.
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/62">
                  Tell us a little about your team. We’ll show you how Leadline
                  turns incoming enquiries into clear, confident next steps.
                </p>
                <ul className="mt-9 space-y-4">
                  {assurances.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/78"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-[#8ce5cc]">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/62">
                    <Clock3 className="size-3.5" />
                    20-minute demo
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/62">
                    <Layers3 className="size-3.5" />
                    Focused on the essentials
                  </span>
                </div>
              </div>
              <DemoForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e8ebf0] bg-white py-8 text-[#7a8498] sm:py-10">
        <div className="page-shell">
          <div className="flex flex-col gap-5 border-y border-[#e8ebf0] py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs">
              © {new Date().getFullYear()} Leadline
            </p>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs"
            >
              <a
                href="#features"
                className="transition-colors hover:text-ink"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="transition-colors hover:text-ink"
              >
                Pricing
              </a>
              <a href="#demo" className="transition-colors hover:text-ink">
                Request a demo
              </a>
              <Link
                href="/dashboard"
                className="transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
            </nav>
          </div>
          <p className="pt-5 text-center text-[11px] text-[#a0a8b8]">
            Simple lead management for focused, growing teams.
          </p>
        </div>
      </footer>
    </>
  );
}
