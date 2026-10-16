/** GET /api/reviews/latest?offset= — 取得最新評價列表（分頁） */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return queryReviewPage(event, {
    whereSql: '1 = 1',
    params: [],
    offset: parseOffset(query.offset),
  })
})
