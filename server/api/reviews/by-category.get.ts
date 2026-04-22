export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare?.env?.DB

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  const { category } = getQuery(event)

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: 'category is required' })
  }

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
    WHERE r.category = ?
    ORDER BY r.created_at DESC
    LIMIT 50
  `)
  .bind(category)
  .all()

  return results.results
})
