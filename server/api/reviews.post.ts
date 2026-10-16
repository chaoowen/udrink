/** POST /api/reviews — 新增飲品評價 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = getUserId(event)

  const { shop_name, drink_name, category, rating, sugar_ice, comment, shop_id } = body

  if (!shop_name || !drink_name || !rating) {
    throw createError({ statusCode: 400, statusMessage: 'shop_name, drink_name and rating are required' })
  }

  const DB = useDB(event)

  const id = crypto.randomUUID()
  await DB.prepare(`
    INSERT INTO reviews (id, user_id, shop_id, shop_name, drink_name, category, rating, sugar_ice, comment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(
      id, userId, shop_id || null, shop_name, drink_name,
      category || null, rating, sugar_ice, comment,
    )
    .run()

  return { success: true, id }
})
