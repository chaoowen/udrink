<script setup lang="ts">
interface IconConfig {
  name: string      // 檔案名稱，如 'cloude-1.png'
  class: string     // 定點位置與大小 class，如 'top-0 left-0 w-20'
  delay?: string    // 動畫延遲
  duration?: string // 動畫時長
}

defineProps<{
  icons: IconConfig[]
}>()

// 使用 Vite 的 import.meta.glob 批量導入 assets 中的圖標
const glob = import.meta.glob('~/assets/images/icons/*.png', { eager: true, import: 'default' })

const getIconSrc = (name: string): string => {
  const path = Object.keys(glob).find(key => key.includes(name))
  return path ? (glob[path] as string) : ''
}
</script>

<template>
  <!-- 絕對定位容器，預設填滿父層且不阻擋點擊事件 -->
  <div class="absolute inset-0 pointer-events-none overflow-visible z-10">
    <img 
      v-for="(icon, index) in icons"
      :key="index"
      :src="getIconSrc(icon.name)"
      class="absolute animate-float transition-all duration-700 ease-out hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
      :class="icon.class"
      :style="{ 
        animationDelay: icon.delay || '0s', 
        animationDuration: icon.duration || '6s' 
      }"
    />
  </div>
</template>

<style scoped>
/* 確保漂浮動畫中的元件依然維持 pointer-events-auto */
:deep(.animate-float) {
  pointer-events: auto;
}
</style>
