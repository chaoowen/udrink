<script setup lang="ts">
import starIcon from '~/assets/images/icons/star.png'
import gsap from 'gsap'
import { DRINK_CATEGORIES } from '#shared/constants/drink'
import { reviewService } from '~/services/reviewService'
import type { EditingReview } from '~/types/review'

const uiStore = useUIStore()

const modalContent = ref<HTMLDivElement | null>(null)
const overlay = ref(null)

const createEmptyForm = (): Omit<EditingReview, 'id'> => ({
  shop_name: '',
  drink_name: '',
  category: '',
  rating: 0,
  sugar_ice: '',
  comment: '',
})

const createEmptyErrors = () => ({ shop_name: '', drink_name: '', category: '', rating: '' })

const form = ref(createEmptyForm())
const errors = ref(createEmptyErrors())
const submitError = ref('')

const isSubmitting = ref(false)
const isClosing = ref(false)
const isEditMode = computed(() => !!uiStore.editingReview)

// 新增模式關閉時保留草稿（誤點遮罩不會遺失輸入）；編輯過的資料則不能殘留到下一次新增
const isFormFromEdit = ref(false)

const resetForm = () => {
  form.value = createEmptyForm()
  errors.value = createEmptyErrors()
  submitError.value = ''
  isFormFromEdit.value = false
}

// 每次開啟都清掉上一次的錯誤提示；草稿內容保留，但不該一打開就看到舊的錯誤
const prepareForm = () => {
  errors.value = createEmptyErrors()
  submitError.value = ''

  const review = uiStore.editingReview
  if (review) {
    const { id: _id, ...fields } = review
    form.value = { ...fields }
    isFormFromEdit.value = true
    return
  }
  if (isFormFromEdit.value) resetForm()
}

const handleClose = () => {
  if (isClosing.value) return
  isClosing.value = true
  gsap.to(modalContent.value, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: 'back.in(1.7)',
    onComplete: () => {
      isClosing.value = false
      uiStore.closeReviewModal()
    },
  })
}

const validateForm = (): boolean => {
  errors.value = createEmptyErrors()
  if (!form.value.shop_name.trim()) errors.value.shop_name = '請填寫店家名稱'
  if (!form.value.drink_name.trim()) errors.value.drink_name = '請填寫飲品名稱'
  if (!form.value.category) errors.value.category = '請選擇飲品分類'
  if (!form.value.rating) errors.value.rating = '請選擇評分'
  return Object.values(errors.value).every(e => !e)
}

const handleSelectCategory = (category: string) => {
  form.value.category = form.value.category === category ? '' : category
  errors.value.category = ''
}

const handleSelectRating = (rating: number) => {
  form.value.rating = rating
  errors.value.rating = ''
}

const handleSubmit = async (): Promise<boolean> => {
  if (isSubmitting.value || !validateForm()) return false

  isSubmitting.value = true
  submitError.value = ''
  try {
    const body = {
      shop_name: form.value.shop_name.trim(),
      drink_name: form.value.drink_name.trim(),
      category: form.value.category || null,
      rating: form.value.rating,
      sugar_ice: form.value.sugar_ice.trim(),
      comment: form.value.comment.trim(),
    }

    if (isEditMode.value) {
      await reviewService.update(uiStore.editingReview!.id, body)
    }
    else {
      await reviewService.create(body)
    }

    uiStore.bumpReviewsVersion()
    resetForm()
    handleClose()
    return true
  }
  catch (err) {
    console.error(err)
    submitError.value = '提交失敗，請稍後再試'
    return false
  }
  finally {
    isSubmitting.value = false
  }
}

// 桌機開啟時自動聚焦第一個欄位；觸控裝置不聚焦，避免鍵盤直接彈出遮住表單
const focusFirstField = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  modalContent.value?.querySelector<HTMLInputElement>('input')?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && uiStore.isReviewModalOpen) handleClose()
}

watch(() => uiStore.isReviewModalOpen, (isOpen) => {
  // Modal 開啟時鎖住背景捲動
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (!isOpen) return

  prepareForm()
  nextTick(() => {
    gsap.fromTo(modalContent.value,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
    )
    focusFirstField()
  })
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="uiStore.isReviewModalOpen"
      ref="overlay"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-m-gray/20 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div
        ref="modalContent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        class="bg-white w-full max-w-2xl rounded-bubble shadow-xl flex flex-col max-h-[calc(100dvh-6rem)]"
      >
        <div class="flex justify-between items-center px-8 pt-8 pb-4 shrink-0">
          <h2
            id="review-modal-title"
            class="text-lg md:text-2xl font-medium"
          >
            {{ isEditMode ? '編輯點評' : '新增喝貨點評' }}
          </h2>
          <button
            type="button"
            aria-label="關閉"
            class="opacity-80 hover:opacity-100"
            @click="handleClose"
          >
            ✕
          </button>
        </div>

        <div class="flex flex-col gap-4 overflow-y-auto px-8 py-2">
          <!-- TODO: Add Drink Search Suggestion here -->
          <CommonInputField
            v-model="form.shop_name"
            label="店家名稱"
            placeholder="例如：青山"
            required
            :error="errors.shop_name"
            @update:model-value="errors.shop_name = ''"
          />

          <CommonInputField
            v-model="form.drink_name"
            label="飲品名稱"
            placeholder="例如：波霸奶茶"
            required
            :error="errors.drink_name"
            @update:model-value="errors.drink_name = ''"
          />

          <CommonInputField
            label="飲品分類"
            required
            :error="errors.category"
          >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in DRINK_CATEGORIES"
                :key="cat"
                type="button"
                class="px-3 py-1 rounded-full text-sm border border-m-blue transition-all"
                :class="{ 'bg-m-blue': form.category === cat }"
                :aria-pressed="form.category === cat"
                @click="handleSelectCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>
          </CommonInputField>

          <CommonInputField
            label="評分"
            required
            :error="errors.rating"
          >
            <div class="flex gap-1">
              <button
                v-for="i in 5"
                :key="i"
                type="button"
                :aria-label="`${i} 顆星`"
                :aria-pressed="i === form.rating"
                class="w-10 h-10 transition-all active:scale-90"
                :class="i <= form.rating ? 'opacity-100' : 'opacity-20 grayscale'"
                @click="handleSelectRating(i)"
              >
                <img
                  :src="starIcon"
                  alt=""
                  class="w-full h-full object-contain"
                >
              </button>
            </div>
          </CommonInputField>

          <CommonInputField
            v-model="form.sugar_ice"
            label="推薦組合 (糖冰)"
            placeholder="例如：微糖微冰"
          />

          <CommonInputField
            v-model="form.comment"
            label="短評"
            placeholder="喝起來如何？"
            is-textarea
          />
        </div>

        <div class="px-8 pt-4 pb-8 shrink-0 flex flex-col items-center gap-2">
          <p
            v-if="submitError"
            role="alert"
            class="text-red-300 text-sm"
          >
            {{ submitError }}
          </p>
          <CommonButton
            variant="pink"
            :async-handler="handleSubmit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '提交中...' : isEditMode ? '儲存變更' : '發佈評價' }}
          </CommonButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
