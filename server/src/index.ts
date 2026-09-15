import { app } from "./app.js";
import { config } from "./config.js";
import { redis } from "./lib/redis.js";
import { logger } from "./lib/logger.js";
await redis.connect();
const server = app.listen(config.PORT, "0.0.0.0", () =>
  logger.info({ port: config.PORT }, "API listening"),
);
server.requestTimeout = 15000;
server.headersTimeout = 10000;
let stopping = false;
function shutdown() {
  if (stopping) return;
  stopping = true;
  const timer = setTimeout(() => {
    redis.destroy();
    process.exit(1);
  }, 10000);
  timer.unref();
  server.close(async () => {
    try {
      await redis.quit();
      clearTimeout(timer);
      process.exit(0);
    } catch {
      process.exit(1);
    }
  });
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
