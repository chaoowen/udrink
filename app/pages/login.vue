<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const isLoading = ref(false)
const loginBtn = ref(null)

const handleLogin = async () => {
  if (!username.value || username.value.length < 2) {
    alert('請輸入至少 2 個字的用戶名喔！')
    return
  }

  isLoading.value = true
  const result = await userStore.login(username.value)
  isLoading.value = false

  if (result.success) {
    // Only play the celebratory expansion if login was successful!
    if (loginBtn.value) {
      await (loginBtn.value as any).playTransition()
    }
    router.push('/')
  } else {
    alert('登入失敗，請稍後再試。')
  }
}
// If already logged in, redirect
onMounted(() => {
  if (userStore.isAuthenticated) {
    router.push('/')
  }
})
const loginIcons = [
  // { name: 'cloude-1.png', class: 'top-10 left-10 md:left-40 w-32 md:w-56 opacity-50', delay: '0s', duration: '8s' },
  { name: 'circle-1.png', class: 'bottom-0 md:bottom-1/4 left-0 md:left-20 xl:left-60 w-24 md:w-40 opacity-40', delay: '1s', duration: '5s' },
  { name: 'cloude-2.png', class: 'top-1/3 right-12 md:right-20 xl:right-48 w-40 md:w-64 opacity-50', delay: '0.5s', duration: '9s' },
]
</script>

<template>
  <div class="h-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background Floating Icons 🎉 -->
    <FloatingIcons :icons="loginIcons" />

    <div class="py-10 flex flex-col gap-12 items-center text-center relative z-20">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">喝貨的起點就此展開</h1>
      <p>輸入名字，讓你的紀錄可以被保留，點餐時刻不焦慮</p>
      <div class="w-full p-6 bg-m-pink/40 rounded-3xl border border-m-pink/30">
        <h3 class="pb-1 text-sm font-bold">⚠️ 隱私提醒</h3>
        <p class="text-sm font-medium">本站採用「簡易識別」機制，未設置傳統密碼保護。</p>
        <p class="text-sm font-medium">建議使用獨特的用戶名以避免意外被他人登入。</p>
        <p class="text-sm font-medium">本站僅供個人收藏與分享心得使用，請勿存放敏感資料。</p>
      </div>
  </div>

    <div class="w-full max-w-xs flex flex-col gap-4">
      <CommonInput 
        v-model="username"
        placeholder="你的名字 (例如: Kevin)"
        input-class="text-center focus:ring-m-pink/30"
        @enter="handleLogin"
      />
      
      <CommonButton 
        ref="loginBtn"
        variant="purple" 
        @click="handleLogin"
        :disabled="isLoading"
        manual
      >
        {{ isLoading ? '登入中...' : '出發！' }}
      </CommonButton>
    </div>
    </div>
  </div>
</template>
