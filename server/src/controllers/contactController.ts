import type { RequestHandler } from "express";
import { submitContactInquiry } from "../services/contactService.js";

export const contact: RequestHandler = async (req, res) => {
  res
    .set("Cache-Control", "no-store")
    .status(202)
    .json({ data: await submitContactInquiry(req.body) });
};
