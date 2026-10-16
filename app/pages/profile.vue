<script setup lang="ts">
import Icon1 from '~/assets/images/icons/cloude-5.png'
import Icon2 from '~/assets/images/icons/cloude-2.png'
import Icon3 from '~/assets/images/icons/cloude-3.png'
import IconFace from '~/assets/images/icons/face.png'
import { reviewService } from '~/services/reviewService'

definePageMeta({
  middleware: 'auth',
})

const userStore = useUserStore()

const activeTab = ref('reviews')
const icons = [Icon1, Icon2, Icon3]
// 基於 username 長度選擇圖標，SSR 和 Client 結果一致
const userIcon = computed(() => {
  const index = (userStore.username?.length ?? 0) % icons.length
  return icons[index]
})

const SEARCH_DEBOUNCE_MS = 300

const searchInput = ref('')
const keyword = ref('')
let searchTimer: ReturnType<typeof setTimeout> | undefined

// 輸入停頓後才查詢，避免每個字元都打一次 API
watch(searchInput, (value) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    keyword.value = value.trim()
  }, SEARCH_DEBOUNCE_MS)
})

onBeforeUnmount(() => clearTimeout(searchTimer))

const handleSearchNow = () => {
  clearTimeout(searchTimer)
  keyword.value = searchInput.value.trim()
}

const handleClearSearch = () => {
  searchInput.value = ''
  handleSearchNow()
}

const { data: myReviews, pending: isSearching } = await useAsyncData(
  'my-reviews',
  () => reviewService.fetchMine(keyword.value),
  { watch: [keyword] },
)
</script>

<template>
  <div class="py-12 flex flex-col items-center gap-10 px-4">
    <!-- Profile Header -->
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="relative w-24">
        <img
          :src="userIcon"
          alt=""
          class="w-24"
        >
        <img
          :src="IconFace"
          alt=""
          class="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
      </div>
      <div class="space-y-4">
        <p class="text-3xl font-black text-m-gray tracking-tight">
          {{ userStore.username }}
        </p>
        <p class="text-xs text-m-gray opacity-40 font-mono">
          ID: {{ userStore.userId }}
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="w-full flex flex-col gap-6 max-w-[1200px]">
      <div class="w-full flex bg-white p-1.5 rounded-full border-4 border-m-purple/60">
        <button
          class="flex-1 py-3 rounded-full transition-all"
          :class="activeTab === 'reviews' ? 'bg-m-blue' : 'text-m-gray opacity-40'"
          @click="activeTab = 'reviews'"
        >
          我的評分
        </button>
        <button
          class="flex-1 py-3 rounded-full transition-all"
          :class="activeTab === 'favorites' ? 'bg-m-pink' : 'text-m-gray opacity-40'"
          @click="activeTab = 'favorites'"
        >
          收藏清單
        </button>
      </div>

      <!-- Content -->
      <div class="w-full flex flex-col gap-6">
        <template v-if="activeTab === 'reviews'">
          <div class="relative">
            <CommonInput
              v-model="searchInput"
              placeholder="搜尋我的紀錄（店名、飲品、評論）..."
              :icon="searchInput ? '' : 'ph:magnifying-glass-bold'"
              @enter="handleSearchNow"
            />
            <button
              v-if="searchInput"
              type="button"
              aria-label="清除搜尋"
              class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center text-m-gray/50 hover:text-m-gray transition-colors"
              @click="handleClearSearch"
            >
              <Icon
                name="ph:x-circle-bold"
                class="text-2xl"
              />
            </button>
          </div>

          <div
            v-if="isSearching"
            class="py-12 flex justify-center"
          >
            <Icon
              name="ph:spinner-gap-bold"
              class="text-4xl animate-spin text-m-gray opacity-20"
            />
          </div>
          <div
            v-else-if="myReviews && myReviews.length > 0"
            class="flex flex-col gap-6"
          >
            <p
              v-if="keyword"
              class="text-sm font-bold text-m-gray/40"
            >
              共找到 {{ myReviews.length }} 筆符合「{{ keyword }}」的紀錄
            </p>
            <ReviewCard
              v-for="review in myReviews"
              :key="review.id"
              :review="review"
              :editable="true"
            />
          </div>
          <div
            v-else-if="keyword"
            class="py-12 text-center opacity-40 text-sm italic font-medium"
          >
            找不到符合「{{ keyword }}」的紀錄，換個關鍵字試試看
          </div>
          <div
            v-else
            class="py-12 text-center opacity-40 text-sm italic font-medium"
          >
            目前還沒有任何評分喔...
          </div>
        </template>

        <template v-else>
          <div class="py-12 text-center flex flex-col items-center gap-4">
            <p class="opacity-40">
              收藏功能即將上線！
            </p>
            <p class="opacity-40">
              敬請期待！
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
