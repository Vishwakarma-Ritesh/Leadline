"use client";

import {
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  CircleDot,
  Inbox,
  LoaderCircle,
  Search,
  Send,
  UsersRound,
  X,
} from "lucide-react";

import { updateLeadStatus } from "@/app/actions/leads";
import { DeleteLeadDialog } from "@/components/dashboard/delete-lead-dialog";
import { NoteDialog } from "@/components/dashboard/note-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead, LeadStatus } from "@/types/lead";
import { LEAD_STATUSES } from "@/types/lead";

type FilterStatus = "All" | LeadStatus;
type Notice = { type: "success" | "error"; message: string } | null;

const filters: FilterStatus[] = ["All", ...LEAD_STATUSES];

export function LeadDashboard({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [notice, setNotice] = useState<Notice>(null);
  const [pendingLeadId, setPendingLeadId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const visibleLeads = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery =
        !normalizedQuery ||
        lead.name.toLowerCase().includes(normalizedQuery) ||
        lead.company.toLowerCase().includes(normalizedQuery);
      const matchesFilter = filter === "All" || lead.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [deferredQuery, filter, leads]);

  const statusCounts = useMemo(
    () =>
      LEAD_STATUSES.reduce(
        (counts, status) => ({
          ...counts,
          [status]: leads.filter((lead) => lead.status === status).length,
        }),
        {} as Record<LeadStatus, number>,
      ),
    [leads],
  );

  function handleStatusChange(id: string, status: LeadStatus) {
    setPendingLeadId(id);
    setNotice(null);

    startTransition(async () => {
      const result = await updateLeadStatus(id, status);
      if (!result.success) {
        setNotice({ type: "error", message: result.message });
        setPendingLeadId(null);
        return;
      }

      setLeads((current) =>
        current.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
      );
      setNotice({ type: "success", message: result.message });
      setPendingLeadId(null);
      router.refresh();
    });
  }

  function handleNoteSaved(
    id: string,
    note: string | null,
    message: string,
  ) {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, note } : lead)),
    );
    setNotice({ type: "success", message });
    router.refresh();
  }

  function handleDeleted(id: string, message: string) {
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setNotice({ type: "success", message });
    router.refresh();
  }

  return (
    <div>
      <DashboardStats leads={leads} />

      {notice && (
        <div
          className={`mt-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${
            notice.type === "success"
              ? "border-[#bde9d8] bg-[#effbf6] text-[#16654e]"
              : "border-[#f2c7cc] bg-[#fff4f5] text-[#9d3040]"
          }`}
          role={notice.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span className="flex-1">{notice.message}</span>
          <button
            type="button"
            className="rounded-md p-1 outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-current"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="mt-5 rounded-[1.35rem] border border-[#e7eaf0] bg-white p-3 shadow-[0_8px_24px_rgba(23,36,66,0.045)] sm:p-4">
        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="lead-search" className="sr-only">
              Search leads by name or company
            </label>
            <Input
              id="lead-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or company…"
              className="h-10 rounded-xl border-[#e7eaf0] bg-white pl-10 shadow-none"
            />
          </div>
          <p
            className="hidden shrink-0 text-xs text-muted-foreground sm:block"
            aria-live="polite"
          >
            <span className="font-semibold text-foreground">
              {visibleLeads.length}
            </span>{" "}
            of {leads.length}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#eef0f4] pt-3">
          <div
            className="-mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1"
            aria-label="Filter leads by status"
          >
            {filters.map((status) => (
              <button
                key={status}
                type="button"
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold outline-none transition-[color,background-color,border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-primary/35 ${
                  filter === status
                    ? "border-[#1594cb] bg-[#1594cb] text-white shadow-sm"
                    : "border-[#e5e8ee] bg-white text-[#68738a] hover:border-[#d3d8e2] hover:text-foreground"
                }`}
                onClick={() => setFilter(status)}
                aria-pressed={filter === status}
              >
                {status !== "All" && (
                  <span
                    className={`size-1.5 rounded-full ${statusDotClass(status)}`}
                  />
                )}
                <span>{status}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    filter === status
                      ? "bg-white/18 text-white"
                      : "bg-[#f4f6f9] text-[#7a8498]"
                  }`}
                >
                  {status === "All" ? leads.length : statusCounts[status]}
                </span>
              </button>
            ))}
          </div>
          {(query || filter !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden shrink-0 sm:inline-flex"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold text-ink">All leads</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Enquiries ordered by most recent
          </p>
        </div>
        {(query || filter !== "All") && (
          <button
            type="button"
            className="text-xs font-semibold text-primary sm:hidden"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {visibleLeads.length === 0 ? (
        leads.length === 0 ? (
          <NoLeads />
        ) : (
          <NoResults
            onClear={() => {
              setQuery("");
              setFilter("All");
            }}
          />
        )
      ) : (
        <>
          <div className="mt-3 hidden overflow-x-auto rounded-[1.35rem] border border-[#e5e8ee] bg-white shadow-[0_8px_28px_rgba(23,36,66,0.045)] lg:block">
            <table className="w-full min-w-[1060px] table-fixed text-left">
              <caption className="sr-only">
                Leads with contact details, enquiries, statuses, notes, and actions
              </caption>
              <thead className="border-b border-[#e8ebf0] bg-[#fafbfc] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7a8498]">
                <tr>
                  <th className="w-[17%] px-5 py-3.5">Lead</th>
                  <th className="w-[14%] px-4 py-3.5">Company</th>
                  <th className="w-[21%] px-4 py-3.5">Enquiry</th>
                  <th className="w-[14%] px-4 py-3.5">Status</th>
                  <th className="w-[15%] px-4 py-3.5">Note</th>
                  <th className="w-[10%] px-4 py-3.5">Created</th>
                  <th className="w-[9%] px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="align-middle transition-colors hover:bg-[#fafbfe]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">
                            {lead.name}
                          </p>
                          <a
                            href={`mailto:${lead.email}`}
                            className="mt-0.5 block truncate text-xs text-muted-foreground outline-none hover:text-primary focus-visible:text-primary"
                          >
                            {lead.email}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="truncate px-4 py-4 text-sm text-foreground" title={lead.company}>
                      {lead.company}
                    </td>
                    <td className="px-4 py-4">
                      <p
                        className="line-clamp-2 text-xs leading-5 text-muted-foreground"
                        title={lead.message}
                      >
                        {lead.message}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusSelect
                        lead={lead}
                        pending={isPending && pendingLeadId === lead.id}
                        onChange={handleStatusChange}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <p
                        className={`line-clamp-2 text-xs leading-5 ${
                          lead.note ? "text-foreground" : "text-muted-foreground"
                        }`}
                        title={lead.note ?? undefined}
                      >
                        {lead.note || "No note yet"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <NoteDialog
                          leadId={lead.id}
                          leadName={lead.name}
                          currentNote={lead.note}
                          onSaved={(note, message) =>
                            handleNoteSaved(lead.id, note, message)
                          }
                        />
                        <DeleteLeadDialog
                          leadId={lead.id}
                          leadName={lead.name}
                          onDeleted={(message) =>
                            handleDeleted(lead.id, message)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid gap-3 lg:hidden">
            {visibleLeads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(18,27,48,0.03)] sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <Avatar name={lead.name} />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-ink">
                      {lead.name}
                    </h2>
                    <a
                      href={`mailto:${lead.email}`}
                      className="mt-0.5 block truncate text-xs text-muted-foreground hover:text-primary"
                    >
                      {lead.email}
                    </a>
                  </div>
                  <p className="shrink-0 text-[11px] text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </p>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Company
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">{lead.company}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Status
                    </dt>
                    <dd className="mt-1.5">
                      <StatusSelect
                        lead={lead}
                        pending={isPending && pendingLeadId === lead.id}
                        onChange={handleStatusChange}
                      />
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Enquiry
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-foreground">
                      {lead.message}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Note
                    </dt>
                    <dd
                      className={`mt-1.5 text-sm leading-6 ${
                        lead.note ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {lead.note || "No note has been added."}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center justify-end gap-1 border-t border-border pt-3">
                  <NoteDialog
                    leadId={lead.id}
                    leadName={lead.name}
                    currentNote={lead.note}
                    onSaved={(note, message) =>
                      handleNoteSaved(lead.id, note, message)
                    }
                  />
                  <DeleteLeadDialog
                    leadId={lead.id}
                    leadName={lead.name}
                    onDeleted={(message) => handleDeleted(lead.id, message)}
                  />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DashboardStats({ leads }: { leads: Lead[] }) {
  const cards = [
    {
      label: "Total leads",
      value: leads.length,
      icon: UsersRound,
      iconClass: "bg-[#e8f7fc] text-[#168bb8]",
    },
    {
      label: "New enquiries",
      value: leads.filter((lead) => lead.status === "New").length,
      icon: CircleDot,
      iconClass: "bg-[#e9f0ff] text-[#4b70da]",
    },
    {
      label: "Contacted",
      value: leads.filter((lead) => lead.status === "Contacted").length,
      icon: Send,
      iconClass: "bg-[#f1eaff] text-[#7950b6]",
    },
    {
      label: "Qualified",
      value: leads.filter((lead) => lead.status === "Qualified").length,
      icon: BadgeCheck,
      iconClass: "bg-[#e4f8f0] text-[#218d6b]",
    },
  ];

  return (
    <section
      aria-label="Lead summary"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.label}
            className="flex min-h-22 items-center gap-3 rounded-[1.35rem] border border-[#e7eaf0] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(23,36,66,0.04)] sm:gap-4 sm:px-5"
          >
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full ${card.iconClass}`}
            >
              <Icon className="size-4.5" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-muted-foreground">
                {card.label}
              </span>
              <span className="mt-0.5 block text-xl font-bold tracking-[-0.035em] text-ink">
                {card.value}
              </span>
            </span>
          </article>
        );
      })}
    </section>
  );
}

function StatusSelect({
  lead,
  pending,
  onChange,
}: {
  lead: Lead;
  pending: boolean;
  onChange: (id: string, status: LeadStatus) => void;
}) {
  return (
    <div className="relative inline-flex">
      <Select
        value={lead.status}
        onValueChange={(value) => onChange(lead.id, value as LeadStatus)}
        disabled={pending}
      >
        <SelectTrigger
          className={`h-9 min-w-31 border-0 px-3 shadow-none ${statusClass(lead.status)}`}
          aria-label={`Status for ${lead.name}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LEAD_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              <span className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${statusDotClass(status)}`} />
                {status}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {pending && (
        <span className="absolute inset-0 grid place-items-center rounded-full bg-white/75">
          <LoaderCircle className="size-4 animate-spin text-primary" />
          <span className="sr-only">Updating status</span>
        </span>
      )}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
      {initials}
    </span>
  );
}

function NoLeads() {
  return (
    <div className="mt-3 rounded-[1.35rem] border border-dashed border-[#dfe4ec] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(23,36,66,0.035)]">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
        <Inbox className="size-6" />
      </span>
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-ink">
        No leads yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        When someone requests a demo, their enquiry will appear here.
      </p>
      <Button asChild className="mt-6" variant="outline">
        <Link href="/#demo">View demo form</Link>
      </Button>
    </div>
  );
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-3 rounded-[1.35rem] border border-dashed border-[#dfe4ec] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(23,36,66,0.035)]">
      <Search className="mx-auto size-6 text-muted-foreground" />
      <h2 className="mt-4 text-base font-semibold text-ink">No matching leads</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try another name, company, or status.
      </p>
      <Button className="mt-5" variant="outline" size="sm" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}

function statusClass(status: LeadStatus) {
  return {
    New: "status-new",
    Contacted: "status-contacted",
    Qualified: "status-qualified",
    Lost: "status-lost",
  }[status];
}

function statusDotClass(status: LeadStatus) {
  return {
    New: "bg-[#4b70da]",
    Contacted: "bg-[#c68b13]",
    Qualified: "bg-[#319b72]",
    Lost: "bg-[#b35769]",
  }[status];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
