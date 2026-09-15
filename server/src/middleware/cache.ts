import type { RequestHandler } from "express";
import { redis, bounded } from "../lib/redis.js";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";
// Use only for public JSON GET routes. Cache failure falls through to the source.
export function cache(key: string): RequestHandler {
  return async (req, res, next) => {
    try {
      const hit = await bounded(redis.get(key));
      if (hit) {
        res.set("X-Cache", "HIT");
        res.json(JSON.parse(hit));
        return;
      }
    } catch {
      logger.warn("Catalog cache read failed");
    }
    res.set("X-Cache", "MISS");
    const send = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode === 200)
        void bounded(
          redis.set(key, JSON.stringify(body), {
            EX: config.CACHE_TTL + Math.floor(Math.random() * 10),
          }),
        ).catch(() => logger.warn("Catalog cache write failed"));
      return send(body);
    };
    next();
  };
}
