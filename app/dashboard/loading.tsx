import { Brand } from "@/components/brand";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b border-[#e8ebf0] bg-white">
        <div className="mx-auto flex h-16 w-[min(100%-2rem,80rem)] items-center sm:w-[min(100%-3rem,80rem)]">
          <Brand />
        </div>
      </header>
      <main
        className="mx-auto w-[min(100%-2rem,80rem)] animate-pulse py-7 sm:w-[min(100%-3rem,80rem)] sm:py-9"
        aria-label="Loading leads"
        aria-busy="true"
      >
        <div className="h-3 w-24 rounded-full bg-[#e5e9f1]" />
        <div className="mt-3 h-8 w-28 rounded-lg bg-[#e5e9f1]" />
        <div className="mt-3 h-4 w-full max-w-lg rounded-lg bg-[#e5e9f1]" />

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((card) => (
            <div
              key={card}
              className="flex h-22 items-center gap-3 rounded-[1.35rem] border border-[#e7eaf0] bg-white px-4"
            >
              <div className="size-10 rounded-full bg-[#edf0f5]" />
              <div className="space-y-2">
                <div className="h-2.5 w-16 rounded bg-[#edf0f5]" />
                <div className="h-5 w-8 rounded bg-[#e5e9f1]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-[#e7eaf0] bg-white p-4">
          <div className="h-10 w-full rounded-xl bg-[#edf0f5]" />
          <div className="mt-3 flex gap-2 border-t border-[#eef0f4] pt-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-7 w-20 rounded-full bg-[#edf0f5]" />
            ))}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-[#e7eaf0] bg-white">
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
