import { createClient } from "redis";
import { config } from "../config.js";
import { logger } from "./logger.js";
export const redis = createClient({
  url: config.REDIS_URL,
  disableOfflineQueue: true,
  socket: {
    connectTimeout: 3000,
    reconnectStrategy: (retries) =>
      Math.min(100 * 2 ** Math.min(retries, 5), 3000),
  },
});
redis.on("error", () => logger.error("Redis connection error"));
export function bounded<T>(operation: Promise<T>, ms = 1500): Promise<T> {
  let timer: NodeJS.Timeout;
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error("Redis operation timed out")),
        ms,
      );
    }),
  ]).finally(() => clearTimeout(timer!));
}
