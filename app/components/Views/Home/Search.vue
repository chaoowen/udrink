<script setup lang="ts">
const uiStore = useUIStore()
</script>

<template>
  <div class="relative">
    <div class="absolute -top-40 left-0">
      <img src="~/assets/images/background/bg-top-cream.png" alt="" class="w-full">
    </div>

    <div class="flex flex-col gap-4">
      <div class="relative">
        <input 
          v-model="uiStore.searchQuery"
          type="text"
          placeholder="搜尋飲品或店名..."
          class="w-full bg-white p-6 rounded-bubble shadow-lg border-none focus:ring-4 focus:ring-m-blue/30 outline-none text-lg transition-all"
        />
        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
      </div>
    </div>
  </div>
</template>
