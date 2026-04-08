<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!username.value || username.value.length < 2) {
    alert('請輸入至少 2 個字的用戶名喔！')
    return
  }

  isLoading.value = true
  const result = await userStore.login(username.value)
  isLoading.value = false

  if (result.success) {
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
</script>

<template>
  <div class="py-20 flex flex-col gap-12 items-center text-center">
    <div class="flex flex-col gap-4">
      <div class="text-7xl">🎈</div>
      <h1 class="text-3xl font-black text-m-gray">開始你的飲品紀錄</h1>
      <p class="text-m-gray opacity-60 text-sm">輸入一個喜歡的名字就能立刻開始</p>
    </div>

    <div class="w-full max-w-xs flex flex-col gap-4">
      <input 
        v-model="username"
        type="text"
        placeholder="你的名字 (例如: Kevin)"
        class="w-full bg-white p-5 rounded-bubble shadow-md border-none focus:ring-4 focus:ring-m-pink/30 outline-none text-center text-lg font-bold"
        @keyup.enter="handleLogin"
      />
      
      <BubbleButton 
        variant="pink" 
        @click="handleLogin"
        :disabled="isLoading"
      >
        {{ isLoading ? '進場中...' : '出發！' }}
      </BubbleButton>
    </div>

    <div class="max-w-xs p-6 bg-m-pink/20 rounded-3xl border border-m-pink/30">
      <h3 class="text-xs font-black text-m-gray mb-2 uppercase tracking-widest">⚠️ 隱私提醒</h3>
      <p class="text-[11px] text-m-gray leading-relaxed opacity-80">
        本站採用「簡易識別」機制，未設置傳統密碼保護。請使用獨特的用戶名以避免意外被他人登入。此功能僅供個人收藏與分享心得使用，請勿存放敏感資料。
      </p>
    </div>
  </div>
</template>
