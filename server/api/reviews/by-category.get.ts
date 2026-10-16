/** GET /api/reviews/by-category — 依飲品分類篩選評價 */
export default defineEventHandler(async (event) => {
  const DB = useDB(event)
  const { category } = getQuery(event)

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: 'category is required' })
  }

  const results = await DB.prepare(`
    ${REVIEW_SELECT_SQL}
    WHERE r.category = ?
    ORDER BY r.created_at DESC
    LIMIT 50
  `)
    .bind(category)
    .all()

  return results.results
})
