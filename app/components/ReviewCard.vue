<script setup lang="ts">
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

const ratingColors = ['#F9E1E0', '#D6E4F0', '#D4E2D4', '#F7F2E0', '#9A9483']
</script>

<template>
  <div class="review-card bg-white p-5 rounded-bubble shadow-sm border border-[#eee] flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold px-3 py-1 bg-m-blue rounded-full text-m-gray">
        @{{ review.username }}
      </span>
      <span class="text-[10px] text-m-gray opacity-60">
        {{ new Date(review.created_at).toLocaleDateString() }}
      </span>
    </div>

    <div>
      <h3 class="font-bold text-lg text-m-gray">{{ review.drink_name }}</h3>
      <p class="text-sm text-m-gray opacity-80">{{ review.shop_name }}</p>
    </div>

    <div class="flex gap-1">
      <div 
        v-for="i in 5" 
        :key="i"
        class="w-4 h-4 rounded-full"
        :class="i <= review.rating ? 'bg-m-pink shadow-[0_0_8px_rgba(249,225,224,0.5)]' : 'bg-gray-100'"
      ></div>
    </div>

    <div v-if="review.sugar_ice" class="text-xs py-1 px-3 bg-m-cream rounded-full w-fit text-m-gray">
      ✨ {{ review.sugar_ice }}
    </div>

    <p v-if="review.comment" class="text-sm text-m-gray italic">
      "{{ review.comment }}"
    </p>
  </div>
</template>
