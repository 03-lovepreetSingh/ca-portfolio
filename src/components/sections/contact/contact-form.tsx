"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import { submitContact } from "@/app/contact/actions";
import { contactSchema } from "@/app/contact/schema";
import type { ContactFormValues } from "@/app/contact/schema";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * Contact form with react-hook-form + zod validation.
 * Accessible labels, aria-invalid error states, honeypot anti-spam,
 * toast feedback and a loading state while the server action is pending.
 */
export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      company: "",
    },
  });

  const isBusy = isPending || isSubmitting;

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      try {
        const result = await submitContact(values);
        if (result.ok) {
          toast.success("Message sent! We'll be in touch within one business day.");
          reset();
        } else {
          toast.error(result.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact request form"
      className="space-y-5"
    >
      {/* ── Full Name ───────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName">
          Full Name <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="text-sm text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* ── Email ───────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="email">
          Email Address <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ── Phone ───────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">
          Phone <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (416) 000-0000"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* ── Service ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="service">
          Service Interested In <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <select
          id="service"
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
          className={cn(
            "h-11 w-full rounded-lg border border-input bg-transparent px-2.5 py-1",
            "text-sm text-foreground transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:opacity-50",
            "dark:bg-input/30",
            errors.service &&
              "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
          )}
          {...register("service")}
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
        {errors.service && (
          <p id="service-error" role="alert" className="text-sm text-destructive">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* ── Message ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="message">
          Message <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project — scope, timeline, location…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="resize-y min-h-[120px]"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* ── Honeypot (visually hidden, must stay empty) ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px] overflow-hidden opacity-0 pointer-events-none"
        tabIndex={-1}
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register("company")}
        />
      </div>

      {/* ── Submit ──────────────────────────────────────────────────── */}
      <Button
        type="submit"
        disabled={isBusy}
        size="lg"
        className="w-full min-h-[44px] text-base font-semibold"
        aria-busy={isBusy}
      >
        {isBusy ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We typically respond within one business day.
      </p>
    </form>
  );
}
