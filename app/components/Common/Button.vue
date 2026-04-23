<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{
  variant?: 'blue' | 'pink' | 'green' | 'gray' | 'cream' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  isBubble?: boolean
  manual?: boolean
  asyncHandler?: () => Promise<boolean | void>
}>()

const emit = defineEmits(['click'])

const buttonRef = ref<HTMLButtonElement | null>(null)
const overlayRef = ref<HTMLDivElement | null>(null)
const isExpanding = ref(false)

const colors = {
  blue: 'bg-m-blue text-m-gray',
  pink: 'bg-m-pink text-m-gray',
  green: 'bg-m-green text-m-gray',
  gray: 'bg-m-gray text-white',
  cream: 'bg-m-cream text-m-gray',
  purple: 'bg-m-purple text-m-gray'
}

const hexColors = {
  blue: '#D6E4F0',
  pink: '#F9E1E0',
  green: '#D4E2D4',
  gray: '#9A9483',
  cream: '#FDF5E6',
  purple: '#E6E6FA'
}

const sizes = {
  sm: 'px-3 md:px-4 py-1 md:py-2 text-sm',
  md: 'px-4 md:px-6 py-2 md:py-3',
  lg: 'px-8 py-4 text-xl'
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
      }
    })

    // 1. Tactile shrink
    tl.to(buttonRef.value, { scale: 0.85, duration: 0.06, ease: "power2.out" })
    tl.to(buttonRef.value, { scale: 1, duration: 0.06, ease: "power2.in" })

    // 2. Prep and play expansion from current button location
    tl.set(overlayRef.value, {
      display: 'block',
      x: x - 50,
      y: y - 50,
      scale: 0,
      opacity: 1,
      backgroundColor: hexColors[props.variant || 'blue']
    })

    tl.to(overlayRef.value, {
      scale: 60,
      duration: 0.7,
      ease: "power3.inOut"
    })
  })
}

// Expose to parents
defineExpose({ playTransition })

const handleClick = async (e: MouseEvent) => {
  if (isExpanding.value) return

  if (props.manual) {
    emit('click', e)
    return
  }

  if (props.asyncHandler) {
    const result = await props.asyncHandler()
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
      class="bubble-btn font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-90 active:scale-90"
      :class="[
        colors[variant || 'blue'],
        sizes[size || 'md'],
        isBubble ? 'rounded-bubble' : 'rounded-2xl',
        isExpanding ? 'pointer-events-none' : ''
      ]"
      @click="handleClick"
    >
      <slot />
    </button>

    <Teleport to="body">
      <div 
        ref="overlayRef"
        class="fixed top-0 left-0 w-[100px] h-[100px] rounded-full hidden pointer-events-none z-[9999]"
      ></div>
    </Teleport>
  </div>
</template>

<style scoped>
.bubble-btn {
  /* Ensure the hover scale doesn't conflict with parent layout */
  transform-origin: center;
}
</style>
