import type { H3Event } from 'h3'

interface ReviewListFilter {
  /** WHERE 條件（不含 WHERE 關鍵字），需為常數 SQL，值一律走 params */
  whereSql: string
  params: unknown[]
  offset: number
  /** 額外 JOIN（常數 SQL），例如收藏清單 JOIN review_favorites */
  joinSql?: string
  /** 排序（常數 SQL），預設依評價建立時間新到舊 */
  orderSql?: string
}

/**
 * 依條件查詢分頁評價列表，COUNT 與列表並行
 * @returns 與前端 PaginatedReviewsResponse 對應的 { reviews, total, hasMore }
 */
export const queryReviewPage = async (
  event: H3Event,
  { whereSql, params, offset, joinSql = '', orderSql = 'r.created_at DESC' }: ReviewListFilter,
) => {
  const DB = useDB(event)

  const [results, total] = await Promise.all([
    DB.prepare(`
      ${REVIEW_SELECT_SQL} ${joinSql}
      WHERE ${whereSql}
      ORDER BY ${orderSql}
      LIMIT ? OFFSET ?
    `)
      .bind(...params, REVIEW_PAGE_SIZE, offset)
      .all(),
    DB.prepare(`SELECT COUNT(*) as count FROM reviews r ${joinSql} WHERE ${whereSql}`)
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
