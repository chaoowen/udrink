<script setup lang="ts">
import gsap from 'gsap'

const uiStore = useUIStore()

const { data: latestReviews, refresh } = await useFetch('/api/reviews/latest')

const categories = ['純茶', '奶茶', '鮮奶茶', '果茶', '奶蓋', '其他', '無咖啡因']

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
  <ViewsHome />
  <div class="flex flex-col gap-8 py-4">
    <!-- Hero Search -->
    <div class="flex flex-col gap-4">
      
      <div class="relative">
        <input 
          v-model="uiStore.searchQuery"
          type="text"
          placeholder="搜尋飲品或店名..."
          class="w-full bg-white p-6 rounded-bubble shadow-lg border-none focus:ring-4 focus:ring-m-blue/30 outline-none text-lg transition-all"
        />
        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
      </div>
    </div>

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
        <button @click="refresh" class="text-xs text-m-pink font-bold">↻ 重新整理</button>
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
        <BubbleButton variant="pink" @click="uiStore.openReviewModal">成為第一個！</BubbleButton>
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
