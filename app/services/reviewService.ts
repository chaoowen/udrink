import type {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
  LatestReviewsResponse,
} from '~/types/review'

/**
 * 評價相關 API 服務
 */
export const reviewService = {
  /** 取得最新評價列表（含分頁） */
  async fetchLatest(offset = 0) {
    return $fetch<LatestReviewsResponse>('/api/reviews/latest', {
      params: { offset },
    })
  },

  /** 依分類取得評價 */
  async fetchByCategory(category: string) {
    return $fetch<Review[]>('/api/reviews/by-category', {
      params: { category },
    })
  },

  /** 取得我的評價列表 */
  async fetchMine() {
    return $fetch<Review[]>('/api/reviews/mine')
  },

  /** 新增評價 */
  async create(payload: CreateReviewPayload) {
    return $fetch<{ success: boolean; id: string }>('/api/reviews', {
      method: 'POST',
      body: payload,
    })
  },

  /** 編輯評價 */
  async update(id: string, payload: UpdateReviewPayload) {
    return $fetch<{ success: boolean }>(`/api/reviews/${id}`, {
      method: 'PUT',
      body: payload,
    })
  },
}
