<template>
  <footer class="w-full bg-m-green/40 p-8 flex flex-col items-center gap-4">
    <div>
      <img src="~/assets/images/udrink-logo.png" alt="Logo" class="w-32 h-32 object-contain">
    </div>
    <div>
      <p class="text-center opacity-60">Founded By 來喝飲料吧</p>
      <p class="text-m-blue-dark text-center">@{{ year }} Taiwan is Best.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>