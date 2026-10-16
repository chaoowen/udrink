/** PUT /api/favorites/:reviewId — 收藏評價（重複收藏不報錯） */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)
  const reviewId = getRouterParam(event, 'reviewId')

  const review = await DB.prepare('SELECT id FROM reviews WHERE id = ?')
    .bind(reviewId)
    .first()

  if (!review) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  await DB.prepare('INSERT OR IGNORE INTO review_favorites (user_id, review_id) VALUES (?, ?)')
    .bind(userId, reviewId)
    .run()

  return { success: true }
})
