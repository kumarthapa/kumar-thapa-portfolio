import { createHash } from "node:crypto";
import { z } from "zod";
import { config } from "../config.js";
import { HttpError } from "../middleware/errors.js";

export const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    company: z.string().trim().max(120).default(""),
    services: z
      .array(
        z.enum([
          "Design & branding",
          "Web development",
          "Cloud & infrastructure",
          "Help me decide",
        ]),
      )
      .max(4)
      .refine((services) => new Set(services).size === services.length)
      .default([]),
    budget: z
      .enum([
        "",
        "Under $1,000",
        "$1,000–$5,000",
        "$5,000–$10,000",
        "$10,000+",
        "Let’s discuss",
      ])
      .default(""),
    timeline: z
      .enum([
        "",
        "As soon as possible",
        "Within 1 month",
        "In 1–3 months",
        "I’m flexible",
      ])
      .default(""),
    message: z.string().trim().min(20).max(2000),
    consent: z.literal(true),
  })
  .strict();

export async function submitContactInquiry(input: unknown) {
  const inquiry = contactSchema.parse(input);
  if (!config.CONTACT_WEBHOOK_URL)
    throw new HttpError(503, "Contact inquiries are not enabled yet.");

  try {
    const response = await fetch(config.CONTACT_WEBHOOK_URL, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(5000),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": createHash("sha256")
          .update(
            JSON.stringify({
              ...inquiry,
              email: inquiry.email.toLowerCase(),
              services: [...inquiry.services].sort(),
            }),
          )
          .digest("hex"),
        ...(config.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${config.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...inquiry,
        submittedAt: new Date().toISOString(),
        source: "kumarthapa-contact",
      }),
    });
    await response.body?.cancel();
    if (!response.ok) throw new Error("Upstream rejected inquiry");

    // The adapter must return 2xx only after durably accepting the inquiry.
    return {
      message:
        "Your inquiry has been received. We’ll reply using the email address you shared.",
    };
  } catch {
    throw new HttpError(
      503,
      "Unable to send your inquiry right now. Please try again later.",
    );
  }
}
