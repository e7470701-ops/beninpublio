-- BeninPublio V16: personnalisation de vitrine et liens publics par commerce.
ALTER TABLE stores ADD COLUMN logo_media_id TEXT REFERENCES media(id);
CREATE INDEX IF NOT EXISTS idx_media_tenant ON media(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_status ON subscriptions(tenant_id,status);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_created ON audit_logs(tenant_id,created_at);
