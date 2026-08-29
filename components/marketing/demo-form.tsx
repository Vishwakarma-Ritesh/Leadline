"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

import { createLead } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLeadSchema } from "@/lib/validations/lead";
import type { ActionState } from "@/types/lead";

const initialState: ActionState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full sm:w-auto" size="lg" type="submit" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          Submitting…
        </>
      ) : (
        <>
          Request my demo
          <ArrowRight />
        </>
      )}
    </Button>
  );
}

export function DemoForm() {
  const [state, formAction] = useActionState(createLead, initialState);
  const [clientErrors, setClientErrors] = useState<
    Record<string, string[] | undefined>
  >({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const parsed = createLeadSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      event.preventDefault();
      setClientErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setClientErrors({});
  }

  const errors = Object.keys(clientErrors).length
    ? clientErrors
    : state.fieldErrors ?? {};

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/70 bg-white p-5 shadow-[0_24px_65px_rgba(17,26,46,0.14)] sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name?.[0]}
          className="sm:col-span-1"
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            minLength={2}
            maxLength={80}
            aria-invalid={Boolean(errors.name?.length)}
            aria-describedby={errors.name?.length ? "name-error" : undefined}
          />
        </Field>

        <Field
          id="email"
          label="Work email"
          error={errors.email?.[0]}
          className="sm:col-span-1"
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={160}
            aria-invalid={Boolean(errors.email?.length)}
            aria-describedby={errors.email?.length ? "email-error" : undefined}
          />
        </Field>

        <Field
          id="company"
          label="Company"
          error={errors.company?.[0]}
          className="sm:col-span-2"
        >
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="North & Pine"
            required
            minLength={2}
            maxLength={120}
            aria-invalid={Boolean(errors.company?.length)}
            aria-describedby={
              errors.company?.length ? "company-error" : undefined
            }
          />
        </Field>

        <Field
          id="message"
          label="How can we help?"
          error={errors.message?.[0]}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us a little about your enquiry process…"
            required
            minLength={10}
            maxLength={1000}
            aria-invalid={Boolean(errors.message?.length)}
            aria-describedby={
              errors.message?.length ? "message-error" : "message-hint"
            }
          />
          <p id="message-hint" className="mt-1.5 text-xs text-muted-foreground">
            A short note is perfect. Maximum 1,000 characters.
          </p>
        </Field>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SubmitButton />
        <p className="max-w-xs text-xs leading-5 text-muted-foreground sm:text-right">
          We’ll use these details only to respond to your demo request.
        </p>
      </div>

      {state.message && (
        <div
          className={`mt-5 flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-sm ${
            state.success
              ? "bg-accent text-accent-foreground"
              : "bg-[#fff0f1] text-[#a42e3e]"
          }`}
          role={state.success ? "status" : "alert"}
          aria-live="polite"
        >
          {state.success ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          )}
          {state.message}
        </div>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
