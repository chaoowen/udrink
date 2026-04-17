<script setup lang="ts">
defineProps<{
  tabs: { label: string, value: string }[]
  modelValue: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center gap-1 p-1 bg-white/50 backdrop-blur-md rounded-full border border-white/50 w-fit shadow-soft overflow-hidden">
    <button 
      v-for="tab in tabs" 
      :key="tab.value"
      class="relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 active:scale-95"
      :class="modelValue === tab.value 
        ? 'bg-m-purple text-m-purple-dark shadow-sm' 
        : 'text-m-gray/50 hover:text-m-gray hover:bg-white/30'"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
