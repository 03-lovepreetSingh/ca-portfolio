import { z } from "zod";

/**
 * Contact form zod schema — the single source of truth shared by the client
 * form and the server action.
 *
 * IMPORTANT: this lives in its OWN module (not in actions.ts). A "use server"
 * file may only export async functions; a non-function export like a schema
 * gets transformed into a server-reference stub on the client, which breaks
 * `zodResolver`. Keeping the schema in a plain module avoids that.
 */
export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]{7,20}$/.test(val),
      "Please enter a valid phone number.",
    ),
  service: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Your message must be at least 10 characters."),
  /** Honeypot — must remain empty. Bots fill it; humans don't see it. */
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
