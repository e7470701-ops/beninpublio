import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const worker = read("../src/worker.js");
const home = read("../index.html");
const storefront = read("../storefront.html");
const storefrontJs = read("../storefront.js");
const merchantJs = read("../merchant.js");
const schema = read("../db/migrations/0001_initial.sql");
const redirects = read("../_redirects");
const wrangler = read("../wrangler.toml");

test("V16 presents BeninPublio as the platform, not as a collective shop", () => {
  assert.match(home, /BeninPublio est l’application/i);
  assert.doesNotMatch(home, /Les vitrines du Bénin/);
  assert.match(storefrontJs, /Nos produits/);
});
test("public storefront routes require a single store slug", () => {
  assert.match(worker, /store_slug_required/);
  assert.match(worker, /const publicMatch=path\.match/);
  assert.match(storefrontJs, /\/public\/stores\/.*\/products/);
  assert.match(storefrontJs, /\/public\/stores\/.*\/posts/);
});
test("merchant data routes derive the tenant from the authenticated owner", () => {
  assert.match(worker, /SELECT \* FROM stores WHERE owner_user_id=\? ORDER BY created_at LIMIT 1/);
  assert.match(worker, /WHERE p\.tenant_id=\? AND p\.status='published'/);
  assert.match(worker, /WHERE po\.tenant_id=\? AND po\.status='published'/);
});
test("plan limits and storage are enforced server-side", () => {
  assert.match(worker, /async function applyPlanLimits/);
  assert.match(worker, /product_images/);
  assert.match(worker, /storage_quota_reached/);
  assert.match(schema, /157286400/);
  assert.match(schema, /262144000/);
});
test("images can be deactivated without deleting their media records", () => {
  assert.match(schema, /product_media[\s\S]*active INTEGER NOT NULL DEFAULT 1/);
  assert.match(worker, /UPDATE product_media SET active=\?/);
  assert.match(worker, /pm\.active=1/);
});
test("WhatsApp order confirmation remains manual", () => {
  assert.match(storefront, /La commande n’est confirmée qu’après réponse du commerçant/);
  assert.match(storefrontJs, /wa\.me\//);
  assert.match(storefrontJs, /track\("whatsapp_click"\)/);
});
test("public storefront links and AI-off default are configured", () => {
  assert.match(redirects, /\/b\/\* \/storefront\.html\?boutique=:splat 200/);
  assert.match(merchantJs, /\/b\//);
  assert.match(wrangler, /AI_ENABLED = "false"/);
});
