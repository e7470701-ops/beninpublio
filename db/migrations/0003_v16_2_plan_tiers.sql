-- BeninPublio V16.2: three commercial tiers.
-- Apply with the normal D1 migration workflow before deploying code that relies on these plans.
PRAGMA foreign_keys = ON;

INSERT INTO plans(id,name,price_xof,active_products,product_images,illustrated_posts,text_posts,storage_bytes,features_json)
VALUES
 ('simple','Simple',2700,30,1,12,30,52428800,'{"intelligent_search":false,"advanced_ai":false,"basic_stats":false,"advanced_stats":false,"csv_export":false}'),
 ('starter','Starter',5500,75,1,12,30,157286400,'{"intelligent_search":true,"advanced_ai":false,"basic_stats":true,"advanced_stats":false,"csv_export":false}'),
 ('pro','PRO',11300,130,3,30,50,262144000,'{"intelligent_search":true,"advanced_ai":true,"basic_stats":true,"advanced_stats":true,"csv_export":true}')
ON CONFLICT(id) DO UPDATE SET
 name=excluded.name,
 price_xof=excluded.price_xof,
 active_products=excluded.active_products,
 product_images=excluded.product_images,
 illustrated_posts=excluded.illustrated_posts,
 text_posts=excluded.text_posts,
 storage_bytes=excluded.storage_bytes,
 features_json=excluded.features_json;
