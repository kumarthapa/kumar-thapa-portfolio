import assert from "node:assert/strict";
const base = process.env.BASE_URL || "http://localhost:8080";
const get = (path) => fetch(base + path);
assert.equal((await get("/health/ready")).status, 200);
const first = await get("/api/services");
assert.equal(first.status, 200);
const { data } = await first.json();
assert.equal(data.length, 6);
// Cache write is asynchronous; allow bounded retries without changing the request.
let hit = false;
for (let i = 0; i < 10; i++) {
  const r = await get("/api/services");
  hit = r.headers.get("x-cache") === "HIT";
  if (hit) break;
  await new Promise((resolve) => setTimeout(resolve, 100));
}
assert.ok(hit, "Expected Redis cache hit");
const post = (body) =>
  fetch(base + "/api/checkout/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const quote = await post({ items: [{ id: data[0].id, quantity: 2 }] });
assert.equal(quote.status, 200);
assert.equal((await quote.json()).data.totalCents, data[0].priceCents * 2);
assert.equal(
  (await post({ items: [{ id: data[0].id, quantity: -1 }] })).status,
  400,
);
assert.equal(
  (await post({ items: [{ id: data[0].id, quantity: 1, priceCents: 1 }] }))
    .status,
  400,
);
assert.equal((await get("/api/missing")).status, 404);
console.log(
  "PASS: readiness, catalog cache HIT, quote totals, invalid quantity, price tampering, 404",
);
