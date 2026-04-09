<script setup lang="ts">
</script>

<template>
  <div class="relative min-h-screen bg-m-cream">
    <NuxtRouteAnnouncer />
    
    <LayoutHeader />

    <main class="pt-16 px-4 md:px-0">
      <NuxtPage />
    </main>

    <ReviewModal />
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
