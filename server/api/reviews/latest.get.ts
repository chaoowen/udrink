export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare?.env?.DB

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  const query = getQuery(event)
  const limit = 10
  const offset = Number(query.offset ?? 0)

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
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `)
  .bind(limit, offset)
  .all()

  const total = await DB.prepare('SELECT COUNT(*) as count FROM reviews').first<{ count: number }>()

  return {
    reviews: results.results,
    hasMore: offset + limit < (total?.count ?? 0),
  }
})
