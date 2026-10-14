import test from "node:test";
import assert from "node:assert/strict";

const API = process.env.BENINPUBLIO_API_URL || "https://beninpublio-api.e7470701.workers.dev/api";

async function getJson(path) {
  const response = await fetch(API + path, { headers: { accept: "application/json" } });
  let body = {};
  try { body = await response.json(); } catch {}
  return { response, body };
}

test("API health is available and D1 is connected", async () => {
  const { response, body } = await getJson("/health");
  assert.equal(response.ok, true, `/health returned HTTP ${response.status}`);
  assert.equal(body.ok, true);
  assert.equal(body.database, "connected");
});

test("global public store listing is disabled to preserve tenant isolation", async () => {
  const { response, body } = await getJson("/public/stores");
  assert.equal(response.status, 400);
  assert.equal(body.error, "store_slug_required");
});

test("global public product listing is disabled; clients must request one store", async () => {
  const { response, body } = await getJson("/public/products");
  assert.equal(response.status, 400);
  assert.equal(body.error, "store_slug_required");
});
