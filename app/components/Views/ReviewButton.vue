<script setup lang="ts">
const uiStore = useUIStore()
</script>

<template>
  <button
    type="button"
    aria-label="新增飲品評價"
    class="fixed bottom-6 md:bottom-10 right-6 xl:right-20 z-40 cursor-pointer"
    @click="uiStore.openReviewModal"
  >
    <div class="flex items-center justify-center hover:scale-105 transition-all duration-300">
      <img
        src="~/assets/images/icons/text-add-drink.png"
        alt=""
        class="w-24 md:w-32"
      >
    </div>
  </button>
</template>
