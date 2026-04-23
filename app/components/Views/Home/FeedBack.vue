<script setup lang="ts">
const uiStore = useUIStore()

const reviews = ref<any[]>([])
const hasMore = ref(false)
const isLoading = ref(false)

interface LatestReviewsResponse {
  reviews: any[]
  hasMore: boolean
}

async function fetchReviews(offset: number) {
  isLoading.value = true
  const data = await $fetch<LatestReviewsResponse>('/api/reviews/latest', { query: { offset } })
  reviews.value.push(...data.reviews)
  hasMore.value = data.hasMore
  isLoading.value = false
}

await fetchReviews(0)

async function loadMore() {
  await fetchReviews(reviews.value.length)
}
</script>

<template>
  <div class="flex flex-col gap-6 md:gap-10 pb-10">
    <h2 class="text-2xl md:text-4xl font-bold text-center">最新點評</h2>

    <div v-if="reviews.length > 0" class="flex flex-col items-center gap-6">
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full mx-auto">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <CommonButton v-if="hasMore" variant="pink" :disabled="isLoading" @click="loadMore">
        {{ isLoading ? '載入中...' : '載入更多' }}
      </CommonButton>
    </div>

    <div v-else class="text-center flex flex-col items-center gap-4">
      <Icon name="ph:coffee-duotone" class="text-6xl text-m-gray/20" />
      <p class="opacity-60">還沒有人發表評價喔...</p>
      <CommonButton variant="pink" @click="uiStore.openReviewModal">成為第一個！</CommonButton>
    </div>
  </div>
</template>
