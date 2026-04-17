<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q as string || '')
const activeTab = ref('reviews')

const tabs = [
  { label: '評價', value: 'reviews' },
  { label: '飲品', value: 'drinks' },
  { label: '店家', value: 'shops' }
]

// Fetching results based on search query
// In a real app, this would hit specific search endpoints
const { data: reviews, pending, refresh } = await useAsyncData('search-results', async () => {
  const { data } = await useFetch('/api/reviews/latest')
  if (!searchQuery.value) return data.value
  
  const q = searchQuery.value.toLowerCase()
  return (data.value as any[] | null)?.filter((r: any) => 
    r.drink_name.toLowerCase().includes(q) || 
    r.shop_name.toLowerCase().includes(q) ||
    r.comment?.toLowerCase().includes(q)
  )
}, {
  watch: [activeTab] // Re-trigger if needed, though data is filtered locally for now
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
  <div class="pb-20">
    <CommonPageHero 
      title="探索發現" 
      :subtitle="searchQuery ? `正在為您尋找：${searchQuery}` : '輸入想喝的飲料或店家名稱'"
      variant="blue"
    />
    
    <div class="max-w-[1200px] mx-auto px-6 -mt-10 relative z-30 space-y-10">
      <!-- Search Box Section -->
      <div class="max-w-xl bg-white p-2 rounded-bubble shadow-xl border border-white">
        <CommonInput 
          v-model="searchQuery"
          placeholder="搜尋飲品或店名..."
          icon="ph:magnifying-glass-bold"
          input-class="!shadow-none !bg-transparent"
          @enter="handleSearch"
        />
      </div>

      <!-- Tabbed Results -->
      <div class="flex flex-col gap-8">
        <div class="flex items-center justify-between">
          <CommonTabs v-model="activeTab" :tabs="tabs" />
          <p v-if="!pending && activeTab === 'reviews' && reviews" class="text-sm font-bold text-m-gray/40">
            共找到 {{ reviews.length }} 則相關評價
          </p>
        </div>

        <div v-if="pending" class="py-32 flex justify-center">
          <Icon name="ph:spinner-gap-bold" class="text-4xl animate-spin text-m-blue-dark grayscale opacity-20" />
        </div>

        <div v-else class="min-h-[400px]">
          <!-- Reviews Content -->
          <div v-if="activeTab === 'reviews'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <template v-if="reviews && reviews.length > 0">
              <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
            </template>
            <div v-else class="col-span-full py-32 flex flex-col items-center gap-4 text-m-gray/40 bg-white/20 rounded-bubble border-2 border-dashed border-m-gray/5">
              <Icon name="ph:magnifying-glass-slash-duotone" class="text-6xl opacity-20" />
              <div class="text-center">
                <p class="font-bold text-xl">找不到相符的評價</p>
                <p class="text-sm">換個關鍵字試試看，或是成為第一個分享的人！</p>
              </div>
            </div>
          </div>

          <!-- Other Tabs (Placeholders for now) -->
          <div v-else class="flex flex-col items-center justify-center py-32 gap-6 bg-white/20 rounded-bubble border-2 border-dashed border-m-gray/5">
            <Icon name="ph:coffee-duotone" class="text-6xl text-m-gray/20" />
            <div class="text-center space-y-1">
              <p class="text-xl font-bold text-m-gray/60">此類別還在整理中</p>
              <p class="text-sm text-m-gray/40 font-medium">我們正快馬加鞭地整理飲品與店家的百科全書 🚧</p>
            </div>
            <button @click="activeTab = 'reviews'" class="text-m-blue-dark font-bold text-sm underline decoration-2 underline-offset-4">
              先看看相關評價吧！
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
