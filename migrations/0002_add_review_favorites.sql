-- 收藏評價（只新增資料表，不影響既有資料；舊的 favorites（drinks）表保留）
CREATE TABLE IF NOT EXISTS review_favorites (
    user_id TEXT NOT NULL,
    review_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, review_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- 收藏清單：WHERE user_id = ? ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_review_favorites_user_created
    ON review_favorites (user_id, created_at DESC);
