import type { RouteLocationRaw } from 'vue-router'

/**
 * 取得安全的站內導向路徑，避免 ?redirect= 被帶到外部網站（open redirect）
 * @param value - 通常為 route.query.redirect
 * @returns 合法的站內路徑，否則回傳首頁
 * @example
 * getSafeRedirect(route.query.redirect) // '/profile'
 */
export const getSafeRedirect = (value: unknown): string => {
  const isInternalPath = typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
  return isInternalPath ? value : '/'
}

/**
 * 建立帶有返回路徑的登入頁路由，登入後可回到原本的頁面
 * @param redirect - 登入後要返回的站內路徑
 */
export const getLoginRoute = (redirect: string): RouteLocationRaw => ({
  path: '/login',
  query: redirect === '/' ? {} : { redirect },
})
