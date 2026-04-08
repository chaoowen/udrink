<script setup lang="ts">
const userStore = useUserStore()
const uiStore = useUIStore()

onMounted(() => {
  userStore.initUser()
})
</script>

<template>
  <div class="min-h-screen bg-m-cream pb-32">
    <NuxtRouteAnnouncer />
    
    <!-- Top Bar -->
    <header class="p-6 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-black text-m-gray tracking-tighter">
        UD<span class="text-m-pink">RINK</span>
      </NuxtLink>
      
      <div v-if="userStore.isAuthenticated" class="text-sm font-bold text-m-gray">
        嗨，{{ userStore.username || '飲友' }}
      </div>
    </header>

    <main class="max-w-xl mx-auto px-6">
      <NuxtPage />
    </main>

    <!-- Review Modal -->
    <ReviewModal />

    <!-- Navigation -->
    <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-md p-2 rounded-bubble shadow-2xl flex justify-around items-center border border-white/50 z-40">
      <NuxtLink to="/" class="nav-item p-4 text-m-gray hover:text-m-pink transition-colors">
        <span class="text-2xl">🏠</span>
      </NuxtLink>
      
      <button 
        @click="uiStore.openReviewModal" 
        class="w-16 h-16 bg-m-pink rounded-full shadow-lg flex items-center justify-center text-white text-3xl active:scale-95 transition-transform -translate-y-4 border-4 border-m-cream"
      >
        +
      </button>

      <NuxtLink to="/profile" class="nav-item p-4 text-m-gray hover:text-m-pink transition-colors">
        <span class="text-2xl">👤</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
