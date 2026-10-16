import { defineStore } from 'pinia'
import { favoriteService } from '~/services/favoriteService'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref<string[]>([])
  /** 收藏異動時遞增，讓收藏清單等列表重新載入 */
  const favoritesVersion = ref(0)

  const isFavorited = (reviewId: string): boolean => favoriteIds.value.includes(reviewId)

  /** 載入目前使用者的收藏 id；失敗時維持空清單，不影響頁面瀏覽 */
  const fetchFavoriteIds = async () => {
    try {
      favoriteIds.value = await favoriteService.fetchIds()
    }
    catch (err) {
      console.error('Fetch favorite ids failed:', err)
      favoriteIds.value = []
    }
  }

  /** 切換收藏狀態：先更新畫面，API 失敗再還原 */
  const toggleFavorite = async (reviewId: string) => {
    const wasFavorited = isFavorited(reviewId)
    const previousIds = favoriteIds.value

    favoriteIds.value = wasFavorited
      ? previousIds.filter(id => id !== reviewId)
      : [...previousIds, reviewId]

    try {
      await (wasFavorited ? favoriteService.remove(reviewId) : favoriteService.add(reviewId))
      favoritesVersion.value++
    }
    catch (err) {
      console.error('Toggle favorite failed:', err)
      favoriteIds.value = previousIds
    }
  }

  /** 登出時清空 */
  const reset = () => {
    favoriteIds.value = []
  }

  return {
    favoriteIds,
    favoritesVersion,
    isFavorited,
    fetchFavoriteIds,
    toggleFavorite,
    reset,
  }
})
