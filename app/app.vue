<script setup lang="ts">
</script>

<template>
  <div class="relative min-h-screen bg-m-cream pb-32">
    <NuxtRouteAnnouncer />
    
    <LayoutHeader />

    <main class="pt-16">
      <NuxtPage />
    </main>

    <!-- Review Modal -->
    <ReviewModal />

    <!-- Navigation -->
    <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-md p-2 rounded-bubble shadow-2xl flex justify-around items-center border border-white/50 z-40">
      <NuxtLink to="/" class="nav-item p-4 text-m-gray hover:text-m-pink transition-colors">
        <span class="text-2xl">🏠</span>
      </NuxtLink>

      <NuxtLink to="/profile" class="nav-item p-4 text-m-gray hover:text-m-pink transition-colors">
        <span class="text-2xl">👤</span>
      </NuxtLink>
    </nav>

    <ViewsReviewButton />
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
