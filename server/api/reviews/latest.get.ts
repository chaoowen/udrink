/** GET /api/reviews/latest — 取得最新評價列表（含分頁） */
export default defineEventHandler(async (event) => {
  const DB = useDB(event)
  const query = getQuery(event)
  const limit = 10
  const offset = parseOffset(query.offset)

  const results = await DB.prepare(`
    ${REVIEW_SELECT_SQL}
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `)
    .bind(limit, offset)
    .all()

  const total = await DB.prepare('SELECT COUNT(*) as count FROM reviews').first<{ count: number }>()

  const totalCount = total?.count ?? 0

  return {
    reviews: results.results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
  }
})
