<script setup lang="ts">
import Icon1 from '~/assets/images/icons/cloude-5.png'
import Icon2 from '~/assets/images/icons/cloude-2.png'
import Icon3 from '~/assets/images/icons/cloude-3.png'
import IconFace from '~/assets/images/icons/face.png'

definePageMeta({
  middleware: 'auth'
})

const userStore = useUserStore()
const router = useRouter()

const activeTab = ref('reviews')
const icons = [Icon1, Icon2, Icon3]
const randomIcon = computed(() => icons[Math.floor(Math.random() * icons.length)])

// Fetch user data
const { data: myReviews } = await useFetch('/api/reviews/mine')
const { data: myFavorites } = await useFetch('/api/reviews/mine') // Placeholder
</script>

<template>
  <div class="py-8 flex flex-col items-center gap-10 px-4">
    <!-- Profile Header -->
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="relative w-24">
        <img :src="randomIcon" alt="" class="w-24">
        <img :src="IconFace" alt="" class="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      </div>
      <div class="space-y-4">
        <p class="text-3xl font-black text-m-gray tracking-tight">{{ userStore.username }}</p>
        <p class="text-xs text-m-gray opacity-40 font-mono">ID: {{ userStore.userId }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="w-full flex flex-col gap-6 max-w-[1200px]">
      <div class="w-full flex bg-white p-1.5 rounded-full border-4 border-m-purple/60">
        <button 
          @click="activeTab = 'reviews'"
          class="flex-1 py-3 rounded-full transition-all"
          :class="activeTab === 'reviews' ? 'bg-m-blue' : 'text-m-gray opacity-40'"
        >
          我的評分
        </button>
        <button 
          @click="activeTab = 'favorites'"
          class="flex-1 py-3 rounded-full transition-all"
          :class="activeTab === 'favorites' ? 'bg-m-pink' : 'text-m-gray opacity-40'"
        >
          收藏清單
        </button>
      </div>

      <!-- Content -->
      <div class="w-full flex flex-col gap-6">
        <template v-if="activeTab === 'reviews'">
          <div v-if="myReviews && myReviews.length > 0" class="flex flex-col gap-6">
            <!-- Filtered in real world, but using the same list for demo -->
            <ReviewCard
              v-for="review in myReviews"
              :key="review.id"
              :review="review"
              :editable="true"
            />
          </div>
          <div v-else class="py-12 text-center opacity-40 text-sm italic font-medium">
            目前還沒有任何評分喔...
          </div>
        </template>

        <template v-else>
          <div class="py-12 text-center flex flex-col items-center gap-4">
            <p class="opacity-40">收藏功能即將上線！</p>
            <p class="opacity-40">敬請期待！</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
