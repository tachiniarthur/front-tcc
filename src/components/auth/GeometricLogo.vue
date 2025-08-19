<template>
  <div class="flex items-center justify-center">
    <div class="relative w-16 h-16">
      <!-- Outer diamond -->
      <div class="absolute inset-0 border-4 border-primary-400 rotate-45 rounded-lg"></div>
      <!-- Inner diamond -->
      <div class="absolute inset-3 border-2 border-primary-400 rotate-45 rounded-md"></div>
      <!-- Center diamond -->
      <div class="absolute inset-4 bg-primary-400 rotate-45 rounded-sm"></div>
      <!-- Connecting lines -->
      <div class="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-400"></div>
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-400"></div>
      <div class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-primary-400"></div>
      <div class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-primary-400"></div>
    </div>
  </div>
</template>

<script setup>
// purely visual
</script>
