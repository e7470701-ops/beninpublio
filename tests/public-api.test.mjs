import test from "node:test";
import assert from "node:assert/strict";

const API = process.env.BENINPUBLIO_API_URL || "https://beninpublio-api.e7470701.workers.dev/api";

async function getJson(path) {
  const response = await fetch(API + path, { headers: { accept: "application/json" } });
  assert.equal(response.ok, true, `${path} returned HTTP ${response.status}`);
  return response.json();
}

test("API health is available and D1 is connected", async () => {
  const health = await getJson("/health");
  assert.equal(health.ok, true);
  assert.equal(health.database, "connected");
});

test("public store listing returns an array without private account fields", async () => {
  const result = await getJson("/public/stores");
  assert.ok(Array.isArray(result.stores));
  for (const store of result.stores) {
    assert.equal(typeof store.slug, "string");
    assert.equal(typeof store.name, "string");
    assert.ok(!("owner_user_id" in store));
    assert.ok(!("password_hash" in store));
    assert.ok(!("email" in store));
  }
});

test("public catalog contains only published products attached to a store", async () => {
  const result = await getJson("/public/products");
  assert.ok(Array.isArray(result.products));
  for (const product of result.products) {
    assert.equal(typeof product.id, "string");
    assert.equal(typeof product.name, "string");
    assert.equal(typeof product.store_slug, "string");
    assert.equal(typeof product.store_name, "string");
    assert.ok(Number.isSafeInteger(product.price_xof));
    assert.ok(!("owner_user_id" in product));
    assert.ok(!("password_hash" in product));
    assert.ok(!("email" in product));
  }
});
