<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const userStore = useUserStore()
const router = useRouter()

const activeTab = ref('reviews')

// Fetch user data
const { data: myReviews } = await useFetch('/api/reviews/latest') // Replace with a filtered API if needed
const { data: myFavorites } = await useFetch('/api/reviews/latest') // Placeholder

const logout = () => {
  if (confirm('確定要登出嗎？')) {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <div class="py-8 flex flex-col gap-10">
    <!-- Profile Header -->
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="w-24 h-24 bg-m-blue rounded-full flex items-center justify-center text-4xl shadow-inner">
        🥤
      </div>
      <div>
        <h1 class="text-3xl font-black text-m-gray tracking-tight">{{ userStore.username }}</h1>
        <p class="text-xs text-m-gray opacity-40 font-mono">ID: {{ userStore.userId }}</p>
      </div>
      <button 
        @click="logout" 
        class="text-xs font-bold text-m-pink border border-m-pink/30 px-4 py-1.5 rounded-full hover:bg-m-pink/10 transition-colors"
      >
        登出帳號
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex flex-col gap-6">
      <div class="flex bg-white p-1.5 rounded-full shadow-sm border border-[#eee]">
        <button 
          @click="activeTab = 'reviews'"
          class="flex-1 py-3 rounded-full text-sm font-bold transition-all"
          :class="activeTab === 'reviews' ? 'bg-m-blue text-m-gray shadow-md' : 'text-m-gray opacity-40'"
        >
          我的評分
        </button>
        <button 
          @click="activeTab = 'favorites'"
          class="flex-1 py-3 rounded-full text-sm font-bold transition-all"
          :class="activeTab === 'favorites' ? 'bg-m-pink text-m-gray shadow-md' : 'text-m-gray opacity-40'"
        >
          收藏清單
        </button>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-6">
        <template v-if="activeTab === 'reviews'">
          <div v-if="myReviews && myReviews.length > 0" class="flex flex-col gap-6">
            <!-- Filtered in real world, but using the same list for demo -->
            <ReviewCard 
              v-for="review in myReviews" 
              :key="review.id" 
              :review="review" 
            />
          </div>
          <div v-else class="py-12 text-center opacity-40 text-sm italic font-medium">
            目前還沒有任何評分喔...
          </div>
        </template>

        <template v-else>
          <div class="py-12 text-center flex flex-col items-center gap-4">
            <div class="text-5xl grayscale opacity-20">💖</div>
            <p class="text-m-gray opacity-40 text-sm font-bold">收藏功能即將上線！</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
