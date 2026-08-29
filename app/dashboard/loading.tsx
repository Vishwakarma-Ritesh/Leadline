import { Brand } from "@/components/brand";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-18 w-[min(100%-2rem,90rem)] items-center">
          <Brand />
        </div>
      </header>
      <main
        className="mx-auto w-[min(100%-2rem,90rem)] animate-pulse py-8 sm:py-12"
        aria-label="Loading leads"
        aria-busy="true"
      >
        <div className="h-3 w-28 rounded-full bg-secondary" />
        <div className="mt-4 h-10 w-44 rounded-xl bg-[#e5e9f1]" />
        <div className="mt-3 h-5 w-full max-w-xl rounded-lg bg-[#e5e9f1]" />

        <div className="mt-8 rounded-2xl border border-border bg-white p-4">
          <div className="h-11 w-full max-w-sm rounded-xl bg-[#edf0f5]" />
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white">
          <div className="h-12 border-b border-border bg-[#f8fafc]" />
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex h-20 items-center gap-5 border-b border-border px-5 last:border-0"
            >
              <div className="size-9 rounded-full bg-[#e8ebf1]" />
              <div className="h-4 w-32 rounded bg-[#e8ebf1]" />
              <div className="ml-auto h-8 w-28 rounded-full bg-[#e8ebf1]" />
            </div>
          ))}
        </div>
        <span className="sr-only">Loading leads…</span>
      </main>
    </div>
  );
}
