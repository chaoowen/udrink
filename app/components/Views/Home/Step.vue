<script setup lang="ts">
import Icon1 from '~/assets/images/icons/cloude-5.png'
import Icon2 from '~/assets/images/icons/cloude-2.png'
import Icon3 from '~/assets/images/icons/cloude-3.png'
import IconFace from '~/assets/images/icons/face.png'

const steps = [
  {
    id: 1,
    icon: Icon3,
    title: '查詢評價',
    description: '點餐總是猶豫不決？<br>來參考喝貨們的專業清單'
  },
  {
    id: 2,
    icon: Icon1,
    title: '建立評價',
    description: '遇到好喝的飲料下次就忘？<br>紀錄起來，自己看也造福大眾'
  },
  {
    id: 3,
    icon: Icon2,
    title: '登入記得你',
    description: '登入即可紀錄你的喝貨足跡<br>飲料永流傳'
  },
]

</script>

<template>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:mx-4">
  <div v-for="step in steps" :key="step.id" class="p-6 flex flex-col items-center justify-center gap-2 bg-m-pink/70 rounded-2xl">
    <div class="relative w-24">
      <img :src="step.icon" alt="" class="w-24">
      <img :src="IconFace" alt="" class="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    </div>
    <p class="text-2xl font-semibold text-m-purple-dark">{{ step.title }}</p>
    <div class="text-center" v-html="step.description"></div>
  </div>
</div>
</template>