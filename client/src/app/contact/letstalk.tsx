"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { profile } from "@/content/profile";
import {
  buildContactMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  isValidOptionalPhoneNumber,
} from "@/lib/contact-links";
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
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  function prepareInquiry(method: "whatsapp" | "email") {
    const form = formRef.current;
    if (!form) return;

    setError("");
    setStatus("");
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const messageInput = form.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const phone = String(data.get("phone") ?? "").trim();

    if (message.length < 20) {
      messageInput.setCustomValidity(
        "Please share at least 20 characters about your project.",
      );
    } else {
      messageInput.setCustomValidity("");
    }

    const validPhone = isValidOptionalPhoneNumber(phone);
    phoneInput.setCustomValidity(
      validPhone ? "" : "Enter a valid phone number or leave this field blank.",
    );

    if (!form.reportValidity()) {
      setError("Please complete the required fields and correct any invalid values.");
      return;
    }

    const contactMessage = buildContactMessage({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: phone === "+91" ? "" : phone,
      company: String(data.get("company") ?? "").trim(),
      services: data.getAll("services").map(String),
      budget: String(data.get("budget") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message,
    });

    if (method === "whatsapp") {
      const url = buildWhatsAppUrl(profile.whatsapp, contactMessage);
      if (!url) {
        setError(
          "WhatsApp is not configured yet. Add your number to profile.whatsapp, or choose email.",
        );
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
      setStatus(
        "A WhatsApp draft is opening in a new tab. Review it and press Send when you’re ready.",
      );
      return;
    }

    const subject = `Project inquiry from ${String(data.get("name") ?? "").trim()}`;
    setStatus(
      "Your default email app should open with the inquiry details prepared.",
    );
    window.location.href = buildMailtoUrl(profile.email, subject, contactMessage);
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
          <div className={styles.formHeading}>
            <h2 id="inquiry-heading">Tell us about your project.</h2>
            <p>A few details can open up a lot of possibilities.</p>
            <span>Fields marked * are required.</span>
          </div>

          <form
            ref={formRef}
            onSubmit={(event) => event.preventDefault()}
            onChange={() => {
              setError("");
              setStatus("");
            }}
          >
            <fieldset className={styles.formFields}>
              <legend className="sr-only">Project inquiry</legend>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Your name *</label>
                  <input
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

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-phone">
                    Phone number <span>(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    defaultValue="+91 "
                    placeholder="+91 98765 43210"
                    maxLength={24}
                    aria-describedby="phone-hint"
                    onChange={(event) =>
                      event.currentTarget.setCustomValidity("")
                    }
                  />
                  <p id="phone-hint" className={styles.fieldHint}>
                    Include the country code; +91 is prefilled.
                  </p>
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
                  <strong>We couldn’t prepare your inquiry.</strong>
                  <p>{error}</p>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.whatsappButton}
                  type="button"
                  onClick={() => prepareInquiry("whatsapp")}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Send via WhatsApp
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <button
                  className={`primary ${styles.emailButton}`}
                  type="button"
                  onClick={() => prepareInquiry("email")}
                >
                  <Mail size={18} aria-hidden="true" />
                  Send via Email
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
              <p className={styles.formNote}>
                Choose your preferred way to send your inquiry. Your message
                will be prepared with the details you provided.
              </p>
              <p className={styles.channelNote}>
                WhatsApp opens in a new tab. Email opens your default email app.
              </p>
              {status && (
                <p className={styles.actionStatus} role="status">
                  {status}
                </p>
              )}
            </fieldset>
          </form>
        </section>
      </div>
    </main>
  );
}
