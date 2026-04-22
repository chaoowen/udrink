<script setup lang="ts">
const uiStore = useUIStore()
const { data: latestReviews, refresh } = await useFetch('/api/reviews/latest')
</script>

<template>
  <div class="flex flex-col gap-6 pb-10">
    <h2 class="text-4xl font-bold text-center">最新點評</h2>

    <div v-if="latestReviews && latestReviews.length > 0" class="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full mx-auto">
      <ReviewCard 
        v-for="review in latestReviews" 
        :key="review.id" 
        :review="review" 
      />
    </div>
    
    <div v-else class="text-center flex flex-col items-center gap-4">
      <Icon name="ph:coffee-duotone" class="text-6xl text-m-gray/20" />
      <p class="opacity-60">還沒有人發表評價喔...</p>
      <CommonButton variant="pink" @click="uiStore.openReviewModal">成為第一個！</CommonButton>
    </div>
  </div>
</template>