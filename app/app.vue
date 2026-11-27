<script setup lang="ts">
const SITE_TITLE = 'Udrink 嗚！好喝 - 社群飲品評鑑平台'

// 各頁用 useHead({ title }) 設定頁名，分頁標籤一眼就能分辨
useHead({
  titleTemplate: title => (title && title !== SITE_TITLE ? `${title}｜Udrink 嗚！好喝` : SITE_TITLE),
})

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
