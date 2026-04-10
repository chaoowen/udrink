<script setup lang="ts">
import { DRINK_CATEGORIES } from '~/constants/drink'

const uiStore = useUIStore()
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
    />

    <div class="flex gap-3 overflow-x-auto no-scrollbar">
      <CommonButton 
        v-for="category in DRINK_CATEGORIES" 
        :key="category"
        variant="blue"
      >
        {{ category }}
      </CommonButton>
    </div>


  </div>
</template>
