/** DELETE /api/favorites/:reviewId — 取消收藏評價（未收藏也視為成功） */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)
  const reviewId = getRouterParam(event, 'reviewId')

  await DB.prepare('DELETE FROM review_favorites WHERE user_id = ? AND review_id = ?')
    .bind(userId, reviewId)
    .run()

  return { success: true }
})
