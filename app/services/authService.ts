import type { AuthResponse } from '~/types/user'

/**
 * 認證相關 API 服務
 */
export const authService = {
  /** 登入或註冊（Get or Create） */
  async login(username: string) {
    return $fetch<AuthResponse>('/api/auth', {
      method: 'POST',
      body: { username },
    })
  },
}
