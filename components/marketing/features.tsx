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
    <section
      id="features"
      className="relative z-10 -mt-10 rounded-t-[2.75rem] bg-white py-24 shadow-[0_-24px_70px_rgba(2,46,33,0.12)] sm:-mt-14 sm:rounded-t-[3.5rem] sm:py-32"
    >
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#e1e5ec] bg-[#f8f9fb] px-3.5 py-2 text-xs font-semibold text-[#566176]">
            Everything in one place
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl">
            A lighter, clearer way to grow.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#667085]">
            Leadline gives small teams the essentials to manage new business
            without the overhead of a traditional CRM.
          </p>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`group relative min-h-[22rem] overflow-hidden rounded-[2rem] border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(31,52,105,0.1)] sm:p-9 ${
                  index === 0 || index === 3
                    ? "lg:col-span-7"
                    : "lg:col-span-5"
                } ${
                  index === 0
                    ? "border-[#dfe5f5] bg-[#f1f4ff]"
                    : index === 1
                      ? "border-[#dbece6] bg-[#edf9f5]"
                      : index === 2
                        ? "border-[#eee4d3] bg-[#fff8eb]"
                        : "border-[#222e48] bg-ink text-white"
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      index === 3 ? "bg-white/10 text-[#8ce5cc]" : feature.tone
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span
                    className={`font-mono text-xs ${
                      index === 3 ? "text-white/35" : "text-[#8a94a7]"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3
                  className={`mt-9 text-2xl font-semibold tracking-[-0.035em] ${
                    index === 3 ? "text-white" : "text-ink"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-3 max-w-md text-sm leading-6 ${
                    index === 3 ? "text-white/58" : "text-[#667085]"
                  }`}
                >
                  {feature.description}
                </p>

                <div
                  className={`absolute right-6 bottom-0 left-6 rounded-t-2xl border p-3 shadow-[0_-4px_35px_rgba(31,52,105,0.06)] transition-transform duration-500 group-hover:-translate-y-1 sm:right-9 sm:left-9 ${
                    index === 3
                      ? "border-white/10 bg-white/[0.07]"
                      : "border-white/80 bg-white/75 backdrop-blur-xl"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-8 place-items-center rounded-full text-[9px] font-bold ${
                        index === 3
                          ? "bg-[#8ce5cc] text-[#123f35]"
                          : feature.tone
                      }`}
                    >
                      LM
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`h-2 w-24 rounded-full ${
                          index === 3 ? "bg-white/35" : "bg-[#cfd6e1]"
                        }`}
                      />
                      <div
                        className={`mt-2 h-1.5 w-16 rounded-full ${
                          index === 3 ? "bg-white/15" : "bg-[#e8ebf0]"
                        }`}
                      />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        index === 3
                          ? "bg-white/10 text-[#8ce5cc]"
                          : feature.tone
                      }`}
                    >
                      {index === 0
                        ? "Captured"
                        : index === 1
                          ? "Found"
                          : index === 2
                            ? "Contacted"
                            : "Note saved"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
