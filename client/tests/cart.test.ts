import test from "node:test";
import assert from "node:assert/strict";
import reducer, {
  add,
  setQuantity,
  remove,
  parseCart,
} from "../src/store/cartSlice";
const service = {
  id: "test",
  name: "Test",
  category: "Design",
  description: "Test",
  priceCents: 100,
  currency: "USD",
  image: "",
  delivery: "One day",
};
test("cart merges additions, caps quantities, removes items", () => {
  let s = reducer(undefined, add(service));
  s = reducer(s, add(service));
  assert.equal(s.items[0].quantity, 2);
  s = reducer(s, setQuantity({ id: "test", quantity: 100 }));
  assert.equal(s.items[0].quantity, 10);
  s = reducer(s, remove("test"));
  assert.equal(s.items.length, 0);
});
test("storage parsing rejects corrupt and duplicate entries", () => {
  assert.deepEqual(parseCart("{"), []);
  assert.deepEqual(parseCart("{}"), []);
  assert.deepEqual(parseCart(JSON.stringify([{ service, quantity: -1 }])), []);
  assert.equal(
    parseCart(
      JSON.stringify([
        { service, quantity: 1 },
        { service, quantity: 2 },
      ]),
    ).length,
    1,
  );
});
