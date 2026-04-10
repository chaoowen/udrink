<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string | number
  placeholder?: string
  type?: string
  isTextarea?: boolean
  rows?: number
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col">
    <label class="text-xs font-bold text-m-gray mb-1 ml-1 block">{{ label }}</label>
    
    <textarea
      v-if="isTextarea"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows || 3"
      class="w-full bg-m-cream/50 p-3 rounded-2xl border-none focus:ring-2 focus:ring-m-blue outline-none resize-none transition-all placeholder:text-m-gray/40"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    
    <input 
      v-else
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full bg-m-cream/50 p-3 rounded-2xl border-none focus:ring-2 focus:ring-m-blue outline-none transition-all placeholder:text-m-gray/40"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
