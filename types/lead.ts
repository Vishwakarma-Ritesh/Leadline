export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: LeadStatus;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type ActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "company" | "message" | "note", string[]>
  >;
};
