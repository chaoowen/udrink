export const DRINK_CATEGORIES = ['純茶', '奶茶', '鮮奶茶', '果茶', '奶蓋', '其他', '無咖啡因'] as const;

export type DrinkCategory = typeof DRINK_CATEGORIES[number];
