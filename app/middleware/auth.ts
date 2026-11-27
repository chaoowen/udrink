export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  userStore.initUser()

  if (!userStore.isAuthenticated) {
    return navigateTo(getLoginRoute(to.fullPath))
  }
})
