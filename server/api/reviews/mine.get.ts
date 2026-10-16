const MAX_KEYWORD_LENGTH = 50

/** 跳脫 LIKE 萬用字元，讓使用者輸入的 % 與 _ 以字面比對 */
const escapeLike = (value: string): string => value.replace(/[\\%_]/g, '\\$&')

/** GET /api/reviews/mine?q= — 取得目前登入使用者的評價列表，可依關鍵字搜尋店名／飲品／評論 */
export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'udrink_user_id')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const DB = event.context.cloudflare?.env?.DB

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  const query = getQuery(event)
  const keyword = typeof query.q === 'string' ? query.q.trim().slice(0, MAX_KEYWORD_LENGTH) : ''
  const pattern = `%${escapeLike(keyword)}%`

  const results = await DB.prepare(`
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
    WHERE r.user_id = ?
      AND (
        ? = ''
        OR r.shop_name LIKE ? ESCAPE '\\'
        OR r.drink_name LIKE ? ESCAPE '\\'
        OR r.comment LIKE ? ESCAPE '\\'
      )
    ORDER BY r.created_at DESC
    LIMIT 20
  `)
  .bind(userId, keyword, pattern, pattern, pattern)
  .all()

  return results.results
})
