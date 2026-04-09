<script setup lang="ts">
const uiStore = useUIStore()
</script>

<template>
  <div class="fixed bottom-6 md:bottom-10 right-6 md:right-8 z-50 cursor-pointer" @click="uiStore.openReviewModal" >
    <div class="flex items-center justify-center p-2 rounded-full bg-m-cream hover:scale-105 transition-all duration-300 shadow-soft">
      <img src="~/assets/images/udrink-logo.png" alt="review-button" class="w-24 md:w-32">
    </div>
  </div>
</template>