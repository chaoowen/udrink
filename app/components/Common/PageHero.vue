<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
  variant?: 'purple' | 'blue' | 'pink' | 'green' | 'cream'
}>()

const icons = [
  { name: 'cloude-1.png', class: '-top-6 left-10 w-16 md:w-24', delay: '0.2s', duration: '8s' },
  { name: 'circle-1.png', class: 'top-1/2 right-4 w-10 md:w-14', delay: '1s', duration: '5s' },
  { name: 'cloude-2.png', class: 'bottom-4 left-1/4 w-12 md:w-20', delay: '0.5s', duration: '7s' },
]

const bgClasses = {
  purple: 'bg-m-purple',
  blue: 'bg-m-blue',
  pink: 'bg-m-pink',
  green: 'bg-m-green',
  cream: 'bg-m-cream'
}

const titleColors = {
  purple: 'text-m-purple-dark',
  blue: 'text-m-blue-dark',
  pink: 'text-m-pink', // Fallback as pink doesn't have dark in config yet
  green: 'text-m-green',
  cream: 'text-m-cream-dark'
}
</script>

<template>
  <div class="w-full pt-16 pb-8 md:pt-24 md:pb-12 px-6 relative overflow-visible" :class="bgClasses[variant || 'purple']">
    <FloatingIcons :icons="icons" />
    
    <div class="max-w-[1200px] mx-auto relative z-20 flex flex-col gap-2">
      <button 
        @click="$router.back()" 
        class="group flex items-center gap-1 text-sm font-bold text-m-gray/60 hover:text-m-gray transition-colors mb-2 w-fit"
      >
        <Icon name="ph:arrow-left-bold" class="transition-transform group-hover:-translate-x-1" />
        返回
      </button>
      <h1 class="text-3xl md:text-5xl font-bold" :class="titleColors[variant || 'purple']">{{ title }}</h1>
      <p v-if="subtitle" class="text-m-gray font-medium opacity-80 max-w-lg">{{ subtitle }}</p>
    </div>
  </div>
</template>
