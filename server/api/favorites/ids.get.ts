/** GET /api/favorites/ids — 目前登入使用者收藏的評價 id 清單（供愛心按鈕判斷狀態） */
export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const DB = useDB(event)

  const results = await DB.prepare('SELECT review_id FROM review_favorites WHERE user_id = ?')
    .bind(userId)
    .all<{ review_id: string }>()

  return results.results.map(row => row.review_id)
})
