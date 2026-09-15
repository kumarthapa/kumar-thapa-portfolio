import test from "node:test";
import assert from "node:assert/strict";
import { quoteCheckout } from "../src/services/checkoutService.js";
test("quote uses catalog prices and integer cents", () => {
  const q = quoteCheckout({ items: [{ id: "web-platform", quantity: 2 }] });
  assert.equal(q.totalCents, 299800);
  assert.equal(q.mock, true);
});
test("rejects tampered price and unknown items", () => {
  assert.throws(() =>
    quoteCheckout({
      items: [{ id: "web-platform", quantity: 1, priceCents: 1 }],
    }),
  );
  assert.throws(() =>
    quoteCheckout({ items: [{ id: "missing", quantity: 1 }] }),
  );
});
test("rejects duplicate, empty, negative, fractional and excessive quantities", () => {
  for (const quantity of [0, -1, 1.5, 11])
    assert.throws(() =>
      quoteCheckout({ items: [{ id: "web-platform", quantity }] }),
    );
  assert.throws(() => quoteCheckout({ items: [] }));
  assert.throws(() =>
    quoteCheckout({
      items: [
        { id: "web-platform", quantity: 1 },
        { id: "web-platform", quantity: 1 },
      ],
    }),
  );
});
