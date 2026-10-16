import { defineStore } from 'pinia'
import type { EditingReview, Review } from '~/types/review'

export const useUIStore = defineStore('ui', () => {
  const isReviewModalOpen = ref(false)
  const editingReview = ref<EditingReview | null>(null)
  const searchQuery = ref('')
  const searchResults = ref<Review[]>([])
  const isLoading = ref(false)
  const reviewsVersion = ref(0)

  /** 遞增版本號，觸發評價列表重新載入 */
  const bumpReviewsVersion = () => { reviewsVersion.value++ }

  /** 開啟新增評價 Modal */
  const openReviewModal = () => {
    editingReview.value = null
    isReviewModalOpen.value = true
  }

  /** 開啟編輯評價 Modal，帶入現有資料 */
  const openEditModal = (review: EditingReview) => {
    editingReview.value = review
    isReviewModalOpen.value = true
  }

  /** 關閉評價 Modal 並清除編輯狀態 */
  const closeReviewModal = () => {
    isReviewModalOpen.value = false
    editingReview.value = null
  }

  /** 切換評價 Modal 開關狀態 */
  const toggleReviewModal = () => {
    isReviewModalOpen.value = !isReviewModalOpen.value
  }

  return {
    isReviewModalOpen,
    editingReview,
    searchQuery,
    searchResults,
    isLoading,
    reviewsVersion,
    openReviewModal,
    openEditModal,
    closeReviewModal,
    toggleReviewModal,
    bumpReviewsVersion
  }
})
