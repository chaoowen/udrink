<script setup lang="ts">
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

// 收藏狀態只影響愛心顯示，於 client 端依登入狀態載入／清空
onMounted(() => {
  watch(
    () => userStore.userId,
    userId => (userId ? favoriteStore.fetchFavoriteIds() : favoriteStore.reset()),
    { immediate: true },
  )
})
</script>

<template>
  <div class="relative min-h-screen bg-m-cream">
    <NuxtRouteAnnouncer />

    <LayoutHeader />

    <main class="pt-16 pb-8">
      <NuxtPage />
    </main>

    <LayoutFooter />

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
