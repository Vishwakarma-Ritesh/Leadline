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
  CheckCircle2,
  Inbox,
  LoaderCircle,
  Search,
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

  if (leads.length === 0) {
    return <NoLeads />;
  }

  return (
    <div>
      {notice && (
        <div
          className={`mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${
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

      <div className="rounded-2xl border border-border bg-white p-3 shadow-[0_1px_2px_rgba(18,27,48,0.03)] sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="lead-search" className="sr-only">
              Search leads by name or company
            </label>
            <Input
              id="lead-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or company…"
              className="pl-10"
            />
          </div>

          <div
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:pb-0"
            aria-label="Filter leads by status"
          >
            {filters.map((status) => (
              <button
                key={status}
                type="button"
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/35 ${
                  filter === status
                    ? "bg-ink text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setFilter(status)}
                aria-pressed={filter === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 px-1">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">
            {visibleLeads.length}
          </span>{" "}
          {visibleLeads.length === 1 ? "lead" : "leads"}
          {filter !== "All" ? ` marked ${filter.toLowerCase()}` : ""}
        </p>
        {(query || filter !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {visibleLeads.length === 0 ? (
        <NoResults onClear={() => {
          setQuery("");
          setFilter("All");
        }} />
      ) : (
        <>
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(18,27,48,0.03)] xl:block">
            <table className="w-full table-fixed text-left">
              <caption className="sr-only">
                Leads with contact details, enquiries, statuses, notes, and actions
              </caption>
              <thead className="border-b border-border bg-[#f8fafc] text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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

          <div className="mt-4 grid gap-3 xl:hidden">
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
    <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-20 text-center">
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
    <div className="mt-4 rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
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
