<script setup lang="ts">
const icons = [
  { name: 'cloude-1.png', class: '-top-10 left-0 md:-left-12 w-20 md:w-32 xl:w-44 hover:-translate-x-12', delay: '0s', duration: '7s' },
  { name: 'cloude-2.png', class: '-top-8 right-0 md:-right-16 w-16 md:w-24 xl:w-36 hover:translate-x-12', delay: '1.5s', duration: '6s' },
  { name: 'circle-1.png', class: 'top-1/4 -left-10 md:-left-20 w-10 md:w-16 xl:w-24 hover:-translate-x-10', delay: '1s', duration: '4s' },
  { name: 'circle-2.png', class: 'top-1/3 -right-8 md:-right-32 w-12 md:w-20 xl:w-28 hover:translate-x-10', delay: '0.8s', duration: '5s' },
  { name: 'cloude-3.png', class: 'bottom-10 -left-12 md:-left-32 w-14 md:w-24 xl:w-32 hover:-translate-x-8', delay: '1.2s', duration: '9s' },
  { name: 'circle-4.png', class: 'bottom-4 -right-12 md:-right-20 w-16 md:w-28 xl:w-36 hover:translate-x-8', delay: '0.5s', duration: '7.5s' },
  { name: 'circle-3.png', class: 'bottom-0 left-1/4 w-10 md:w-14 xl:w-20 hover:-translate-y-10', delay: '2s', duration: '6.5s' },
]
</script>

<template>
  <div class="w-full pt-32 pb-20 space-y-8 bg-m-purple relative overflow-visible">
    <div class="w-[280px] md:w-[400px] xl:w-[600px] mx-auto relative px-4">
      <!-- Floating Icons 🎉 -->
      <FloatingIcons :icons="icons" />

      <!-- Main Image -->
      <img 
        src="~/assets/images/udrink-main.png" 
        alt="udrink-main" 
        class="relative w-full drop-shadow-soft"
      />
    </div>

    <div class="space-y-2 text-2xl md:text-4xl font-bold text-center relative z-20">
      <p class="text-m-purple-dark">飲料總是喝過就忘？</p>
      <div class="flex items-center justify-center gap-2">
        <span class="text-m-purple-dark">讓</span>
        <img src="~/assets/images/icons/text-1.png" alt="" class="h-10" />
        <img src="~/assets/images/icons/text-4.png" alt="" class="h-10" />
        <span class="text-m-purple-dark">來記得</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure icons are visible even if they overflow the Purple section slightly */
:deep(.animate-float) {
  pointer-events: auto;
}
</style>