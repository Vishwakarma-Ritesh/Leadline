import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="page-shell flex h-18 items-center justify-between">
        <Brand />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex"
        >
          <a className="transition-colors hover:text-foreground" href="#features">
            Features
          </a>
          <a className="transition-colors hover:text-foreground" href="#pricing">
            Pricing
          </a>
          <Link
            className="transition-colors hover:text-foreground"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>

        <Button asChild size="sm">
          <a href="#demo">
            Request a demo
            <ArrowUpRight />
          </a>
        </Button>
      </div>
    </header>
  );
}
