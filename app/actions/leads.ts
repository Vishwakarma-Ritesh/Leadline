"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  createLeadSchema,
  leadIdSchema,
  updateNoteSchema,
  updateStatusSchema,
} from "@/lib/validations/lead";
import type { ActionState, LeadStatus } from "@/types/lead";

const GENERIC_ERROR =
  "We couldn’t complete that request. Please try again in a moment.";

export async function createLead(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = createLeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("leads").insert(parsed.data);

    if (error) {
      console.error("Lead creation failed:", error.message);
      return { success: false, message: GENERIC_ERROR };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Thanks — your demo request is on its way.",
    };
  } catch (error) {
    console.error("Lead creation failed:", error);
    return { success: false, message: GENERIC_ERROR };
  }
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<ActionState> {
  const parsed = updateStatusSchema.safeParse({ id, status });

  if (!parsed.success) {
    return { success: false, message: "Choose a valid lead status." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id);

    if (error) {
      console.error("Status update failed:", error.message);
      return { success: false, message: GENERIC_ERROR };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Lead status updated." };
  } catch (error) {
    console.error("Status update failed:", error);
    return { success: false, message: GENERIC_ERROR };
  }
}

export async function updateLeadNote(
  id: string,
  note: string,
): Promise<ActionState> {
  const parsed = updateNoteSchema.safeParse({ id, note });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Enter a valid note.",
    };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("leads")
      .update({ note: parsed.data.note || null })
      .eq("id", parsed.data.id);

    if (error) {
      console.error("Note update failed:", error.message);
      return { success: false, message: GENERIC_ERROR };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Lead note saved." };
  } catch (error) {
    console.error("Note update failed:", error);
    return { success: false, message: GENERIC_ERROR };
  }
}

export async function deleteLead(id: string): Promise<ActionState> {
  const parsed = leadIdSchema.safeParse(id);

  if (!parsed.success) {
    return { success: false, message: "This lead could not be identified." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", parsed.data);

    if (error) {
      console.error("Lead deletion failed:", error.message);
      return { success: false, message: GENERIC_ERROR };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Lead deleted." };
  } catch (error) {
    console.error("Lead deletion failed:", error);
    return { success: false, message: GENERIC_ERROR };
  }
}
