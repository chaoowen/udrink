import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null)
  const username = ref<string | null>(null)
  const isLoaded = ref(false)

  // Initialize from cookie on client side
  const initUser = () => {
    const cookieId = useCookie('udrink_user_id')
    const cookieUsername = useCookie('udrink_username')
    if (cookieId.value) {
      userId.value = cookieId.value
      username.value = cookieUsername.value ?? null
    }
    isLoaded.value = true
  }

  const login = async (name: string) => {
    try {
      const result = await $fetch<{ user: { id: string; username: string } }>('/api/auth', {
        method: 'POST',
        body: { username: name }
      })

      userId.value = result.user.id
      username.value = result.user.username

      const cookieUsername = useCookie('udrink_username', {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
      })
      cookieUsername.value = result.user.username

      return { success: true }
    } catch (err) {
      console.error('Login failed:', err)
      return { success: false, error: err }
    }
  }

  const logout = () => {
    userId.value = null
    username.value = null
    const cookieId = useCookie('udrink_user_id')
    const cookieUsername = useCookie('udrink_username')
    cookieId.value = null
    cookieUsername.value = null
  }

  const isAuthenticated = computed(() => !!userId.value)

  return {
    userId,
    username,
    isLoaded,
    initUser,
    login,
    logout,
    isAuthenticated
  }
})
