<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q as string || '')

// Fetching results based on search query
const { data: reviews, pending, refresh } = await useAsyncData('search-results', async () => {
  const { data } = await useFetch('/api/reviews/latest')
  if (!searchQuery.value) return data.value

  const q = searchQuery.value.toLowerCase()
  return (data.value as any[] | null)?.filter((r: any) =>
    r.drink_name.toLowerCase().includes(q) ||
    r.shop_name.toLowerCase().includes(q) ||
    r.comment?.toLowerCase().includes(q)
  )
})

const handleSearch = () => {
  router.push({ query: { q: searchQuery.value } })
  refresh()
}

// Sync with URL query changes
watch(() => route.query.q, (newQ) => {
  searchQuery.value = newQ as string || ''
  refresh()
})
</script>

<template>
  <div class="py-10">
    <div class="max-w-[1200px] mx-auto px-4 space-y-10">
      <!-- Search Box Section -->
      <div class="max-w-xl p-2">
        <CommonInput
          v-model="searchQuery"
          placeholder="搜尋飲品或店名..."
          icon="ph:magnifying-glass-bold"
          class="w-full md:w-[400px]"
          @enter="handleSearch"
        />
      </div>

      <!-- Results -->
      <div class="flex flex-col gap-8">
        <div v-if="pending" class="py-32 flex justify-center">
          <Icon name="ph:spinner-gap-bold" class="text-4xl animate-spin text-m-blue-dark grayscale opacity-20" />
        </div>

        <div v-else class="min-h-[400px]">
          <p v-if="reviews" class="text-sm font-bold text-m-gray/40 mb-6">
            共找到 {{ reviews.length }} 則相關評價
          </p>

          <div v-if="reviews && reviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
          </div>
          <div v-else class="py-32 flex flex-col items-center gap-4 text-m-gray/40 bg-white/20 rounded-bubble border-2 border-dashed border-m-gray/5">
            <Icon name="ph:magnifying-glass-slash-duotone" class="text-6xl opacity-20" />
            <div class="text-center">
              <p class="font-bold text-xl">找不到相符的評價</p>
              <p class="text-sm">換個關鍵字試試看，或是成為第一個分享的人！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
