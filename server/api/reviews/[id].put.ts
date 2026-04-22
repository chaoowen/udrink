export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'udrink_user_id')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const DB = event.context.cloudflare?.env?.DB

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await DB.prepare('SELECT user_id FROM reviews WHERE id = ?')
    .bind(id)
    .first()

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  if (existing.user_id !== userId) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  await DB.prepare(`
    UPDATE reviews
    SET shop_name = ?, drink_name = ?, category = ?, rating = ?, sugar_ice = ?, comment = ?
    WHERE id = ?
  `)
    .bind(
      body.shop_name,
      body.drink_name,
      body.category ?? null,
      body.rating,
      body.sugar_ice ?? null,
      body.comment ?? null,
      id
    )
    .run()

  return { success: true }
})
