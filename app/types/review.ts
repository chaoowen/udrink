/** 評價資料（API 回傳格式） */
export interface Review {
  id: string
  shop_name: string
  drink_name: string
  category: string
  rating: number
  sugar_ice: string
  comment: string
  created_at: string
  username?: string
}

/** 新增評價的請求參數 */
export interface CreateReviewPayload {
  shop_name: string
  drink_name: string
  category: string | null
  rating: number
  sugar_ice: string
  comment: string
  shop_id?: string | null
}

/** 編輯評價的請求參數 */
export type UpdateReviewPayload = Omit<CreateReviewPayload, 'shop_id'>

/** 評價編輯表單資料（含 id） */
export interface EditingReview {
  id: string
  shop_name: string
  drink_name: string
  category: string
  rating: number
  sugar_ice: string
  comment: string
}

/** 分頁評價列表回應（/api/reviews/latest、/api/reviews/mine） */
export interface PaginatedReviewsResponse {
  reviews: Review[]
  total: number
  hasMore: boolean
}

/** 評價搜尋／分頁查詢條件 */
export interface ReviewSearchQuery {
  q?: string
  offset?: number
}
