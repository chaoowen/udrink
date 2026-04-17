export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare?.env?.DB

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  const results = await DB.prepare(`
    SELECT
      r.id,
      r.shop_name,
      r.drink_name,
      r.rating,
      r.sugar_ice,
      r.comment,
      r.created_at,
      u.username
    FROM reviews r
    LEFT JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC
    LIMIT 20
  `)
  .all()

  return results.results
})
