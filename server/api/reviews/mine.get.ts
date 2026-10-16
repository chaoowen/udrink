const MAX_KEYWORD_LENGTH = 50
const PAGE_SIZE = 10

/**
 * GET /api/reviews/mine?q=&offset= — 目前登入使用者的評價列表（分頁）
 * q 可依關鍵字搜尋店名／飲品／評論
 */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)

  const query = getQuery(event)
  const keyword = typeof query.q === 'string' ? query.q.trim().slice(0, MAX_KEYWORD_LENGTH) : ''
  const pattern = `%${escapeLike(keyword)}%`
  const offset = parseOffset(query.offset)

  const whereSql = `
    WHERE r.user_id = ?
      AND (
        ? = ''
        OR r.shop_name LIKE ? ESCAPE '\\'
        OR r.drink_name LIKE ? ESCAPE '\\'
        OR r.comment LIKE ? ESCAPE '\\'
      )
  `
  const whereParams = [userId, keyword, pattern, pattern, pattern]

  const [results, total] = await Promise.all([
    DB.prepare(`${REVIEW_SELECT_SQL} ${whereSql} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`)
      .bind(...whereParams, PAGE_SIZE, offset)
      .all(),
    DB.prepare(`SELECT COUNT(*) as count FROM reviews r ${whereSql}`)
      .bind(...whereParams)
      .first<{ count: number }>(),
  ])

  const totalCount = total?.count ?? 0

  return {
    reviews: results.results,
    total: totalCount,
    hasMore: offset + PAGE_SIZE < totalCount,
  }
})
