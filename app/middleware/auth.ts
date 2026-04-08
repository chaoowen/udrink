export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  // Only redirect if we've attempted to load the user
  if (userStore.isLoaded && !userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
