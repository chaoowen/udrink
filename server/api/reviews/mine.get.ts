/**
 * GET /api/reviews/mine?q=&offset= — 目前登入使用者的評價列表（分頁）
 * q 可依關鍵字搜尋店名／飲品／評論
 */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const query = getQuery(event)

  return queryReviewPage(event, {
    whereSql: `r.user_id = ? AND ${REVIEW_KEYWORD_SQL}`,
    params: [userId, ...getKeywordParams(parseKeyword(query.q))],
    offset: parseOffset(query.offset),
  })
})
