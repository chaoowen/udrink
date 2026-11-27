<script setup lang="ts">
/**
 * 多變體按鈕元件，支援莫蘭迪色系樣式與 GSAP 擴展過渡動畫
 */
import gsap from 'gsap'

defineSlots<{
  default(): unknown
}>()

const props = defineProps<{
  variant?: 'blue' | 'pink' | 'green' | 'gray' | 'cream' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  isBubble?: boolean
  manual?: boolean
  disabled?: boolean
  /** 回傳 false 代表中止轉場動畫 */
  asyncHandler?: () => Promise<boolean>
}>()

const emit = defineEmits(['click'])

const buttonRef = ref<HTMLButtonElement | null>(null)
const overlayRef = ref<HTMLDivElement | null>(null)
const isExpanding = ref(false)
const isBusy = ref(false)

// 等待 asyncHandler 或轉場期間鎖住按鈕，避免連點造成重複送出
const isLocked = computed(() => props.disabled || isBusy.value || isExpanding.value)

const colors = {
  blue: 'bg-m-blue text-m-gray',
  pink: 'bg-m-pink text-m-gray',
  green: 'bg-m-green text-m-gray',
  gray: 'bg-m-gray text-white',
  cream: 'bg-m-cream text-m-gray',
  purple: 'bg-m-purple text-m-gray',
}

/**
 * 從按鈕元素的 computed style 取得實際背景色
 * 避免重複寫死 HEX 值，顏色統一由 Tailwind config 管理
 */
const getButtonBgColor = (): string => {
  if (!buttonRef.value) return ''
  return getComputedStyle(buttonRef.value).backgroundColor
}

const sizes = {
  sm: 'px-3 md:px-4 py-1 md:py-2 text-sm',
  md: 'px-4 md:px-6 py-2 md:py-3',
  lg: 'px-8 py-4 text-xl',
}

/**
 * Programmatically play the cinematic expansion transition.
 * Returns a promise that resolves when the transition is "active" (screen filled).
 */
const playTransition = () => {
  return new Promise<void>((resolve) => {
    const rect = buttonRef.value?.getBoundingClientRect()
    if (!rect) {
      resolve()
      return
    }

    isExpanding.value = true

    // Calculate center of button
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const tl = gsap.timeline({
      onComplete: () => {
        resolve()
        isExpanding.value = false
        gsap.set(overlayRef.value, { display: 'none' })
      },
    })

    // 1. Tactile shrink
    tl.to(buttonRef.value, { scale: 0.85, duration: 0.06, ease: 'power2.out' })
    tl.to(buttonRef.value, { scale: 1, duration: 0.06, ease: 'power2.in' })

    // 2. Prep and play expansion from current button location
    tl.set(overlayRef.value, {
      display: 'block',
      x: x - 50,
      y: y - 50,
      scale: 0,
      opacity: 1,
      backgroundColor: getButtonBgColor(),
    })

    tl.to(overlayRef.value, {
      scale: 60,
      duration: 0.7,
      ease: 'power3.inOut',
    })
  })
}

// Expose to parents
defineExpose({ playTransition })

const runAsyncHandler = async (handler: () => Promise<boolean>) => {
  isBusy.value = true
  try {
    return await handler()
  }
  finally {
    isBusy.value = false
  }
}

const handleClick = async (e: MouseEvent) => {
  if (isLocked.value) return

  if (props.manual) {
    emit('click', e)
    return
  }

  if (props.asyncHandler) {
    const result = await runAsyncHandler(props.asyncHandler)
    if (result === false) return
    await playTransition()
    return
  }

  // Default: animate then emit
  await playTransition()
  emit('click', e)
}
</script>

<template>
  <div class="inline-block mx-auto">
    <button
      ref="buttonRef"
      :disabled="disabled || isBusy"
      class="disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-90 active:scale-90 origin-center"
      :class="[
        colors[variant || 'blue'],
        sizes[size || 'md'],
        isBubble ? 'rounded-2xl' : 'rounded-bubble',
        isExpanding ? 'pointer-events-none' : '',
      ]"
      @click="handleClick"
    >
      <slot />
    </button>

    <Teleport to="body">
      <div
        ref="overlayRef"
        class="fixed top-0 left-0 w-[100px] h-[100px] rounded-full hidden pointer-events-none z-[9999]"
      />
    </Teleport>
  </div>
</template>
