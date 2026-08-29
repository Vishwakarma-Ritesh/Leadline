import Link from "next/link";

import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg text-base font-bold tracking-[-0.02em] outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-4",
        className,
      )}
      aria-label="Leadline home"
    >
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-ink text-white shadow-sm">
        <span className="absolute h-[2px] w-4 rotate-[-38deg] rounded-full bg-[#7fe0c4]" />
        <span className="absolute ml-2 mt-2 size-1.5 rounded-full bg-white" />
      </span>
      Leadline
    </Link>
  );
}
