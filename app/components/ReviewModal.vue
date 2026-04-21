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
  rating: 4,
  sugar_ice: '',
  comment: ''
})

const isSubmitting = ref(false)

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
    rating: 4,
    sugar_ice: '',
    comment: ''
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await $fetch('/api/reviews', {
      method: 'POST',
      body: {
        shop_name: form.value.shop_name,
        drink_name: form.value.drink_name,
        category: form.value.category || null,
        rating: form.value.rating,
        sugar_ice: form.value.sugar_ice,
        comment: form.value.comment
      }
    })
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
        class="bg-white w-full max-w-md rounded-bubble p-8 shadow-xl flex flex-col gap-6"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-medium">新增喝貨點評</h2>
          <button @click="handleClose" class="opacity-80 hover:opacity-100">✕</button>
        </div>

        <div class="flex flex-col gap-4">
          <!-- TODO: Add Drink Search Suggestion here -->
           <CommonInputField 
            v-model="form.shop_name"
            label="店家名稱"
            placeholder="例如：青山"
          />

          <CommonInputField
            v-model="form.drink_name"
            label="飲品名稱"
            placeholder="例如：波霸奶茶"
          />

          <div>
            <label class="text-sm font-bold text-m-gray mb-1 block">飲品分類</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in DRINK_CATEGORIES"
                :key="cat"
                type="button"
                @click="form.category = form.category === cat ? '' : cat"
                class="px-3 py-1 rounded-full text-sm border transition-all"
                :class="form.category === cat
                  ? 'bg-m-pink border-m-pink text-white'
                  : 'border-m-gray/30 text-m-gray hover:border-m-pink'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <div>
            <label class="text-sm font-bold text-m-gray mb-1 block">評分</label>
            <div class="flex gap-1">
              <button 
                v-for="i in 5" :key="i"
                @click="form.rating = i"
                class="w-10 h-10 transition-all active:scale-90"
                :class="i <= form.rating ? 'opacity-100' : 'opacity-20 grayscale'"
              >
                <img :src="starIcon" alt="" class="w-full h-full object-contain" />
              </button>
            </div>
          </div>

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

        <CommonButton 
          variant="pink" 
          @click="handleSubmit" 
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '提交中...' : '發佈評價' }}
        </CommonButton>
      </div>
    </div>
  </Teleport>
</template>
