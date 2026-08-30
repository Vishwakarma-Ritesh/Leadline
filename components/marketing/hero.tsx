import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07583f] text-white"
    >
      <video
        className="absolute inset-0 -z-20 size-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/leadline-hero-poster.png"
        aria-hidden="true"
      >
        <source src="/leadline-hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_42%,rgba(1,51,36,0.12)_62%,rgba(2,46,33,0.76)_100%)]" />

      <div className="page-shell flex min-h-[100svh] items-end pb-18 sm:pb-22 lg:pb-24">
        <div className="grid w-full items-end gap-8 pt-8 md:grid-cols-[1fr_auto] md:gap-16 lg:pt-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Enquiries, clearly managed
            </p>
            <h1 className="text-[clamp(3rem,6.4vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              Build systems to grow revenue
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
              Capture new enquiries, keep the context together, and help your
              team follow up with confidence.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="h-13 w-fit shrink-0 bg-[#d9ec4f] px-7 text-[#173a2f] shadow-[0_14px_36px_rgba(0,30,20,0.22)] hover:bg-[#e4f463] md:mb-1"
          >
            <a href="#demo">
              Get a demo
              <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
