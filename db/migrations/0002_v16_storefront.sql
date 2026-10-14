-- BeninPublio V16: schema changes applied to the production D1 database.
-- logo_media_id and product_media.active are included in 0001 for fresh installs.
-- The V16 production database received these columns before this migration was committed.
CREATE INDEX IF NOT EXISTS idx_media_tenant ON media(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_status ON subscriptions(tenant_id,status);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_created ON audit_logs(tenant_id,created_at);
SELECT 1;
