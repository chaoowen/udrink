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
  <div class="flex flex-col gap-8 py-4">
    <ViewsHomeSearch />
    <!-- Categories -->
    <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
      <button 
        v-for="cat in categories" 
        :key="cat"
        class="whitespace-nowrap px-6 py-2 bg-white rounded-full text-sm font-bold text-m-gray shadow-sm border border-[#eee] active:scale-95 transition-transform"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Feed -->
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-m-gray">最新點評</h2>
        <button @click="() => refresh()" class="text-xs text-m-pink font-bold">↻ 重新整理</button>
      </div>

      <div v-if="latestReviews && latestReviews.length > 0" class="grid gap-6">
        <ReviewCard 
          v-for="review in latestReviews" 
          :key="review.id" 
          :review="review" 
        />
      </div>
      
      <div v-else class="py-20 text-center flex flex-col items-center gap-4">
        <div class="text-6xl grayscale opacity-20">🥤</div>
        <p class="text-m-gray opacity-40 font-bold">還沒有人發表評價喔...</p>
        <CommonButton variant="pink" @click="uiStore.openReviewModal">成為第一個！</CommonButton>
      </div>
    </div>
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
