<template>
  <transition name="fade">
    <div v-if="ui.cartOpen" class="fixed inset-0 z-40 bg-black/40" @click="ui.closeCart()" />
  </transition>

  <transition name="slide">
    <aside v-if="ui.cartOpen" class="fixed inset-y-0 right-0 z-50 w-full sm:max-w-lg bg-white flex flex-col">

      <div class="flex items-center justify-between px-6 py-5">
        <h2 class="text-sm font-light tracking-widest text-gray-700">CARRINHO</h2>
        <button
          class="h-8 w-8 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 hover:cursor-pointer"
          @click="ui.closeCart()" aria-label="Fechar">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
      </div>

      <div class="flex-1 overflow-auto px-6 py-6">
        <div v-if="cart.items.length === 0" class="text-gray-500 text-sm py-16 text-center">
          Seu carrinho está vazio.
        </div>

        <ul v-else class="space-y-6">
          <li v-for="item in sortedItems" :key="item.id" class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <div class="w-24 h-24 bg-gray-100 overflow-hidden">
                <img :src="item.product.image_url || '/placeholder.png'" class="w-full h-full object-cover" />
              </div>
              <div class="min-w-0">
                <div class="text-sm font-light text-gray-900 truncate">{{ item.product.name }}</div>
                <div class="text-sm text-gray-500">R$ {{ parseFloat(item.product.price).toFixed(2) }}</div>

                <div class="mt-3 flex items-center gap-2">
                  <button
                    class="h-8 w-8 inline-flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 text-gray-700 hover:cursor-pointer"
                    @click="decrease(item)" aria-label="Diminuir">
                    <font-awesome-icon :icon="['fas', 'minus']" class="text-xs" />
                  </button>
                  <div class="w-8 text-center text-sm font-medium">{{ item.quantity }}</div>
                  <button
                    class="h-8 w-8 inline-flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 text-gray-700 hover:cursor-pointer"
                    :disabled="item.quantity >= maxQuantity(item)"
                    :class="{ 'opacity-40 cursor-not-allowed': item.quantity >= maxQuantity(item) }"
                    @click="increase(item)" aria-label="Aumentar">
                    <font-awesome-icon :icon="['fas', 'plus']" class="text-xs" />
                  </button>
                </div>

                <p v-if="item.available_stock <= 0" class="text-xs text-red-500 mt-1">Estoque esgotado</p>
              </div>
            </div>

            <button
              class="h-4 w-4 inline-flex items-center justify-center text-gray-400 hover:text-red-600 hover:cursor-pointer"
              @click="remove(item.id)" aria-label="Remover">
              <font-awesome-icon :icon="['fas', 'xmark']" class="text-xs" />
            </button>
          </li>
        </ul>
      </div>

      <div class="px-6 py-5 space-y-4" v-if="cart.items.length !== 0">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Total</span>
          <span class="font-light text-gray-900">R$ {{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <RouterLink to="/checkout" @click="ui.closeCart()">
          <button
            class="w-full h-11 bg-black text-white text-sm tracking-wider hover:opacity-90 transition disabled:opacity-50 hover:cursor-pointer"
            :disabled="cart.items.length === 0">
            FINALIZAR COMPRA
          </button>
        </RouterLink>
      </div>

    </aside>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useCartStore } from '@/stores/cart'

const ui = useUiStore()
const cart = useCartStore()

const sortedItems = computed(() =>
  [...cart.items].sort((a, b) => b.quantity - a.quantity)
)

function maxQuantity(item) {
  return item.quantity + item.available_stock
}

function increase(item) {
  if (item.quantity >= maxQuantity(item)) return
  cart.updateQuantity(item.id, item.quantity + 1)
}

function decrease(item) {
  item.quantity <= 1 ? cart.removeItem(item.id) : cart.updateQuantity(item.id, item.quantity - 1)
}

function remove(id) {
  cart.removeItem(id)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .6s cubic-bezier(.2, .9, .2, 1), opacity .6s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
