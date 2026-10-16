import type { H3Event } from 'h3'

const USER_COOKIE = 'udrink_user_id'

/** 取得登入使用者 ID，未登入回傳 null */
export const getUserId = (event: H3Event): string | null => getCookie(event, USER_COOKIE) || null

/**
 * 取得登入使用者 ID，未登入直接中斷請求
 * @throws 401 — 未登入
 */
export const requireUserId = (event: H3Event): string => {
  const userId = getUserId(event)

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return userId
}
