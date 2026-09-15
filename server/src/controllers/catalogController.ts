import type { RequestHandler } from "express";
import { getServices } from "../services/catalogService.js";
export const listServices: RequestHandler = (_req, res) => {
  res.json({ data: getServices() });
};
