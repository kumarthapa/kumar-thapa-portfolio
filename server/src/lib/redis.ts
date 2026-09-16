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

redis.on("error", (error) =>
  logger.error({ err: error }, "Redis connection error"),
);

let connectPromise: Promise<void> | null = null;

export async function ensureRedisConnected(): Promise<void> {
  if (redis.isReady) return;

  if (!connectPromise) {
    connectPromise = (redis.isOpen ? Promise.resolve() : redis.connect())
      .then(() => undefined)
      .finally(() => {
        connectPromise = null;
      });
  }

  await connectPromise;

  if (!redis.isReady) {
    throw new Error("Redis client is not ready");
  }
}

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
