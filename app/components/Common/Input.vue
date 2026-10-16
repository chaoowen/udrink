<script setup lang="ts">
/**
 * 基礎搜尋輸入欄位元件，支援 icon 與 enter 事件
 */
withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  icon?: string
  inputClass?: string
}>(), {
  placeholder: '',
  type: 'text',
  icon: '',
  inputClass: '',
})

defineEmits<{
  'update:modelValue': [value: string]
  'enter': []
}>()
</script>

<template>
  <div class="relative w-full">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-white px-6 py-4 rounded-bubble shadow-soft border-none focus:ring-4 focus:ring-m-purple outline-none text-lg transition-all placeholder:text-m-gray/50"
      :class="inputClass"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('enter')"
    >
    <div
      v-if="icon"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-m-gray/50 flex items-center pointer-events-none"
    >
      <Icon
        :name="icon"
        class="text-2xl"
      />
    </div>
  </div>
</template>
