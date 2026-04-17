<script setup lang="ts">
import { DRINK_CATEGORIES } from '~/constants/drink'

const uiStore = useUIStore()
const router = useRouter()

const handleSearch = () => {
  if (uiStore.searchQuery.trim()) {
    router.push({ path: '/search', query: { q: uiStore.searchQuery } })
  }
}

const handleCategoryClick = (category: string) => {
  router.push(`/category/${category}`)
}
</script>

<template>
  <div class="relative flex flex-col items-center gap-10">
    <div class="space-y-2 text-2xl md:text-4xl font-bold text-center relative z-20">
      <p>不知道今天要喝什麼？</p>
      <p>搜搜看就知道！</p>
    </div>

    <CommonInput 
      v-model="uiStore.searchQuery"
      placeholder="搜尋飲品或店名..."
      icon="ph:magnifying-glass-bold"
      class="w-full md:w-[400px]"
      @enter="handleSearch"
    />

    <div class="flex gap-3 overflow-x-auto no-scrollbar max-w-full px-4">
      <CommonButton 
        v-for="category in DRINK_CATEGORIES" 
        :key="category"
        variant="blue"
        @click="handleCategoryClick(category)"
      >
        {{ category }}
      </CommonButton>
    </div>
  </div>
</template>
