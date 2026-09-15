import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status =
    err instanceof ZodError
      ? 400
      : err instanceof HttpError
        ? err.status
        : err?.type === "entity.too.large"
          ? 413
          : err?.type === "entity.parse.failed"
            ? 400
            : 500;
  if (status >= 500)
    logger.error({ err, requestId: res.locals.requestId }, "Request failed");
  res.status(status).json({
    error: {
      message:
        status >= 500
          ? "Service temporarily unavailable"
          : err instanceof ZodError
            ? "Invalid request data"
            : status === 413
              ? "Request too large"
              : status === 400
                ? "Invalid request data"
                : err.message,
      requestId: res.locals.requestId,
    },
  });
};
