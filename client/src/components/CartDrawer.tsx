"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpen, setQuantity, remove } from "@/store/cartSlice";
import { money } from "@/lib/api";
import { useTheme } from "./ThemeProvider";
export function CartDrawer() {
  const { theme } = useTheme();
  const { open, items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const panel = useRef<HTMLDivElement>(null);
  const total = items.reduce(
    (n, i) => n + i.service.priceCents * i.quantity,
    0,
  );
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(setOpen(false));
      if (e.key === "Tab") {
        const nodes = panel.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        );
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === panel.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === panel.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const main = document.getElementById("page-shell");
    if (main) main.inert = true;
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
      if (main) main.inert = false;
      previous?.focus();
    };
  }, [open, dispatch]);
  return (
    <AnimatePresence>
      {open && (
        <div className="cart-layer site-frame" data-theme={theme}>
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setOpen(false))}
          />
          <motion.div
            ref={panel}
            tabIndex={-1}
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="cart-heading">
              <h2 id="cart-title">Your next big thing.</h2>
              <button
                className="icon-button"
                aria-label="Close cart"
                onClick={() => dispatch(setOpen(false))}
              >
                <X />
              </button>
            </div>
            <p className="muted">Great work starts with the right services.</p>
            <div className="cart-items">
              {items.length === 0 ? (
                <div className="empty">
                  <ShoppingBag size={44} />
                  <h3>A little empty in here.</h3>
                  <p>Find the right service for your next project.</p>
                  <Link
                    className="primary"
                    href="/services#services"
                    onClick={() => dispatch(setOpen(false))}
                  >
                    Explore services
                  </Link>
                </div>
              ) : (
                items.map(({ service, quantity }) => (
                  <div className="cart-item" key={service.id}>
                    <div>
                      <h3>{service.name}</h3>
                      <p>{money(service.priceCents)} / package</p>
                      <div className="quantity">
                        <button
                          className="icon-button"
                          aria-label={`Decrease ${service.name} quantity`}
                          disabled={quantity === 1}
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                id: service.id,
                                quantity: quantity - 1,
                              }),
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span aria-live="polite">{quantity}</span>
                        <button
                          className="icon-button"
                          aria-label={`Increase ${service.name} quantity`}
                          disabled={quantity === 10}
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                id: service.id,
                                quantity: quantity + 1,
                              }),
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-end">
                      <strong>{money(service.priceCents * quantity)}</strong>
                      <button
                        className="icon-button"
                        aria-label={`Remove ${service.name}`}
                        onClick={() => dispatch(remove(service.id))}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="cart-total">
                <div>
                  <span>Estimated subtotal</span>
                  <strong>{money(total)}</strong>
                </div>
                <p>USD. Final scope and taxes are confirmed separately.</p>
                <Link
                  className="primary"
                  href="/checkout"
                  onClick={() => dispatch(setOpen(false))}
                >
                  Review checkout <ArrowRight size={19} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
