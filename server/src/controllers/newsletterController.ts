import type { RequestHandler } from "express";
import { subscribeNewsletter } from "../services/newsletterService.js";
export const subscribe: RequestHandler = async (req, res) => {
  res
    .set("Cache-Control", "no-store")
    .status(202)
    .json({ data: await subscribeNewsletter(req.body) });
};
