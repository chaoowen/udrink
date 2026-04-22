<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.initUser()
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="fixed top-0 w-full p-3 z-50 bg-m-cream">
    <div
      class="max-w-[1200px] mx-auto flex justify-between items-center"
      :class="{ 'sm:flex-row flex-col gap-2': userStore.isAuthenticated }"
    >
      <NuxtLink to="/" class="flex items-center gap-2" :class="{ 'self-start': userStore.isAuthenticated }">
        <img src="~/assets/images/icons/text-1.png" alt="udrink-logo" class="h-10">
        <img src="~/assets/images/icons/text-2.png" alt="udrink-logo" class="h-10">
      </NuxtLink>

      <div v-if="userStore.isAuthenticated" class="flex items-center gap-3 self-end sm:self-auto">
        <span class="text-sm font-bold">
          嗨，{{ userStore.username || '飲友' }}
        </span>
        <NuxtLink
          to="/profile"
          class="text-sm text-m-purple-dark border border-m-purple-dark px-3 py-1 rounded-full hover:bg-m-purple/60 transition-colors"
        >
          <span>個人紀錄</span>
        </NuxtLink>
        <button
          @click="handleLogout"
          class="text-sm text-m-blue-dark border border-m-blue-dark px-3 py-1 rounded-full hover:bg-m-blue/60 transition-colors"
        >
          登出
        </button>
      </div>
      <NuxtLink v-else to="/login">
        <img src="~/assets/images/icons/text-login.png" alt="" class="h-10">
      </NuxtLink>
    </div>
  </header>
</template>
