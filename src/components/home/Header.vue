<template>
  <header class="fixed top-0 inset-x-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 class="text-sm tracking-widest font-light">ESSENCE</h1>

      <div class="flex items-center gap-4">
        <button
          class="relative inline-flex items-center gap-2 px-2.5 py-2 text-sm hover:bg-gray-200 transition hover:cursor-pointer"
          @click="ui.openCart()"
          aria-label="Abrir carrinho"
        >
          <font-awesome-icon :icon="['fas','cart-shopping']" />

          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[10px] leading-[18px] text-center"
          >
            {{ cart.totalItems }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'
import { useCartStore } from '@/stores/cart'

const ui = useUiStore()
const cart = useCartStore()
</script>
