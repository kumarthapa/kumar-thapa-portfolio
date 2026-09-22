import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { projects, showcases } from "../src/content/portfolio";
import { visuals, type VisualAsset } from "../src/content/visuals";
import {
  journeys,
  lodgeRooms,
  retailProducts,
} from "../src/content/demo-content";

test("every portfolio entry has a unique, routable slug", () => {
  for (const collection of [projects, showcases]) {
    assert.equal(
      new Set(collection.map((item) => item.slug)).size,
      collection.length,
    );
    for (const item of collection)
      assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test("all six showcase industries have their own demo design", () => {
  assert.deepEqual(
    new Set(showcases.map((item) => item.visualKey)),
    new Set(["spa", "restaurant", "hotel", "retail", "business", "lifestyle"]),
  );
  assert.equal(new Set(showcases.map((item) => item.direction)).size, 6);
});

test("every image slot resolves to an asset and has descriptive alternative text", () => {
  const assets: VisualAsset[] = [
    ...Object.values(visuals),
    ...showcases.map((item) => item.visual),
    ...projects.flatMap((item) => (item.visual ? [item.visual] : [])),
    ...[...journeys, ...lodgeRooms, ...retailProducts].map(
      (item) => item.visual,
    ),
  ];
  for (const asset of assets) {
    assert.ok(
      asset.alt.trim().length > 10,
      "Missing descriptive alt text for " + asset.src,
    );
    if (asset.src.startsWith("/"))
      assert.ok(
        existsSync(resolve(process.cwd(), "public", asset.src.slice(1))),
        "Missing local image: " + asset.src,
      );
    else assert.match(asset.src, /^https:\/\//);
  }
});
