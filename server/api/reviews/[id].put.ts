/** PUT /api/reviews/:id — 編輯自己的評價 */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)

  const id = getRouterParam(event, 'id')
  const body = await readValidatedBody(event, updateReviewSchema.parse)

  const existing = await DB.prepare('SELECT user_id FROM reviews WHERE id = ?')
    .bind(id)
    .first<{ user_id: string | null }>()

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
      body.category,
      body.rating,
      body.sugar_ice,
      body.comment,
      id,
    )
    .run()

  return { success: true }
})
