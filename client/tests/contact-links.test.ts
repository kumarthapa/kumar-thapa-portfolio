import assert from "node:assert/strict";
import test from "node:test";
import {
  buildContactMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  isValidOptionalPhoneNumber,
} from "../src/lib/contact-links";

const details = {
  name: "Alex Morgan",
  email: "alex@example.com",
  phone: "+91 98765 43210",
  company: "Example Co.",
  services: ["Web development", "Cloud & infrastructure"],
  budget: "$1,000–$5,000",
  timeline: "Within 1 month",
  message: "I need a new website for my business.",
};

test("optional phone accepts blank input and valid international numbers", () => {
  assert.equal(isValidOptionalPhoneNumber(""), true);
  assert.equal(isValidOptionalPhoneNumber("+91 "), true);
  assert.equal(isValidOptionalPhoneNumber("+91 98765 43210"), true);
  assert.equal(isValidOptionalPhoneNumber("+44 (0)20 7946 0958"), true);
  assert.equal(isValidOptionalPhoneNumber("+91 98765x43210"), false);
  assert.equal(isValidOptionalPhoneNumber("1234"), false);
  assert.equal(isValidOptionalPhoneNumber("+9198765432101234"), false);
});

test("contact message includes all details and optional-field fallbacks", () => {
  const message = buildContactMessage(details);
  assert.match(message, /Name: Alex Morgan/);
  assert.match(message, /Email: alex@example\.com/);
  assert.match(message, /Phone: \+91 98765 43210/);
  assert.match(message, /Company: Example Co\./);
  assert.match(message, /Service\/category: Web development, Cloud & infrastructure/);
  assert.match(message, /Budget: \$1,000–\$5,000/);
  assert.match(message, /Ideal start date: Within 1 month/);
  assert.match(message, /Project description:\nI need a new website for my business\./);

  const optionalMessage = buildContactMessage({
    ...details,
    phone: "",
    company: "",
    services: [],
    budget: "",
    timeline: "",
  });
  assert.match(optionalMessage, /Phone: Not provided/);
  assert.match(optionalMessage, /Company: Not provided/);
  assert.match(optionalMessage, /Service\/category: Not selected/);
  assert.match(optionalMessage, /Budget: Not provided/);
  assert.match(optionalMessage, /Ideal start date: Not provided/);
});

test("WhatsApp URL uses the configured recipient and encodes the message", () => {
  const message = "Project: web & design\nName: Alex";
  const url = buildWhatsAppUrl("919876543210", message);
  assert.ok(url);

  const parsed = new URL(url);
  assert.equal(parsed.origin, "https://wa.me");
  assert.equal(parsed.pathname, "/919876543210");
  assert.equal(parsed.searchParams.get("text"), message);
  assert.equal(buildWhatsAppUrl("", message), null);
  assert.equal(buildWhatsAppUrl("not-a-number", message), null);
});

test("mailto URL encodes subject and body for the existing portfolio email", () => {
  const body = buildContactMessage(details);
  const url = buildMailtoUrl("kumar9114526@gmail.com", "Project inquiry — Alex", body);
  const [recipient, query = ""] = url.slice("mailto:".length).split("?");
  const params = new URLSearchParams(query);

  assert.equal(recipient, "kumar9114526@gmail.com");
  assert.equal(params.get("subject"), "Project inquiry — Alex");
  assert.equal(params.get("body"), body);
});
