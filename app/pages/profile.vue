<script setup lang="ts">
import Icon1 from '~/assets/images/icons/cloude-5.png'
import Icon2 from '~/assets/images/icons/cloude-2.png'
import Icon3 from '~/assets/images/icons/cloude-3.png'
import IconFace from '~/assets/images/icons/face.png'
import { reviewService } from '~/services/reviewService'
import { favoriteService } from '~/services/favoriteService'

definePageMeta({
  middleware: 'auth',
})

useHead({ title: '個人紀錄' })

type ProfileTab = 'reviews' | 'favorites'

const userStore = useUserStore()
const uiStore = useUIStore()
const favoriteStore = useFavoriteStore()
const route = useRoute()
const router = useRouter()

// 分頁記在網址 ?tab=，重新整理或從評價返回時仍停留在同一個分頁
const activeTab = computed<ProfileTab>({
  get: () => (route.query.tab === 'favorites' ? 'favorites' : 'reviews'),
  set: (tab) => {
    router.replace({ query: { ...route.query, tab: tab === 'favorites' ? tab : undefined } })
  },
})
const icons = [Icon1, Icon2, Icon3]
// 基於 username 長度選擇圖標，SSR 和 Client 結果一致
const userIcon = computed(() => {
  const index = (userStore.username?.length ?? 0) % icons.length
  return icons[index]
})

const SEARCH_DEBOUNCE_MS = 300

const searchInput = ref('')
const { debounced: keyword, flush: handleSearchNow } = useDebouncedValue(
  searchInput,
  SEARCH_DEBOUNCE_MS,
)

const fetchMyReviewsPage = (offset: number) =>
  reviewService.fetchMine({ q: keyword.value, offset })

const { data: myReviews, pending: isSearching } = await useAsyncData(
  'my-reviews',
  () => fetchMyReviewsPage(0),
  // 新增／編輯評價後 reviewsVersion 會遞增，一併重新載入
  { watch: [keyword, () => uiStore.reviewsVersion] },
)

const { isLoadingMore, loadMore: handleLoadMore } = useLoadMore(myReviews, fetchMyReviewsPage)

// 收藏清單：直接進入收藏分頁時由 SSR 載入，否則第一次切換過去才載入
const {
  data: myFavorites,
  status: favoritesStatus,
  execute: loadFavorites,
  refresh: refreshFavorites,
} = await useAsyncData('my-favorites', () => favoriteService.fetchList(), {
  immediate: activeTab.value === 'favorites',
})

const {
  isLoadingMore: isLoadingMoreFavorites,
  loadMore: handleLoadMoreFavorites,
} = useLoadMore(myFavorites, favoriteService.fetchList)

watch(activeTab, (tab) => {
  if (tab === 'favorites' && favoritesStatus.value === 'idle') loadFavorites()
})

// 收藏／取消收藏後同步清單（尚未載入過則略過）
watch(() => favoriteStore.favoritesVersion, () => {
  if (favoritesStatus.value !== 'idle') refreshFavorites()
})
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
      <div
        role="tablist"
        class="w-full flex bg-white p-1.5 rounded-full border-4 border-m-purple/60"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'reviews'"
          class="flex-1 py-3 rounded-full transition-all"
          :class="activeTab === 'reviews' ? 'bg-m-blue' : 'text-m-gray opacity-40'"
          @click="activeTab = 'reviews'"
        >
          我的評分
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'favorites'"
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
          <CommonInput
            v-model="searchInput"
            placeholder="搜尋我的紀錄（店名、飲品、評論）..."
            icon="ph:magnifying-glass-bold"
            is-clearable
            @enter="handleSearchNow"
            @clear="handleSearchNow"
          />

          <!-- 只有第一次載入顯示 spinner；之後重新查詢保留舊結果並淡化，避免畫面跳動 -->
          <div
            v-if="isSearching && !myReviews"
            class="py-12 flex justify-center"
          >
            <Icon
              name="ph:spinner-gap-bold"
              class="text-4xl animate-spin text-m-gray opacity-20"
            />
          </div>
          <div
            v-else-if="myReviews && myReviews.reviews.length > 0"
            class="flex flex-col gap-6 transition-opacity"
            :class="{ 'opacity-50': isSearching }"
            :aria-busy="isSearching"
          >
            <p
              v-if="keyword"
              class="text-sm font-bold text-m-gray/40"
            >
              共找到 {{ myReviews.total }} 筆符合「{{ keyword }}」的紀錄
            </p>
            <ReviewCard
              v-for="review in myReviews.reviews"
              :key="review.id"
              :review="review"
              :editable="true"
            />
            <CommonButton
              v-if="myReviews.hasMore"
              variant="blue"
              class="self-center"
              :disabled="isLoadingMore"
              @click="handleLoadMore"
            >
              {{ isLoadingMore ? '載入中...' : '載入更多' }}
            </CommonButton>
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
          <div
            v-if="favoritesStatus === 'idle' || (favoritesStatus === 'pending' && !myFavorites)"
            class="py-12 flex justify-center"
          >
            <Icon
              name="ph:spinner-gap-bold"
              class="text-4xl animate-spin text-m-gray opacity-20"
            />
          </div>
          <div
            v-else-if="favoritesStatus === 'error'"
            class="py-12 text-center opacity-40 text-sm italic font-medium"
          >
            收藏清單載入失敗，請稍後再試
          </div>
          <div
            v-else-if="myFavorites && myFavorites.reviews.length > 0"
            class="flex flex-col gap-6"
          >
            <ReviewCard
              v-for="review in myFavorites.reviews"
              :key="review.id"
              :review="review"
            />
            <CommonButton
              v-if="myFavorites.hasMore"
              variant="pink"
              class="self-center"
              :disabled="isLoadingMoreFavorites"
              @click="handleLoadMoreFavorites"
            >
              {{ isLoadingMoreFavorites ? '載入中...' : '載入更多' }}
            </CommonButton>
          </div>
          <div
            v-else
            class="py-12 text-center flex flex-col items-center gap-2 opacity-40 text-sm font-medium"
          >
            <Icon
              name="ph:heart-bold"
              class="text-4xl"
            />
            <p>還沒有收藏任何評價，看到喜歡的點評就按下愛心吧！</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
