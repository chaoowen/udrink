// 已登入者不需再看到登入頁，直接導回原本要去的頁面（在路由階段處理，避免畫面閃一下）
export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  userStore.initUser()

  if (userStore.isAuthenticated) {
    return navigateTo(getSafeRedirect(to.query.redirect))
  }
})
