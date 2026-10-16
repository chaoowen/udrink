<script setup lang="ts">
import starIcon from '~/assets/images/icons/star.png'
import type { Review } from '~/types/review'

const uiStore = useUIStore()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const props = defineProps<{
  review: Review
  editable?: boolean
}>()

const handleEdit = () => {
  uiStore.openEditModal({
    id: props.review.id!,
    shop_name: props.review.shop_name,
    drink_name: props.review.drink_name,
    category: props.review.category ?? '',
    rating: props.review.rating,
    sugar_ice: props.review.sugar_ice ?? '',
    comment: props.review.comment ?? '',
  })
}

const isFavorited = computed(() => favoriteStore.isFavorited(props.review.id))

const handleToggleFavorite = () => favoriteStore.toggleFavorite(props.review.id)
</script>

<template>
  <div class="review-card bg-white/60 p-5 rounded-bubble shadow-sm border-4 border-m-green/60 flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        <img
          v-for="i in 5"
          :key="i"
          :src="starIcon"
          alt=""
          class="w-5 h-5 object-contain transition-all"
          :class="i <= review.rating ? 'opacity-100' : 'opacity-20 grayscale'"
        >
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="userStore.isAuthenticated"
          type="button"
          class="flex items-center transition-transform hover:scale-110"
          :class="isFavorited ? 'text-red-300' : 'text-m-gray/40 hover:text-red-300'"
          :aria-label="isFavorited ? '取消收藏' : '收藏'"
          :aria-pressed="isFavorited"
          @click="handleToggleFavorite"
        >
          <Icon
            :name="isFavorited ? 'ph:heart-fill' : 'ph:heart-bold'"
            class="text-xl"
          />
        </button>
        <button
          v-if="editable"
          class="text-sm text-m-cream-dark hover:text-m-purple-dark transition-colors"
          @click="handleEdit"
        >
          編輯
        </button>
        <span
          v-if="editable"
          class="opacity-60"
        > | </span>
        <span class="text-sm text-m-gray opacity-60">
          {{ review.created_at.slice(0, 10) }}
        </span>
      </div>
    </div>

    <div class="flex gap-2 items-center">
      <span class="font-bold">{{ review.drink_name }}</span>
      <span class="py-0.5 px-1 bg-m-pink/60 rounded text-sm">{{ review.shop_name }}</span>
    </div>

    <div
      v-if="review.sugar_ice"
      class="text-xs py-1 px-3 bg-m-blue/60 rounded-full w-fit"
    >
      ✨ {{ review.sugar_ice }}
    </div>

    <p
      v-if="review.comment"
      class="text-sm italic"
    >
      "{{ review.comment }}" — {{ review.username ?? '匿名使用者' }}
    </p>
  </div>
</template>
