/**
 * 將輸入值延遲同步為 debounced 值，常用於搜尋框避免每個字元都觸發查詢
 * @param source - 原始輸入（通常綁定 v-model）
 * @param delay - 停止輸入多久後才同步（毫秒）
 * @returns debounced 值，以及立即同步的 flush 方法（如按 Enter）
 * @example
 * const input = ref('')
 * const { debounced: keyword, flush } = useDebouncedValue(input, 300)
 */
export function useDebouncedValue(source: Ref<string>, delay: number) {
  const debounced = ref(source.value.trim())
  let timer: ReturnType<typeof setTimeout> | undefined

  const flush = () => {
    clearTimeout(timer)
    debounced.value = source.value.trim()
  }

  watch(source, () => {
    clearTimeout(timer)
    timer = setTimeout(flush, delay)
  })

  onBeforeUnmount(() => clearTimeout(timer))

  return {
    debounced: readonly(debounced),
    flush,
  }
}
