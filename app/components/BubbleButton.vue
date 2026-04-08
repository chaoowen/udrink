<script setup lang="ts">
defineProps<{
  variant?: 'blue' | 'pink' | 'green' | 'gray' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  isBubble?: boolean
}>()

const colors = {
  blue: 'bg-m-blue text-m-gray',
  pink: 'bg-m-pink text-m-gray',
  green: 'bg-m-green text-m-gray',
  gray: 'bg-m-gray text-white',
  cream: 'bg-m-cream text-m-gray'
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-xl'
}
</script>

<template>
  <button
    class="bubble-btn font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
    :class="[
      colors[variant || 'blue'],
      sizes[size || 'md'],
      isBubble ? 'rounded-bubble' : 'rounded-2xl'
    ]"
  >
    <slot />
  </button>
</template>
