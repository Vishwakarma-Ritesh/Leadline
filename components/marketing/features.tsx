import {
  Inbox,
  ListFilter,
  MessageSquareText,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}> = [
  {
    icon: Inbox,
    title: "Capture every enquiry",
    description:
      "Demo requests flow into one tidy workspace, with every detail ready for follow-up.",
    tone: "bg-[#e8efff] text-[#3157d5]",
  },
  {
    icon: ListFilter,
    title: "Find the right lead",
    description:
      "Search by person or company, then focus the list by status in a single click.",
    tone: "bg-[#e2f8f1] text-[#1e8068]",
  },
  {
    icon: RefreshCw,
    title: "Keep progress clear",
    description:
      "Move leads from new to qualified with simple statuses everyone understands.",
    tone: "bg-[#fff1d6] text-[#936500]",
  },
  {
    icon: MessageSquareText,
    title: "Remember the context",
    description:
      "Add concise notes so the next conversation starts exactly where the last one ended.",
    tone: "bg-[#f2eaff] text-[#7144aa]",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="page-shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Everything in one place</span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.045em] text-ink sm:text-5xl">
            Less admin. More thoughtful follow-up.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Leadline gives small teams the essentials to manage new business
            without the overhead of a traditional CRM.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_50px_rgba(31,52,105,0.08)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${feature.tone}`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-9 text-xl font-semibold tracking-[-0.025em] text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="pointer-events-none absolute -right-8 -bottom-12 size-32 rounded-full bg-primary/[0.035] transition-transform duration-500 group-hover:scale-125" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
