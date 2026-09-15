import { z } from "zod";
export const config = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(4000),
    REDIS_URL: z.string().url().default("redis://localhost:6379"),
    CORS_ORIGIN: z.string().url().default("http://localhost:8080"),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(120),
    NEWSLETTER_WEBHOOK_URL: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().url().startsWith("https://").optional(),
    ),
    NEWSLETTER_WEBHOOK_TOKEN: z.string().optional(),
    CONTACT_WEBHOOK_URL: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().url().startsWith("https://").optional(),
    ),
    CONTACT_WEBHOOK_TOKEN: z.string().optional(),
    CACHE_TTL: z.coerce.number().int().positive().default(60),
  })
  .parse(process.env);
