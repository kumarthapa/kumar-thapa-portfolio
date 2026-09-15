import { z } from "zod";
import { findService } from "./catalogService.js";
import { HttpError } from "../middleware/errors.js";
export const checkoutSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            id: z.string().min(1).max(80),
            quantity: z.number().int().min(1).max(10),
          })
          .strict(),
      )
      .min(1)
      .max(30),
  })
  .strict();
export function quoteCheckout(input: unknown) {
  const { items } = checkoutSchema.parse(input);
  if (new Set(items.map((item) => item.id)).size !== items.length)
    throw new HttpError(400, "Duplicate services are not allowed");
  const lines = items.map(({ id, quantity }) => {
    const service = findService(id);
    if (!service) throw new HttpError(400, "Service is no longer available");
    return {
      id,
      name: service.name,
      quantity,
      unitPriceCents: service.priceCents,
      totalCents: service.priceCents * quantity,
    };
  });
  const subtotalCents = lines.reduce(
    (total, item) => total + item.totalCents,
    0,
  );
  return {
    lines,
    currency: "USD",
    subtotalCents,
    totalCents: subtotalCents,
    mock: true,
    notice:
      "Estimate only. Taxes and payment are not calculated. No order has been placed.",
  };
}
