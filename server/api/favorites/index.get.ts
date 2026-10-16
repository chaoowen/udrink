/** GET /api/favorites?offset= — 目前登入使用者收藏的評價（分頁，依收藏時間新到舊） */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const query = getQuery(event)

  return queryReviewPage(event, {
    joinSql: 'JOIN review_favorites f ON f.review_id = r.id',
    whereSql: 'f.user_id = ?',
    params: [userId],
    orderSql: 'f.created_at DESC',
    offset: parseOffset(query.offset),
  })
})
