import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "For independent teams getting organized.",
    price: "$19",
    features: ["Up to 250 leads", "Search and status tracking", "Lead notes"],
  },
  {
    name: "Growth",
    description: "For growing teams with a steady enquiry flow.",
    price: "$49",
    features: ["Up to 2,500 leads", "Everything in Starter", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    description: "For established teams that need more room.",
    price: "$99",
    features: ["Unlimited leads", "Everything in Growth", "Guided setup"],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative z-20 -mt-10 overflow-hidden rounded-t-[2.75rem] border-b border-[#e8ebf0] bg-[#f8f9fc] py-24 shadow-[0_-20px_60px_rgba(31,52,105,0.08)] sm:-mt-14 sm:rounded-t-[3.5rem] sm:py-32"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-[#e4e9ff]/65 blur-3xl" />
      <div className="page-shell">
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#e1e5ec] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#566176]">
            Simple, transparent pricing
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl">
            Start simple. Grow when you need to.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#667085]">
            Straightforward plans for small teams. No setup fees, hidden
            charges, or complicated add-ons.
          </p>
        </div>

        <div className="relative mt-16 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${
                plan.featured
                  ? "border-[#3157d5] bg-gradient-to-br from-[#3157d5] to-[#223b9c] text-white shadow-[0_28px_70px_rgba(49,87,213,0.25)]"
                  : "border-[#e3e7ee] bg-white text-ink shadow-[0_10px_35px_rgba(31,52,105,0.045)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute top-6 right-6 rounded-full bg-[#9bead4] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#123f35]">
                  Most popular
                </span>
              )}
              <p className="text-base font-semibold">{plan.name}</p>
              <p
                className={`mt-2 min-h-12 text-sm leading-6 ${
                  plan.featured ? "text-white/68" : "text-[#667085]"
                }`}
              >
                {plan.description}
              </p>
              <p className="mt-9 flex items-end gap-1.5">
                <span className="text-5xl font-bold tracking-[-0.055em]">
                  {plan.price}
                </span>
                <span
                  className={`pb-1 text-sm ${
                    plan.featured ? "text-white/55" : "text-muted-foreground"
                  }`}
                >
                  / month
                </span>
              </p>
              <div
                className={`my-8 h-px ${
                  plan.featured ? "bg-white/14" : "bg-[#edf0f4]"
                }`}
              />
              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <span
                      className={`grid size-5 place-items-center rounded-full ${
                        plan.featured
                          ? "bg-white/10 text-[#7fe0c4]"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-10 w-full ${
                  plan.featured
                    ? "bg-white text-[#2645b2] hover:bg-white/90"
                    : "bg-ink text-white hover:bg-[#222e48]"
                }`}
                variant={plan.featured ? "secondary" : "outline"}
              >
                <a href="#demo">
                  Request a demo
                  <ArrowRight />
                </a>
              </Button>
            </article>
          ))}
        </div>
        <p className="relative mt-6 text-center text-xs text-[#7d8799]">
          Fictional pricing for demonstration purposes. No payment is required.
        </p>
      </div>
    </section>
  );
}
