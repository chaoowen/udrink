<script setup lang="ts">
const uiStore = useUIStore()
</script>

<template>
  <div class="relative max-w-4xl mx-auto">
    <CommonInput 
      v-model="uiStore.searchQuery"
      placeholder="搜尋飲品或店名..."
      icon="ph:magnifying-glass-bold"
    />
  </div>
</template>
