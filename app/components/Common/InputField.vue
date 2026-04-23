<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  modelValue?: string | number
  placeholder?: string
  type?: string
  isTextarea?: boolean
  rows?: number
  bgClass?: string
  error?: string
  required?: boolean
}>(), {
  bgClass: 'bg-m-cream/80'
})

defineEmits(['update:modelValue'])

const slots = useSlots()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-2 items-center mb-1 ml-1">
      <label class="text-sm font-bold text-m-gray">{{ label }}<span v-if="required" class="text-red-300"> *</span></label>
      <span v-if="error" class="text-red-300 text-xs">{{ error }}</span>
    </div>
    
    <slot v-if="slots.default" />

    <template v-else>
      <textarea
        v-if="isTextarea"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows || 3"
        :class="[bgClass, 'w-full p-3 rounded-2xl border-none focus:ring-2 focus:ring-m-blue outline-none resize-none transition-all placeholder:text-m-gray/40']"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>

      <input
        v-else
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :class="[bgClass, 'w-full p-3 rounded-2xl border-none focus:ring-2 focus:ring-m-blue outline-none transition-all placeholder:text-m-gray/40']"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </template>
  </div>
</template>
