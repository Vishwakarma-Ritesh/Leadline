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
    <section id="pricing" className="border-y border-border bg-[#f4f7fb] py-20 sm:py-28">
      <div className="page-shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Simple pricing</span>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl">
            Start simple. Grow when you need to.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Straightforward plans for small teams. No setup fees, hidden
            charges, or complicated add-ons.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                plan.featured
                  ? "border-primary bg-ink text-white shadow-[0_22px_60px_rgba(17,26,46,0.16)]"
                  : "border-border bg-white text-ink"
              }`}
            >
              {plan.featured && (
                <span className="absolute top-5 right-5 rounded-full bg-[#7fe0c4] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#123f35]">
                  Most popular
                </span>
              )}
              <p className="text-sm font-semibold">{plan.name}</p>
              <p
                className={`mt-2 min-h-12 text-sm leading-6 ${
                  plan.featured ? "text-white/62" : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>
              <p className="mt-7 flex items-end gap-1.5">
                <span className="text-4xl font-bold tracking-[-0.045em]">
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
              <ul className="mt-8 flex-1 space-y-3.5">
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
                className="mt-9 w-full"
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
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Fictional pricing for demonstration purposes. No payment is required.
        </p>
      </div>
    </section>
  );
}
