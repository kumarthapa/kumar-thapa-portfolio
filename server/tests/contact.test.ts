import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { config } from "../src/config.js";
import { HttpError } from "../src/middleware/errors.js";
import { contactSchema, submitContactInquiry } from "../src/services/contactService.js";

const inquiry = {
  name: "Alex Morgan",
  email: "alex@example.com",
  message: "I would like to build a website for my small business.",
  consent: true,
};

function configureWebhook(t: TestContext, url: string | undefined = "https://contact.example.com/inquiries") {
  const previousUrl = config.CONTACT_WEBHOOK_URL;
  const previousToken = config.CONTACT_WEBHOOK_TOKEN;
  config.CONTACT_WEBHOOK_URL = url;
  config.CONTACT_WEBHOOK_TOKEN = "test-token";
  t.after(() => {
    config.CONTACT_WEBHOOK_URL = previousUrl;
    config.CONTACT_WEBHOOK_TOKEN = previousToken;
  });
}

test("contact accepts a minimal inquiry and trims surrounding whitespace", () => {
  const result = contactSchema.parse({
    ...inquiry,
    name: "  Alex Morgan  ",
    email: "  alex@example.com  ",
    message: `  ${inquiry.message}  `,
  });
  assert.deepEqual(result, { ...inquiry, company: "", services: [], budget: "", timeline: "" });
});

test("contact rejects invalid, oversized, unsupported, and unconsented inquiries", () => {
  for (const invalid of [
    { name: "   " },
    { name: "a".repeat(101) },
    { email: "not-an-email" },
    { company: "a".repeat(121) },
    { message: " ".repeat(30) },
    { message: "Too short" },
    { message: "a".repeat(2001) },
    { services: ["Unknown service"] },
    { services: ["Web development", "Web development"] },
    { budget: "anything" },
    { timeline: "yesterday" },
    { consent: false },
    { consent: undefined },
    { injectedField: true },
  ]) {
    assert.throws(() => contactSchema.parse({ ...inquiry, ...invalid }));
  }
});

test("contact validates requests before contacting an adapter", async (t) => {
  configureWebhook(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 202 }));
  await assert.rejects(submitContactInquiry({ ...inquiry, consent: false }));
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("contact remains unavailable without an adapter and never claims success", async (t) => {
  configureWebhook(t);
  config.CONTACT_WEBHOOK_URL = undefined;
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 202 }));
  await assert.rejects(submitContactInquiry(inquiry), (error: unknown) => error instanceof HttpError && error.status === 503);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("contact delivers complete inquiry data and confirms adapter acceptance", async (t) => {
  configureWebhook(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 202 }));
  const complete = {
    ...inquiry,
    company: "Example Studio",
    services: ["Design & branding", "Web development"],
    budget: "$1,000–$5,000",
    timeline: "Within 1 month",
  };
  const result = await submitContactInquiry(complete);
  assert.match(result.message, /received/);
  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, request] = fetchMock.mock.calls[0].arguments as unknown as [string, RequestInit];
  assert.equal(url, config.CONTACT_WEBHOOK_URL);
  assert.equal(request.method, "POST");
  assert.equal(request.redirect, "error");
  assert.ok(request.signal instanceof AbortSignal);
  const headers = new Headers(request.headers);
  assert.equal(headers.get("Content-Type"), "application/json");
  assert.equal(headers.get("Authorization"), "Bearer test-token");
  assert.match(headers.get("Idempotency-Key")!, /^[a-f0-9]{64}$/);
  const { submittedAt, source, ...payload } = JSON.parse(request.body as string);
  assert.deepEqual(payload, complete);
  assert.equal(source, "kumarthapa-contact");
  assert.ok(Number.isFinite(Date.parse(submittedAt)));
});

test("contact reuses its idempotency key for retries but distinguishes new messages", async (t) => {
  configureWebhook(t);
  config.CONTACT_WEBHOOK_TOKEN = undefined;
  const keys: string[] = [];
  t.mock.method(globalThis, "fetch", async (_url: unknown, request: RequestInit) => {
    const headers = new Headers(request.headers);
    keys.push(headers.get("Idempotency-Key")!);
    assert.equal(headers.has("Authorization"), false);
    return new Response(null, { status: 202 });
  });
  await submitContactInquiry({ ...inquiry, services: ["Web development", "Design & branding"] });
  await submitContactInquiry({ ...inquiry, email: "ALEX@example.com", services: ["Design & branding", "Web development"] });
  await submitContactInquiry({ ...inquiry, message: "I have a different project to discuss with your studio." });
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[0], keys[2]);
});

test("contact reports unavailable when the adapter rejects an inquiry", async (t) => {
  configureWebhook(t);
  for (const status of [400, 429, 500]) {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status }));
    await assert.rejects(submitContactInquiry(inquiry), (error: unknown) => error instanceof HttpError && error.status === 503);
    fetchMock.mock.restore();
  }
});

test("contact handles network failures and timeouts without exposing adapter details", async (t) => {
  configureWebhook(t);
  for (const failure of [new Error("private adapter details"), new DOMException("Timed out", "TimeoutError")]) {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw failure; });
    await assert.rejects(submitContactInquiry(inquiry), (error: unknown) => {
      assert.ok(error instanceof HttpError);
      assert.equal(error.status, 503);
      assert.doesNotMatch(error.message, /private adapter details/);
      return true;
    });
    fetchMock.mock.restore();
  }
});
