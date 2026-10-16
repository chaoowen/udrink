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

/** 每頁評價筆數 */
export const REVIEW_PAGE_SIZE = 10

const MAX_KEYWORD_LENGTH = 50

/**
 * 關鍵字比對店名／飲品／評論的 WHERE 條件；關鍵字為空字串時不篩選
 * 參數順序需搭配 getKeywordParams
 */
export const REVIEW_KEYWORD_SQL = `(
  ? = ''
  OR r.shop_name LIKE ? ESCAPE '\\'
  OR r.drink_name LIKE ? ESCAPE '\\'
  OR r.comment LIKE ? ESCAPE '\\'
)`

/** 跳脫 LIKE 萬用字元，讓使用者輸入的 % 與 _ 以字面比對（搭配 ESCAPE '\'） */
export const escapeLike = (value: string): string => value.replace(/[\\%_]/g, '\\$&')

/** 正規化搜尋關鍵字：非字串視為空、去頭尾空白、限制長度 */
export const parseKeyword = (value: unknown): string =>
  typeof value === 'string' ? value.trim().slice(0, MAX_KEYWORD_LENGTH) : ''

/** REVIEW_KEYWORD_SQL 對應的 bind 參數 */
export const getKeywordParams = (keyword: string): string[] => {
  const pattern = `%${escapeLike(keyword)}%`
  return [keyword, pattern, pattern, pattern]
}

/** 解析分頁 offset，非數字或負數一律視為 0 */
export const parseOffset = (value: unknown): number => {
  const offset = Number(value)
  return Number.isInteger(offset) && offset > 0 ? offset : 0
}
