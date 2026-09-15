import express from "express";
import helmet from "helmet";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";
import { redis, bounded } from "./lib/redis.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { errorHandler, HttpError } from "./middleware/errors.js";
import { routes } from "./routes/index.js";
export const app = express();
app.disable("x-powered-by");
// Only the internal gateway can reach the API. It overwrites X-Forwarded-For.
app.set("trust proxy", 1);
app.use((_req, res, next) => {
  res.locals.requestId = randomUUID();
  res.set("X-Request-ID", res.locals.requestId);
  next();
});
app.use(
  pinoHttp({
    logger,
    genReqId: (_req, res) => res.getHeader("X-Request-ID") as string,
    serializers: {
      req: (req) => ({ method: req.method, url: req.url, id: req.id }),
    },
  }),
);
app.use(helmet());
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: false,
  }),
);
app.get("/health/live", (_req, res) => {
  res.json({ status: "ok" });
});
app.get("/health/ready", async (_req, res) => {
  try {
    await bounded(redis.ping());
    res.json({ status: "ready" });
  } catch {
    res.status(503).json({ status: "not-ready" });
  }
});
app.use("/api", rateLimit, express.json({ limit: "16kb" }), routes);
app.use((_req, _res, next) => next(new HttpError(404, "Route not found")));
app.use(errorHandler);
