<script setup lang="ts">
const userStore = useUserStore()

onMounted(() => {
  userStore.initUser()
})
</script>

<template>
  <header class="fixed top-0 w-full p-3 z-50 bg-m-cream">
    <div class="max-w-[1200px] mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="~/assets/images/icons/text-1.png" alt="udrink-logo" class="h-10">
        <img src="~/assets/images/icons/text-2.png" alt="udrink-logo" class="h-10">
      </NuxtLink>
      
      <div v-if="userStore.isAuthenticated" class="text-sm font-bold text-m-gray">
        嗨，{{ userStore.username || '飲友' }}
      </div>
    </div>
  </header>
</template>
