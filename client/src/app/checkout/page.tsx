"use client";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpen } from "@/store/cartSlice";
import { api, money } from "@/lib/api";
import type { Quote } from "@/lib/types";
export default function Checkout() {
  const { items, hydrated } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quotedPayload, setQuotedPayload] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const payload = JSON.stringify({
    items: items.map((i) => ({ id: i.service.id, quantity: i.quantity })),
  });
  useEffect(() => {
    setQuote(null);
    setError("");
    if (!hydrated || items.length === 0) return;
    const controller = new AbortController();
    api<Quote>("/checkout/quote", {
      method: "POST",
      body: payload,
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
    })
      .then((q) => {
        setQuote(q);
        setQuotedPayload(payload);
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      });
    return () => controller.abort();
  }, [payload, hydrated, items.length, attempt]);
  const currentQuote = quotedPayload === payload ? quote : null;
  return (
    <main id="main" className="container checkout">
      <Link className="back-link" href="/services#services">
        <ArrowLeft size={17} /> Back to services
      </Link>
      <span className="eyebrow">ONE STEP CLOSER</span>
      <h1>Review your next move.</h1>
      <p className="muted">
        Mock checkout · No payment will be taken and no order will be placed.
      </p>
      {!hydrated ? (
        <p role="status">Restoring your cart…</p>
      ) : items.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty.</h2>
          <Link className="primary" href="/services#services">
            Explore services
          </Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <section className="checkout-lines">
            <div className="section-heading">
              <h2>Your services</h2>
              <button
                className="text-button"
                onClick={() => dispatch(setOpen(true))}
              >
                Edit cart
              </button>
            </div>
            {items.map(({ service, quantity }) => (
              <div className="checkout-line" key={service.id}>
                <div>
                  <span className="eyebrow">{service.category}</span>
                  <h3>{service.name}</h3>
                  <p>
                    {service.delivery} · Quantity {quantity}
                  </p>
                </div>
                <strong>
                  {currentQuote
                    ? money(
                        currentQuote.lines.find((l) => l.id === service.id)
                          ?.totalCents ?? 0,
                      )
                    : "—"}
                </strong>
              </div>
            ))}
          </section>
          <aside className="order-summary">
            <div className="checkout-brand">
              <BrandLogo theme="light" />
            </div>
            <ShieldCheck size={30} />
            <h2>Project estimate</h2>
            {error ? (
              <div role="alert">
                <p>{error}</p>
                <button
                  className="primary"
                  onClick={() => setAttempt(attempt + 1)}
                >
                  Retry estimate
                </button>
              </div>
            ) : !currentQuote ? (
              <p role="status">Confirming catalog prices…</p>
            ) : (
              <>
                <div>
                  <span>Subtotal</span>
                  <strong>{money(currentQuote.subtotalCents)}</strong>
                </div>
                <div>
                  <span>Taxes</span>
                  <span>Not calculated</span>
                </div>
                <div className="summary-total">
                  <span>Estimated total</span>
                  <strong>{money(currentQuote.totalCents)}</strong>
                </div>
                <p>{currentQuote.notice}</p>
                <div className="mock-note">
                  You’ve reached the end of this demo checkout.
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
