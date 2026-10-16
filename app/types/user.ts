/** 使用者資料 */
export interface User {
  id: string
  username: string
}

/** POST /api/auth 回應 */
export interface AuthResponse {
  success: boolean
  user: User
}
