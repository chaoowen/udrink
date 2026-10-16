/**
 * GET /api/search?q=&offset= — 全站評價搜尋（分頁）
 * 依關鍵字比對店名／飲品／評論；q 為空時回傳全部評價（新到舊）
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return queryReviewPage(event, {
    whereSql: REVIEW_KEYWORD_SQL,
    params: getKeywordParams(parseKeyword(query.q)),
    offset: parseOffset(query.offset),
  })
})
