/** 評價列表共用的 SELECT 片段，欄位對應前端 Review 型別 */
export const REVIEW_SELECT_SQL = `
  SELECT
    r.id,
    r.shop_name,
    r.drink_name,
    r.category,
    r.rating,
    r.sugar_ice,
    r.comment,
    r.created_at,
    u.username
  FROM reviews r
  LEFT JOIN users u ON r.user_id = u.id
`

/** 跳脫 LIKE 萬用字元，讓使用者輸入的 % 與 _ 以字面比對（搭配 ESCAPE '\'） */
export const escapeLike = (value: string): string => value.replace(/[\\%_]/g, '\\$&')

/** 解析分頁 offset，非數字或負數一律視為 0 */
export const parseOffset = (value: unknown): number => {
  const offset = Number(value)
  return Number.isInteger(offset) && offset > 0 ? offset : 0
}
