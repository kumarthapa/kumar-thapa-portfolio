"use client";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { useTheme } from "./ThemeProvider";
export function Footer() {
  const { theme } = useTheme();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
            <h2>
              Let’s make it
              <br />
              worth launching.
            </h2>
            <Link className="footer-contact" href="/contact">
              Start a conversation <ArrowUpRight />
            </Link>
            <p className="footer-note">
              Tell us what you have in mind. We’ll help shape the next step.
            </p>
          </div>
          <div className="newsletter">
            <h3>Good ideas. Straight to your inbox.</h3>
            <p>Occasional notes on design, development, and building better.</p>
            <form
              id="newsletter-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setStatus("");
                try {
                  const result = await api<{ message: string }>("/newsletter", {
                    method: "POST",
                    body: JSON.stringify({
                      email: new FormData(e.currentTarget).get("email"),
                      consent:
                        new FormData(e.currentTarget).get("consent") === "on",
                    }),
                  });
                  setStatus(result.message);
                } catch (err) {
                  setStatus(
                    err instanceof Error ? err.message : "Please try again.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                maxLength={254}
              />
              <button disabled={busy} aria-label="Subscribe to newsletter">
                {busy ? "…" : <ArrowUpRight />}
              </button>
            </form>
            <label className="consent">
              <input
                form="newsletter-form"
                type="checkbox"
                name="consent"
                required
              />{" "}
              I agree to receive occasional email updates.
            </label>
            <p role="status">
              {status ||
                "Subscription requests are subject to provider availability."}
            </p>
          </div>
        </div>
        <div className="footer-links">
          <Link className="footer-brand" href="/" aria-label="KUMARTHAPA home">
            <BrandLogo theme={theme === "white" ? "light" : "dark"} />
          </Link>
          <div>
            <h3>Explore</h3>
            <Link href="/services#services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Let’s talk</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
          <div>
            <h3>What we do</h3>
            <Link href="/services#services">Design & branding</Link>
            <Link href="/services#services">Web development</Link>
            <Link href="/services#services">Cloud & infrastructure</Link>
          </div>
          <div>
            <h3>Discover the work</h3>
            <Link href="/projects">Software projects</Link>
            <Link href="/showcase">Website demos</Link>
            <Link href="/contact">Discuss your project</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} KUMARTHAPA. Built with purpose.
          </span>
          <span>Thoughtfully designed. Carefully built.</span>
        </div>
      </div>
    </footer>
  );
}
