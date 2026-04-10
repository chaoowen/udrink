<script setup lang="ts">
const uiStore = useUIStore()
const { data: latestReviews, refresh } = await useFetch('/api/reviews/latest')
</script>

<template>
  <div class="flex flex-col gap-6">
    <h2 class="text-xl font-bold text-m-gray text-center">最新點評</h2>

    <div v-if="latestReviews && latestReviews.length > 0" class="grid gap-6">
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