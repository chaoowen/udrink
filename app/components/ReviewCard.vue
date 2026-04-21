<script setup lang="ts">
import starIcon from '~/assets/images/icons/star.png'

const props = defineProps<{
  review: {
    username: string
    drink_name: string
    shop_name: string
    rating: number
    sugar_ice?: string
    comment?: string
    created_at: string
  }
}>()

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
        />
      </div>

      <span class="text-sm text-m-gray opacity-60">
        {{ new Date(review.created_at).toLocaleDateString() }}
      </span>
    </div>

    <div class="flex gap-2 items-center">
      <span class="font-bold">{{ review.drink_name }}</span>
      <span class="py-0.5 px-1 bg-m-pink/60 rounded text-sm">{{ review.shop_name }}</span>
    </div>

    <div v-if="review.sugar_ice" class="text-xs py-1 px-3 bg-m-blue/60 rounded-full w-fit">
      ✨ {{ review.sugar_ice }}
    </div>

    <p v-if="review.comment" class="text-sm italic">
      "{{ review.comment }}" — {{ review.username ?? '匿名使用者' }}
    </p>
  </div>
</template>
