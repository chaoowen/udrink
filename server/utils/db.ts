import type { H3Event } from 'h3'
import type { D1Database } from '@cloudflare/workers-types'

/**
 * 取得 Cloudflare D1 binding
 * @throws 500 — 執行環境未提供 DB binding
 */
export const useDB = (event: H3Event): D1Database => {
  const DB = event.context.cloudflare?.env?.DB as D1Database | undefined

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' })
  }

  return DB
}
