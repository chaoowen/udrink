/** POST /api/reviews — 新增飲品評價 */
export default defineEventHandler(async (event) => {
  const userId = getUserId(event)
  const body = await readValidatedBody(event, createReviewSchema.parse)
  const DB = useDB(event)

  const id = crypto.randomUUID()
  await DB.prepare(`
    INSERT INTO reviews
      (id, user_id, shop_id, shop_name, drink_name, category, rating, sugar_ice, comment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(
      id, userId, body.shop_id, body.shop_name, body.drink_name,
      body.category, body.rating, body.sugar_ice, body.comment,
    )
    .run()

  return { success: true, id }
})
