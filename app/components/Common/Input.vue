<script setup lang="ts">
/**
 * 基礎搜尋輸入欄位元件，支援 icon、清除按鈕與 enter 事件
 */
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  icon?: string
  inputClass?: string
  isClearable?: boolean
}>(), {
  placeholder: '',
  type: 'text',
  icon: '',
  inputClass: '',
  isClearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'enter': []
  'clear': []
}>()

const inputRef = useTemplateRef('inputRef')

const isClearVisible = computed(() => props.isClearable && !!props.modelValue)

// 注音／倉頡等輸入法按 Enter 是在選字，不應觸發送出
// （Safari 在選字結束的 keydown 不會帶 isComposing，需搭配 keyCode 229 判斷）
const handleKeydownEnter = (event: KeyboardEvent) => {
  if (event.isComposing || event.keyCode === 229) return
  emit('enter')
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="relative w-full">
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-white px-6 py-4 rounded-bubble shadow-soft border-none focus:ring-4 focus:ring-m-purple outline-none text-lg transition-all placeholder:text-m-gray/50"
      :class="[inputClass, { 'pr-14': icon || isClearable }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.enter="handleKeydownEnter"
    >
    <button
      v-if="isClearVisible"
      type="button"
      aria-label="清除搜尋"
      class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center text-m-gray/50 hover:text-m-gray transition-colors"
      @click="handleClear"
    >
      <Icon
        name="ph:x-circle-bold"
        class="text-2xl"
      />
    </button>
    <div
      v-else-if="icon"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-m-gray/50 flex items-center pointer-events-none"
    >
      <Icon
        :name="icon"
        class="text-2xl"
      />
    </div>
  </div>
</template>
