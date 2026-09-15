import { z } from "zod";
import { createHash } from "node:crypto";
import { config } from "../config.js";
import { HttpError } from "../middleware/errors.js";
const schema = z
  .object({
    email: z.string().trim().email().max(254),
    consent: z.literal(true),
  })
  .strict();
export async function subscribeNewsletter(input: unknown) {
  const { email } = schema.parse(input);
  if (!config.NEWSLETTER_WEBHOOK_URL)
    throw new HttpError(503, "Newsletter subscriptions are not enabled yet.");
  try {
    const response = await fetch(config.NEWSLETTER_WEBHOOK_URL, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(5000),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": createHash("sha256")
          .update(email.toLowerCase())
          .digest("hex"),
        ...(config.NEWSLETTER_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${config.NEWSLETTER_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        email,
        consent: true,
        consentedAt: new Date().toISOString(),
        source: "kumarthapa-services",
      }),
    });
    if (!response.ok) throw new Error("Upstream rejected subscription");
    // Adapter contract: 2xx means the provider durably accepted the subscription request.
    await response.body?.cancel();
    return {
      message:
        "Subscription request received. Check your inbox for any confirmation email.",
    };
  } catch {
    throw new HttpError(
      503,
      "Unable to subscribe right now. Please try again later.",
    );
  }
}
