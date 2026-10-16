import type { PaginatedReviewsResponse } from '~/types/review'

/**
 * 收藏評價相關 API 服務
 */
export const favoriteService = {
  /** 取得我收藏的評價 id 清單 */
  async fetchIds() {
    return $fetch<string[]>('/api/favorites/ids')
  },

  /**
   * 取得我收藏的評價列表（分頁，依收藏時間新到舊）
   * 需在 Nuxt context 內呼叫（如 useAsyncData），SSR 時才會轉送登入 cookie
   */
  async fetchList(offset = 0) {
    const requestFetch = useRequestFetch()
    return requestFetch<PaginatedReviewsResponse>('/api/favorites', {
      params: { offset: offset || undefined },
    })
  },

  /** 收藏評價 */
  async add(reviewId: string) {
    return $fetch<{ success: boolean }>(`/api/favorites/${reviewId}`, { method: 'PUT' })
  },

  /** 取消收藏評價 */
  async remove(reviewId: string) {
    return $fetch<{ success: boolean }>(`/api/favorites/${reviewId}`, { method: 'DELETE' })
  },
}
