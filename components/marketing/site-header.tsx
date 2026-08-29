import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="page-shell mt-3 flex h-14 items-center justify-between rounded-2xl border border-white/80 bg-white/94 px-4 shadow-[0_10px_35px_rgba(17,26,46,0.1)] backdrop-blur-2xl sm:px-5">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 rounded-lg text-base font-bold tracking-[-0.02em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-4"
          aria-label="Leadline — scroll to top"
        >
          <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-ink text-white shadow-sm">
            <span className="absolute h-[2px] w-4 rotate-[-38deg] rounded-full bg-[#7fe0c4]" />
            <span className="absolute ml-2 mt-2 size-1.5 rounded-full bg-white" />
          </span>
          Leadline
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 text-sm font-medium text-[#667085] md:flex"
        >
          <a className="transition-colors hover:text-ink" href="#features">
            Features
          </a>
          <a className="transition-colors hover:text-ink" href="#pricing">
            Pricing
          </a>
          <Link
            className="transition-colors hover:text-ink"
            href="/dashboard"
          >
            Sign in
          </Link>
        </nav>

        <Button
          asChild
          size="sm"
          className="bg-ink px-5 text-white shadow-[0_8px_24px_rgba(17,26,46,0.16)] hover:bg-[#222e48]"
        >
          <a href="#demo">
            Get a demo
            <ArrowUpRight />
          </a>
        </Button>
      </div>
    </header>
  );
}
