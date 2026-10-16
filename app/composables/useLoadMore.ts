import type { PaginatedReviewsResponse } from '~/types/review'

/**
 * 分頁列表的「載入更多」：抓下一頁並接在現有列表後
 * 若載入期間列表已被重新查詢（如關鍵字變更），丟棄過期結果
 * @param data - useAsyncData 回傳的第一頁資料
 * @param fetchPage - 依 offset 取得一頁資料
 * @example
 * const { data } = await useAsyncData('key', () => fetchPage(0))
 * const { isLoadingMore, loadMore } = useLoadMore(data, fetchPage)
 */
export function useLoadMore(
  data: Ref<PaginatedReviewsResponse | undefined>,
  fetchPage: (offset: number) => Promise<PaginatedReviewsResponse>,
) {
  const isLoadingMore = ref(false)

  const loadMore = async () => {
    const current = data.value
    if (!current || isLoadingMore.value) return

    isLoadingMore.value = true
    try {
      const next = await fetchPage(current.reviews.length)
      if (data.value !== current) return

      data.value = { ...next, reviews: [...current.reviews, ...next.reviews] }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      isLoadingMore.value = false
    }
  }

  return {
    isLoadingMore: readonly(isLoadingMore),
    loadMore,
  }
}
