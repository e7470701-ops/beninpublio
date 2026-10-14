import test from "node:test";
import assert from "node:assert/strict";

const API = process.env.BENINPUBLIO_API_URL || "https://beninpublio-api.e7470701.workers.dev/api";

test("private merchant and admin endpoints reject anonymous requests", async () => {
  for (const path of ["/me", "/store", "/products", "/posts", "/receipts", "/stats", "/storage", "/admin/overview"]) {
    const response = await fetch(API + path, { headers: { accept: "application/json" } });
    assert.equal(response.status, 401, `${path} should reject anonymous access`);
  }
});

test("unauthenticated media upload is rejected before body processing", async () => {
  const response = await fetch(API + "/media", { method: "POST" });
  assert.equal(response.status, 401);
});
