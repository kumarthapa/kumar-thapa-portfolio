import { createHash } from "node:crypto";
import type { RequestHandler } from "express";
import { redis, bounded } from "../lib/redis.js";
import { logger } from "../lib/logger.js";
import { config } from "../config.js";
import { HttpError } from "./errors.js";

// Atomic increment + expiry; one shared window across all API replicas.
const script = `local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('PEXPIRE',KEYS[1],ARGV[1]) end; return {n,redis.call('PTTL',KEYS[1])}`;

export const rateLimit: RequestHandler = async (req, res, next) => {
  try {
    const ip = createHash("sha256")
      .update(req.ip || req.socket.remoteAddress || "unknown")
      .digest("hex");

    const [count, ttl] = (await bounded(
      redis.eval(script, {
        keys: [`studio:rate:${ip}`],
        arguments: ["60000"],
      }),
    )) as number[];

    res.set("RateLimit-Limit", String(config.RATE_LIMIT_MAX));
    res.set(
      "RateLimit-Remaining",
      String(Math.max(0, config.RATE_LIMIT_MAX - count)),
    );
    res.set("RateLimit-Reset", String(Math.max(1, Math.ceil(ttl / 1000))));

    if (count > config.RATE_LIMIT_MAX) {
      res.set("Retry-After", String(Math.max(1, Math.ceil(ttl / 1000))));
      throw new HttpError(429, "Too many requests. Try again shortly.");
    }

    next();
  } catch (error) {
    logger.error(
      { err: error },
      "Rate limiter Redis operation failed",
    );

    next(
      error instanceof HttpError
        ? error
        : new HttpError(503, "Rate limiter unavailable"),
    );
  }
};
