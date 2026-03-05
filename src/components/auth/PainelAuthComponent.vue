<template>
  <div
    class="relative w-full max-w-xl bg-gradient-to-br from-black via-black to-black flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gray-900/10"></div>

    <div class="text-center z-[1] text-white">
      <h1 class="text-6xl font-bold mb-4 tracking-wide">
        {{ title }}
      </h1>
      <p class="text-xl opacity-90 font-light">
        {{ subtitle }}
      </p>
    </div>

    <div class="absolute top-28 left-20 w-32 h-32 bg-gray-100 rounded-full blur-sm"></div>
    <div class="absolute bottom-20 right-20 w-24 h-24 bg-secondary-100 rounded-lg rotate-45 blur-sm"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>
