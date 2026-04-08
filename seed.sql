-- Seed Shops
INSERT INTO shops (id, name, type) VALUES ('s1', '五十嵐', 'chain');
INSERT INTO shops (id, name, type) VALUES ('s2', '7-ELEVEN', 'convenience');
INSERT INTO shops (id, name, type) VALUES ('s3', '可不可熟成紅茶', 'chain');

-- Seed Drinks
INSERT INTO drinks (id, shop_id, name, category) VALUES ('d1', 's1', '波霸奶茶', '奶茶');
INSERT INTO drinks (id, shop_id, name, category) VALUES ('d2', 's1', '四季春青茶', '純茶');
INSERT INTO drinks (id, shop_id, name, category) VALUES ('d3', 's2', '西西里風檸檬氣泡咖啡', '其他');
INSERT INTO drinks (id, shop_id, name, category) VALUES ('d4', 's3', '熟成紅茶', '純茶');

-- Seed Users
INSERT INTO users (id, username) VALUES ('u1', 'Kevin');
INSERT INTO users (id, username) VALUES ('u2', '飲料控小明');

-- Seed Reviews
INSERT INTO reviews (id, user_id, drink_id, rating, sugar_ice, comment) 
VALUES ('r1', 'u1', 'd1', 5, '微糖微冰', '波霸超 Q，奶味很重，經典不敗！');

INSERT INTO reviews (id, user_id, drink_id, rating, sugar_ice, comment) 
VALUES ('r2', 'u2', 'd3', 4, '冰塊固定', '夏天喝這款超爽快，酸甜比例剛剛好。');
