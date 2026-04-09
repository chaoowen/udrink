<script setup lang="ts">
// 使用 Vite 的 import.meta.glob 批量導入 assets 中的圖標
// 這能確保開發環境與生產環境都能正確解析動態路徑
const glob = import.meta.glob('~/assets/images/icons/*.png', { eager: true, import: 'default' })

// 將圖標配置與導入後的路徑進行映射
const getIconSrc = (name: string): string => {
  const path = Object.keys(glob).find(key => key.includes(name))
  return path ? (glob[path] as string) : ''
}

const icons = [
  { name: 'cloude-1.png', class: '-top-10 -left-12 w-20 md:w-32 xl:w-44 hover:-translate-x-12', delay: '0s', duration: '7s' },
  { name: 'cloude-2.png', class: '-top-8 -right-16 w-16 md:w-24 xl:w-36 hover:translate-x-12', delay: '1.5s', duration: '6s' },
  { name: 'circle-1.png', class: 'top-1/4 -left-20 w-10 md:w-16 xl:w-24 hover:-translate-x-10', delay: '1s', duration: '8s' },
  { name: 'circle-2.png', class: 'top-1/3 -right-32 w-12 md:w-20 xl:w-28 hover:translate-x-10', delay: '0.8s', duration: '5s' },
  { name: 'cloude-3.png', class: 'bottom-10 -left-32 w-14 md:w-24 xl:w-32 hover:-translate-x-8', delay: '1.2s', duration: '9s' },
  { name: 'circle-4.png', class: 'bottom-4 -right-20 w-16 md:w-28 xl:w-36 hover:translate-x-8', delay: '0.5s', duration: '7.5s' },
  { name: 'circle-3.png', class: 'bottom-0 left-1/4 w-8 md:w-14 xl:w-20 hover:-translate-y-10', delay: '2s', duration: '6.5s' },
]
</script>

<template>
  <div class="w-full pt-20 pb-10 space-y-8 bg-m-purple relative overflow-visible">
    <div class="w-[280px] md:w-[400px] xl:w-[600px] mx-auto relative">
      <!-- Floating Icons -->
      <img 
        v-for="(icon, index) in icons"
        :key="index"
        :src="getIconSrc(icon.name)"
        class="absolute z-10 animate-float transition-all duration-700 ease-out hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
        :class="icon.class"
        :style="{ animationDelay: icon.delay, animationDuration: icon.duration }"
      />

      <!-- Main Image -->
      <img 
        src="~/assets/images/udrink-main.png" 
        alt="udrink-main" 
        class="relative z-20 w-full drop-shadow-soft"
      />
    </div>

    <div class="space-y-2  text-4xl font-bold text-m-gray text-center">
      <p>不知道今天要喝什麼？</p>
      <p>搜搜看就知道！</p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure icons are visible even if they overflow the Purple section slightly */
:deep(.animate-float) {
  pointer-events: auto;
}
</style>