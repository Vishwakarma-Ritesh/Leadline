"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";

import styles from "./mobile-menu.module.css";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-[#e3e7ee] bg-white text-ink outline-none transition-colors hover:bg-[#f7f8fa] focus-visible:ring-2 focus-visible:ring-primary/35 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={`${styles.overlay} fixed inset-0 z-50 bg-ink/20 backdrop-blur-[2px] md:hidden`}
        />
        <Dialog.Content
          className={`${styles.content} fixed inset-y-0 right-0 z-50 flex w-[min(86vw,22rem)] flex-col border-l border-[#e5e8ee] bg-white p-5 shadow-[-20px_0_60px_rgba(17,26,46,0.14)] outline-none md:hidden`}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="inline-flex items-center gap-2.5 text-base font-bold tracking-[-0.02em] text-ink">
              <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-ink text-white shadow-sm">
                <span className="absolute h-[2px] w-4 rotate-[-38deg] rounded-full bg-[#7fe0c4]" />
                <span className="absolute ml-2 mt-2 size-1.5 rounded-full bg-white" />
              </span>
              Leadline
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="grid size-9 place-items-center rounded-full border border-[#e3e7ee] text-ink outline-none transition-colors hover:bg-[#f7f8fa] focus-visible:ring-2 focus-visible:ring-primary/35"
                aria-label="Close navigation menu"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            Navigate to Leadline features, pricing, or the dashboard.
          </Dialog.Description>

          <nav
            aria-label="Mobile navigation"
            className="mt-10 flex flex-col border-t border-[#e8ebf0]"
          >
            {navigation.map((item) => (
              <Dialog.Close asChild key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center justify-between border-b border-[#e8ebf0] py-5 text-lg font-semibold tracking-[-0.025em] text-ink outline-none transition-colors hover:text-primary focus-visible:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-[#8a94a7]" />
                </a>
              </Dialog.Close>
            ))}
            <Dialog.Close asChild>
              <Link
                href="/dashboard"
                className="flex items-center justify-between border-b border-[#e8ebf0] py-5 text-lg font-semibold tracking-[-0.025em] text-ink outline-none transition-colors hover:text-primary focus-visible:text-primary"
              >
                Dashboard
                <ArrowUpRight className="size-4 text-[#8a94a7]" />
              </Link>
            </Dialog.Close>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
