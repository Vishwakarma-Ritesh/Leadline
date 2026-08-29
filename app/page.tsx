import { DemoSection } from "@/components/marketing/demo-section";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { Pricing } from "@/components/marketing/pricing";
import { SiteHeader } from "@/components/marketing/site-header";

export default function MarketingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <DemoSection />
      </main>
    </>
  );
}
