export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  userStore.initUser()

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
