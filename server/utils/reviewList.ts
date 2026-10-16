import type { H3Event } from 'h3'

interface ReviewListFilter {
  /** 額外的 WHERE 條件（不含 WHERE 關鍵字），需為常數 SQL，值一律走 params */
  whereSql: string
  params: unknown[]
  offset: number
}

/**
 * 依條件查詢分頁評價列表，COUNT 與列表並行
 * @returns 與前端 PaginatedReviewsResponse 對應的 { reviews, total, hasMore }
 */
export const queryReviewPage = async (
  event: H3Event,
  { whereSql, params, offset }: ReviewListFilter,
) => {
  const DB = useDB(event)

  const [results, total] = await Promise.all([
    DB.prepare(`${REVIEW_SELECT_SQL} WHERE ${whereSql} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`)
      .bind(...params, REVIEW_PAGE_SIZE, offset)
      .all(),
    DB.prepare(`SELECT COUNT(*) as count FROM reviews r WHERE ${whereSql}`)
      .bind(...params)
      .first<{ count: number }>(),
  ])

  const totalCount = total?.count ?? 0

  return {
    reviews: results.results,
    total: totalCount,
    hasMore: offset + REVIEW_PAGE_SIZE < totalCount,
  }
}
