-- 評價列表查詢的 index（只新增，不影響既有資料）
-- 我的評分：WHERE user_id = ? ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_reviews_user_created ON reviews (user_id, created_at DESC);
-- 分類頁：WHERE category = ? ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_reviews_category_created ON reviews (category, created_at DESC);
-- 最新評價：ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews (created_at DESC);
