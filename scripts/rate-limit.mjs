import assert from "node:assert/strict";
const base = process.env.BASE_URL || "http://localhost:8080";
let blocked = false;
for (let i = 0; i < 150; i++) {
  const r = await fetch(base + "/api/services");
  if (r.status === 429) {
    assert.ok(Number(r.headers.get("retry-after")) > 0);
    blocked = true;
    break;
  }
  assert.equal(r.status, 200);
}
assert.ok(blocked, "Expected 429; use RATE_LIMIT_MAX <= 120 for this test");
console.log("PASS: shared rate limit returns 429 and Retry-After");
