-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Shops Table
CREATE TABLE IF NOT EXISTS shops (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('chain', 'convenience', 'independent')) NOT NULL
);

-- Drinks Table
CREATE TABLE IF NOT EXISTS drinks (
    id TEXT PRIMARY KEY,
    shop_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT CHECK(category IN ('純茶', '奶茶', '鮮奶茶', '果茶', '奶蓋', '其他', '無咖啡因')) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    drink_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    sugar_ice TEXT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (drink_id) REFERENCES drinks(id)
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
    user_id TEXT NOT NULL,
    drink_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, drink_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (drink_id) REFERENCES drinks(id)
);
