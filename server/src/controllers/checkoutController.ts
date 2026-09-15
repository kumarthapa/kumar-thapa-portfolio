import type { RequestHandler } from "express";
import { quoteCheckout } from "../services/checkoutService.js";
export const checkout: RequestHandler = (req, res) => {
  res.set("Cache-Control", "no-store").json({ data: quoteCheckout(req.body) });
};
