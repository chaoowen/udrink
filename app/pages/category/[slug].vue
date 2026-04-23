<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import { DRINK_CATEGORIES } from '~/constants/drink'

const uiStore = useUIStore()
const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

// Fetching results based on category
const { data: reviews, pending, refresh } = await useAsyncData(`category-${slug.value}`, () => {
  return $fetch<any[]>('/api/reviews/by-category', {
    query: { category: slug.value },
  })
}, {
  watch: [slug],
})

watch(() => uiStore.reviewsVersion, () => refresh())

const handleCategoryClick = (category: string) => {
  router.push(`/category/${category}`)
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto py-12 space-y-10 px-4">
    <h1 class="text-2xl font-bold">探索所有關於 {{ slug }} 的點評與飲品推薦</h1>
    
    <div class="flex gap-3 flex-wrap">
      <CommonButton 
        v-for="category in DRINK_CATEGORIES" 
        :key="category"
        :variant="category === slug ? 'pink' : 'blue'"
        @click="handleCategoryClick(category)"
        class="!mx-0"
      >
        {{ category }}
      </CommonButton>
    </div>

    <div v-if="pending" class="py-32 flex justify-center">
      <Icon name="ph:spinner-gap-bold" class="text-4xl animate-spin text-m-gray/20" />
    </div>

    <div v-else>
      <div v-if="reviews && reviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
      </div>
      
      <div v-else class="py-32 flex flex-col items-center gap-8 bg-m-purple/40 rounded-bubble">
        <div class="relative">
          <Icon name="ph:sparkle-fill" class="absolute -top-2 -right-2 text-2xl text-m-pink animate-pulse" />
        </div>
        <div class="text-center space-y-2">
          <p class="text-2xl font-bold">目前還沒有 {{ slug }} 的點評喔</p>
          <p class="text-m-gray/80 font-medium">快去成為該類別的第一位評分大師吧！</p>
        </div>
        <CommonButton 
          variant="pink" 
          @click="uiStore.openReviewModal"
        >
          發布第一則評價
        </CommonButton>
      </div>
    </div>
  </div>
</template>
