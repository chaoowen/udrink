<script setup lang="ts">
import gsap from 'gsap'

import { DRINK_CATEGORIES } from '~/constants/drink'

const uiStore = useUIStore()

const { data: latestReviews, refresh } = await useFetch('/api/reviews/latest')

const categories = DRINK_CATEGORIES

onMounted(() => {
  // Stagger animation for review cards
  gsap.from('.review-card', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  })
})
</script>

<template>
  <ViewsHomeHero />
  <div class="max-w-[1200px] mx-auto flex flex-col gap-32 py-20">
    <ViewsHomeStep />
    <ViewsHomeSearch />
    <ViewsHomeFeedBack />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
