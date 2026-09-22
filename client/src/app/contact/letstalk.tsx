"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  MessageSquare,
} from "lucide-react";
import { api } from "@/lib/api";
import styles from "./letstalk.module.css";

const services = [
  "Design & branding",
  "Web development",
  "Cloud & infrastructure",
  "Help me decide",
];
const budgets = [
  "Under $1,000",
  "$1,000–$5,000",
  "$5,000–$10,000",
  "$10,000+",
  "Let’s discuss",
];
const timelines = [
  "As soon as possible",
  "Within 1 month",
  "In 1–3 months",
  "I’m flexible",
];
const nextSteps = [
  ["We get to know your idea", "We’ll review your goals and the details you share."],
  [
    "We work out the possibilities",
    "Together, we’ll explore the right approach, scope, and timing.",
  ],
  ["You choose the next step", "Move forward with a clear plan when you’re ready."],
];

export default function LetsTalk() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const submitting = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (success) successHeading.current?.focus();
  }, [success]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const messageInput = form.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    if (message.length < 20) {
      messageInput.setCustomValidity(
        "Please share at least 20 characters about your project.",
      );
      messageInput.reportValidity();
      return;
    }

    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const result = await api<{ message: string }>("/contact", {
        method: "POST",
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          services: data.getAll("services"),
          budget: data.get("budget"),
          timeline: data.get("timeline"),
          message,
          consent: data.get("consent") === "on",
        }),
      });
      setSuccess(result.message);
      setMessageLength(0);
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The request timed out. Please try again in a moment.",
      );
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <main id="main" className={`container ${styles.page}`}>
      <Link className={`back-link ${styles.backLink}`} href="/">
        <ArrowLeft size={16} aria-hidden="true" /> Back to home
      </Link>

      <div className={styles.layout}>
        <section className={styles.intro} aria-labelledby="contact-heading">
          <span className={`eyebrow ${styles.eyebrow}`}>
            LET’S BUILD SOMETHING TOGETHER
          </span>
          <h1 id="contact-heading">
            Good things start with a <span>conversation.</span>
          </h1>
          <p className={styles.lead}>
            A new website. A fresh identity. A better way to build.
            Tell us what’s on your mind, and let’s figure out what’s next.
          </p>

          <div className={styles.ideaNote}>
            <MessageSquare size={24} aria-hidden="true" />
            <div>
              <h2>A rough idea is a great start.</h2>
              <p>You don’t need a perfect brief. Just bring your ambition.</p>
            </div>
          </div>

          <div className={styles.nextSteps}>
            <h2 className="eyebrow">WHAT HAPPENS NEXT</h2>
            <ol>
              {nextSteps.map(([title, description], index) => (
                <li key={title}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Link className={styles.exploreLink} href="/services#services">
            Explore our services <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.formPanel} aria-labelledby="inquiry-heading">
          {success ? (
            <div className={styles.success}>
              <CheckCircle2 size={48} aria-hidden="true" />
              <span className="eyebrow">ONE STEP CLOSER</span>
              <h2 id="inquiry-heading" ref={successHeading} tabIndex={-1}>
                Thanks for reaching out.
              </h2>
              <p>{success}</p>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setSuccess("");
                  requestAnimationFrame(() => nameInput.current?.focus());
                }}
              >
                Start another inquiry <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <Link className={styles.exploreLink} href="/services#services">
                Browse our services
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.formHeading}>
                <h2 id="inquiry-heading">Tell us about your project.</h2>
                <p>A few details can open up a lot of possibilities.</p>
                <span>Fields marked * are required.</span>
              </div>

              <form onSubmit={submitInquiry} aria-busy={busy}>
                <fieldset className={styles.formFields} disabled={busy}>
                  <legend className="sr-only">Project inquiry</legend>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">Your name *</label>
                      <input
                        ref={nameInput}
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Alex Morgan"
                        required
                        maxLength={100}
                        pattern=".*\S.*"
                        title="Please enter your name."
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email">Email address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="alex@company.com"
                        required
                        maxLength={254}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-company">
                      Company <span>(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Your company or organization"
                      maxLength={120}
                    />
                  </div>

                  <fieldset className={styles.serviceOptions}>
                    <legend>
                      What can we help with? <span>(optional)</span>
                    </legend>
                    <p>Select all that apply.</p>
                    <div className={styles.chips}>
                      {services.map((service) => (
                        <label key={service} className={styles.chip}>
                          <input type="checkbox" name="services" value={service} />
                          <span>
                            <Check size={14} aria-hidden="true" />
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-budget">
                        Budget in USD <span>(optional)</span>
                      </label>
                      <select id="contact-budget" name="budget" defaultValue="">
                        <option value="">Select a range</option>
                        {budgets.map((budget) => (
                          <option key={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-timeline">
                        Ideal start <span>(optional)</span>
                      </label>
                      <select id="contact-timeline" name="timeline" defaultValue="">
                        <option value="">Select a timeframe</option>
                        {timelines.map((timeline) => (
                          <option key={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message">What do you have in mind? *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      minLength={20}
                      maxLength={2000}
                      aria-describedby="message-hint message-count"
                      placeholder="Tell us about your idea, what you’d like to achieve, and anything else we should know…"
                      onChange={(event) => {
                        event.currentTarget.setCustomValidity("");
                        setMessageLength(event.currentTarget.value.length);
                      }}
                    />
                    <div className={styles.messageHints}>
                      <span id="message-hint">At least 20 characters.</span>
                      <span id="message-count">
                        {messageLength.toLocaleString()} / 2,000
                      </span>
                    </div>
                  </div>

                  <label className={styles.consent} htmlFor="contact-consent">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      name="consent"
                      required
                    />
                    <span>
                      I agree to be contacted about this inquiry using the
                      details I’ve shared. *
                    </span>
                  </label>

                  {error && (
                    <div className={styles.error} role="alert">
                      <strong>We couldn’t send your inquiry.</strong>
                      <p>
                        {error} Your details are still here so you can try again.
                      </p>
                    </div>
                  )}

                  <button
                    className={`primary ${styles.submit}`}
                    type="submit"
                    disabled={busy}
                  >
                    {busy ? (
                      <>
                        Sending inquiry
                        <LoaderCircle
                          size={18}
                          className={styles.spinner}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        Send inquiry <ArrowUpRight size={20} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className={styles.formNote}>
                    A conversation is the first step. No commitment required.
                  </p>
                </fieldset>
                <span className="sr-only" role="status">
                  {busy ? "Sending your inquiry. Please wait." : ""}
                </span>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
