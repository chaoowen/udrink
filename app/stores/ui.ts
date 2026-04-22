import { defineStore } from 'pinia'

interface EditingReview {
  id: string
  shop_name: string
  drink_name: string
  category: string
  rating: number
  sugar_ice: string
  comment: string
}

export const useUIStore = defineStore('ui', () => {
  const isReviewModalOpen = ref(false)
  const editingReview = ref<EditingReview | null>(null)
  const searchQuery = ref('')
  const searchResults = ref([])
  const isLoading = ref(false)

  const openReviewModal = () => {
    editingReview.value = null
    isReviewModalOpen.value = true
  }

  const openEditModal = (review: EditingReview) => {
    editingReview.value = review
    isReviewModalOpen.value = true
  }

  const closeReviewModal = () => {
    isReviewModalOpen.value = false
    editingReview.value = null
  }

  const toggleReviewModal = () => {
    isReviewModalOpen.value = !isReviewModalOpen.value
  }

  return {
    isReviewModalOpen,
    editingReview,
    searchQuery,
    searchResults,
    isLoading,
    openReviewModal,
    openEditModal,
    closeReviewModal,
    toggleReviewModal
  }
})
