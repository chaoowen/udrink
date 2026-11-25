<script setup lang="ts">
import { reviewService } from '~/services/reviewService'

const SEARCH_DEBOUNCE_MS = 300

const route = useRoute()
const router = useRouter()
const uiStore = useUIStore()

const getRouteKeyword = (): string => (typeof route.query.q === 'string' ? route.query.q.trim() : '')

// 網址 ?q= 為唯一查詢來源，可分享、可重新整理
const keyword = computed(getRouteKeyword)
const searchInput = ref(getRouteKeyword())
const { debounced: debouncedInput, flush: handleSearchNow } = useDebouncedValue(
  searchInput,
  SEARCH_DEBOUNCE_MS,
)

// 輸入停頓後同步到網址；用 replace 避免每次輸入都產生一筆瀏覽紀錄
watch(debouncedInput, (value) => {
  if (value === keyword.value) return
  router.replace({ query: value ? { q: value } : {} })
})

// 從首頁搜尋或上一頁返回時，讓輸入框跟著網址
watch(keyword, (value) => {
  if (value !== searchInput.value.trim()) searchInput.value = value
})

const fetchSearchPage = (offset: number) => reviewService.search({ q: keyword.value, offset })

const { data: searchResult, pending } = await useAsyncData(
  'search-results',
  () => fetchSearchPage(0),
  { watch: [keyword, () => uiStore.reviewsVersion] },
)

const { isLoadingMore, loadMore: handleLoadMore } = useLoadMore(searchResult, fetchSearchPage)

useHead({
  title: () => (keyword.value ? `「${keyword.value}」的搜尋結果` : '搜尋評價'),
})
</script>

<template>
  <div class="py-10">
    <div class="max-w-[1200px] mx-auto px-4 space-y-10">
      <!-- Search Box Section -->
      <div class="max-w-xl p-2">
        <CommonInput
          v-model="searchInput"
          placeholder="搜尋飲品、店名或評論..."
          icon="ph:magnifying-glass-bold"
          is-clearable
          class="w-full md:w-[400px]"
          @enter="handleSearchNow"
          @clear="handleSearchNow"
        />
      </div>

      <!-- Results -->
      <div class="flex flex-col gap-8">
        <!-- 只有第一次載入顯示 spinner；之後重新查詢保留舊結果並淡化，避免畫面跳動 -->
        <div
          v-if="pending && !searchResult"
          class="py-32 flex justify-center"
        >
          <Icon
            name="ph:spinner-gap-bold"
            class="text-4xl animate-spin text-m-blue-dark grayscale opacity-20"
          />
        </div>

        <div
          v-else
          class="min-h-[400px] transition-opacity"
          :class="{ 'opacity-50': pending }"
          :aria-busy="pending"
        >
          <p
            v-if="searchResult"
            class="text-sm font-bold text-m-gray/40 mb-6"
          >
            共找到 {{ searchResult.total }} 則相關評價
          </p>

          <div
            v-if="searchResult && searchResult.reviews.length > 0"
            class="flex flex-col items-center gap-6"
          >
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReviewCard
                v-for="review in searchResult.reviews"
                :key="review.id"
                :review="review"
              />
            </div>
            <CommonButton
              v-if="searchResult.hasMore"
              variant="pink"
              :disabled="isLoadingMore"
              @click="handleLoadMore"
            >
              {{ isLoadingMore ? '載入中...' : '載入更多' }}
            </CommonButton>
          </div>
          <div
            v-else
            class="py-32 flex flex-col items-center gap-4 text-m-gray/40 bg-white/20 rounded-bubble border-2 border-dashed border-m-gray/5"
          >
            <Icon
              name="ph:magnifying-glass-slash-duotone"
              class="text-6xl opacity-20"
            />
            <div class="text-center">
              <p class="font-bold text-xl">
                找不到相符的評價
              </p>
              <p class="text-sm">
                換個關鍵字試試看，或是成為第一個分享的人！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
