"use server";

import { contactSchema } from "./schema";

/**
 * Contact form server action. Re-validates with the shared zod schema, applies
 * the honeypot spam check, then (TODO) delivers the lead. A "use server" module
 * may only export async functions — the schema lives in ./schema.ts.
 */
export async function submitContact(
  values: unknown,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return { ok: false, error: firstError };
  }

  const data = parsed.data;

  // Honeypot check — if the hidden field is filled, silently pretend success.
  // Real users never touch this field; bots do.
  if (data.company && data.company.trim().length > 0) {
    return { ok: true };
  }

  // TODO: wire real email delivery (e.g. Resend / Nodemailer) here
  if (process.env.NODE_ENV !== "production") {
    console.log("[Contact lead]", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone ?? "(not provided)",
      service: data.service,
      message: data.message,
      receivedAt: new Date().toISOString(),
    });
  }

  return { ok: true };
}
