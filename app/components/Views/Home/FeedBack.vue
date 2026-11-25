<script setup lang="ts">
import { reviewService } from '~/services/reviewService'

const uiStore = useUIStore()

// 用 useAsyncData 讓 SSR 取得的資料直接交給 client，避免 hydration 時重抓一次
const { data: latest } = await useAsyncData(
  'latest-reviews',
  () => reviewService.fetchLatest(0),
  // 新增／編輯評價後 reviewsVersion 會遞增，一併重新載入
  { watch: [() => uiStore.reviewsVersion] },
)

const { isLoadingMore, loadMore: handleLoadMore } = useLoadMore(latest, reviewService.fetchLatest)
</script>

<template>
  <div class="flex flex-col gap-6 md:gap-10 pb-10">
    <h2 class="text-2xl md:text-4xl font-bold text-center">
      最新點評
    </h2>

    <div
      v-if="latest && latest.reviews.length > 0"
      class="flex flex-col items-center gap-6"
    >
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full mx-auto">
        <ReviewCard
          v-for="review in latest.reviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <CommonButton
        v-if="latest.hasMore"
        variant="pink"
        :disabled="isLoadingMore"
        @click="handleLoadMore"
      >
        {{ isLoadingMore ? '載入中...' : '載入更多' }}
      </CommonButton>
    </div>

    <div
      v-else
      class="text-center flex flex-col items-center gap-4"
    >
      <Icon
        name="ph:coffee-duotone"
        class="text-6xl text-m-gray/20"
      />
      <p class="opacity-60">
        還沒有人發表評價喔...
      </p>
      <CommonButton
        variant="pink"
        @click="uiStore.openReviewModal"
      >
        成為第一個！
      </CommonButton>
    </div>
  </div>
</template>
