<script setup lang="ts">
import starIcon from '~/assets/images/icons/star.png'
import gsap from 'gsap'
import { DRINK_CATEGORIES } from '~/constants/drink'

const uiStore = useUIStore()

const modalContent = ref(null)
const overlay = ref(null)

const form = ref({
  shop_name: '',
  drink_name: '',
  category: '',
  rating: 0,
  sugar_ice: '',
  comment: ''
})

const isSubmitting = ref(false)
const isEditMode = computed(() => !!uiStore.editingReview)

watch(() => uiStore.editingReview, (review) => {
  if (review) {
    form.value = { ...review }
  }
}, { immediate: true })

const handleClose = () => {
  gsap.to(modalContent.value, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "back.in(1.7)",
    onComplete: () => {
      uiStore.closeReviewModal()
    }
  })
}

const resetForm = () => {
  form.value = {
    shop_name: '',
    drink_name: '',
    category: '',
    rating: 0,
    sugar_ice: '',
    comment: ''
  }
  errors.value = { shop_name: '', drink_name: '', category: '', rating: '' }
}

const errors = ref({ shop_name: '', drink_name: '', category: '', rating: '' })

const validateForm = (): boolean => {
  errors.value = { shop_name: '', drink_name: '', category: '', rating: '' }
  if (!form.value.shop_name.trim()) errors.value.shop_name = '請填寫店家名稱'
  if (!form.value.drink_name.trim()) errors.value.drink_name = '請填寫飲品名稱'
  if (!form.value.category) errors.value.category = '請選擇飲品分類'
  if (!form.value.rating) errors.value.rating = '請選擇評分'
  return Object.values(errors.value).every(e => !e)
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    const body = {
      shop_name: form.value.shop_name,
      drink_name: form.value.drink_name,
      category: form.value.category || null,
      rating: form.value.rating,
      sugar_ice: form.value.sugar_ice,
      comment: form.value.comment
    }

    if (isEditMode.value) {
      await $fetch(`/api/reviews/${uiStore.editingReview!.id}`, {
        method: 'PUT',
        body
      })
    } else {
      await $fetch('/api/reviews', {
        method: 'POST',
        body
      })
    }

    await refreshNuxtData()
    resetForm()
    handleClose()
  } catch (err) {
    console.error(err)
    alert('提交失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}

watch(() => uiStore.isReviewModalOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      gsap.fromTo(modalContent.value, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
    })
  }
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
        class="bg-white w-full max-w-2xl rounded-bubble shadow-xl flex flex-col max-h-[calc(100dvh-6rem)]"
      >
        <div class="flex justify-between items-center px-8 pt-8 pb-4 shrink-0">
          <h2 class="text-lg md:text-2xl font-medium">{{ isEditMode ? '編輯點評' : '新增喝貨點評' }}</h2>
          <button @click="handleClose" class="opacity-80 hover:opacity-100">✕</button>
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

          <CommonInputField label="飲品分類" required :error="errors.category">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in DRINK_CATEGORIES"
                :key="cat"
                type="button"
                @click="form.category = form.category === cat ? '' : cat; errors.category = ''"
                class="px-3 py-1 rounded-full text-sm border transition-all"
                :class="form.category === cat
                  ? 'bg-m-pink border-m-pink text-white'
                  : 'border-m-gray/30 text-m-gray hover:border-m-pink'"
              >
                {{ cat }}
              </button>
            </div>
          </CommonInputField>

          <CommonInputField label="評分" required :error="errors.rating">
            <div class="flex gap-1">
              <button
                v-for="i in 5" :key="i"
                @click="form.rating = i; errors.rating = ''"
                class="w-10 h-10 transition-all active:scale-90"
                :class="i <= form.rating ? 'opacity-100' : 'opacity-20 grayscale'"
              >
                <img :src="starIcon" alt="" class="w-full h-full object-contain" />
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

        <div class="px-8 pt-4 pb-8 shrink-0 flex justify-center">
          <CommonButton
            variant="pink"
            @click="handleSubmit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '提交中...' : isEditMode ? '儲存變更' : '發佈評價' }}
          </CommonButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
