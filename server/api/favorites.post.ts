/** POST /api/favorites — 切換飲品收藏狀態 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = requireUserId(event)

  const { drink_id } = body
  if (!drink_id) {
    throw createError({ statusCode: 400, statusMessage: 'Drink ID is required' })
  }

  const DB = useDB(event)

  // Toggle logic: Check if exists, then delete or insert
  const existing = await DB.prepare('SELECT * FROM favorites WHERE user_id = ? AND drink_id = ?')
    .bind(userId, drink_id)
    .first()

  if (existing) {
    await DB.prepare('DELETE FROM favorites WHERE user_id = ? AND drink_id = ?')
      .bind(userId, drink_id)
      .run()
    return { success: true, action: 'removed' }
  }

  await DB.prepare('INSERT INTO favorites (user_id, drink_id) VALUES (?, ?)')
    .bind(userId, drink_id)
    .run()
  return { success: true, action: 'added' }
})
