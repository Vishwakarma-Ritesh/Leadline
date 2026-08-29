"use client";

import { useState, useTransition, type MouseEvent } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";

import { deleteLead } from "@/app/actions/leads";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteLeadDialog({
  leadId,
  leadName,
  onDeleted,
}: {
  leadId: string;
  leadName: string;
  onDeleted: (message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await deleteLead(leadId);
      if (!result.success) {
        setError(result.message);
        return;
      }

      onDeleted(result.message);
      setOpen(false);
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) {
          setOpen(nextOpen);
          setError("");
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-[#fff0f1] hover:text-destructive"
          aria-label={`Delete ${leadName}`}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {leadName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the lead, their enquiry, status, and note.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p
            className="mt-4 rounded-xl bg-[#fff0f1] px-3.5 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete lead"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
