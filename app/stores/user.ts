import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null)
  const username = ref<string | null>(null)
  const isLoaded = ref(false)

  // Initialize from cookie on client side
  const initUser = () => {
    const cookieId = useCookie('udrink_user_id')
    if (cookieId.value) {
      userId.value = cookieId.value
    }
    isLoaded.value = true
  }

  const login = async (name: string) => {
    try {
      const { data, error } = await useFetch('/api/auth', {
        method: 'POST',
        body: { username: name }
      })

      if (error.value) throw error.value

      const result = data.value as any
      userId.value = result.user.id
      username.value = result.user.username
      
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
    cookieId.value = null
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
