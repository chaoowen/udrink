export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  userStore.initUser()

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
