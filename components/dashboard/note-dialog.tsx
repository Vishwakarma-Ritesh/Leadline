"use client";

import { useState, useTransition, type FormEvent } from "react";
import { LoaderCircle, NotebookPen } from "lucide-react";

import { updateLeadNote } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NoteDialog({
  leadId,
  leadName,
  currentNote,
  onSaved,
}: {
  leadId: string;
  leadName: string;
  currentNote: string | null;
  onSaved: (note: string | null, message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(currentNote ?? "");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setNote(currentNote ?? "");
      setError("");
    }
    setOpen(nextOpen);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (note.trim().length > 1000) {
      setError("Note must be 1000 characters or fewer.");
      return;
    }

    startTransition(async () => {
      const result = await updateLeadNote(leadId, note);
      if (!result.success) {
        setError(result.message);
        return;
      }

      const savedNote = note.trim() || null;
      onSaved(savedNote, result.message);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`${currentNote ? "Edit" : "Add"} note for ${leadName}`}
        >
          <NotebookPen />
          <span className="hidden xl:inline">
            {currentNote ? "Edit note" : "Add note"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{currentNote ? "Edit note" : "Add a note"}</DialogTitle>
            <DialogDescription>
              Keep useful follow-up context for {leadName}. This note is visible
              on the leads dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <Label htmlFor={`note-${leadId}`}>Note</Label>
            <Textarea
              id={`note-${leadId}`}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={1000}
              placeholder="Add the next step or conversation context…"
              className="mt-2 min-h-36"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `note-${leadId}-error` : undefined}
              autoFocus
            />
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <p
                id={`note-${leadId}-error`}
                className="text-xs text-destructive"
                role={error ? "alert" : undefined}
              >
                {error}
              </p>
              <p className="ml-auto text-xs text-muted-foreground">
                {note.length}/1000
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Saving…
                </>
              ) : (
                "Save note"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
