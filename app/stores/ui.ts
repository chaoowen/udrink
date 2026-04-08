import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const isReviewModalOpen = ref(false)
  const searchQuery = ref('')
  const searchResults = ref([])
  const isLoading = ref(false)

  const openReviewModal = () => {
    isReviewModalOpen.value = true
  }

  const closeReviewModal = () => {
    isReviewModalOpen.value = false
  }

  const toggleReviewModal = () => {
    isReviewModalOpen.value = !isReviewModalOpen.value
  }

  return {
    isReviewModalOpen,
    searchQuery,
    searchResults,
    isLoading,
    openReviewModal,
    closeReviewModal,
    toggleReviewModal
  }
})
