const MAX_KEYWORD_LENGTH = 50

/** GET /api/reviews/mine?q= — 取得目前登入使用者的評價列表，可依關鍵字搜尋店名／飲品／評論 */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)

  const query = getQuery(event)
  const keyword = typeof query.q === 'string' ? query.q.trim().slice(0, MAX_KEYWORD_LENGTH) : ''
  const pattern = `%${escapeLike(keyword)}%`

  const results = await DB.prepare(`
    ${REVIEW_SELECT_SQL}
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
