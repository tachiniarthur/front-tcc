<template>
  <div class="min-h-screen bg-white pt-24 pb-16 px-4">
    <div class="max-w-3xl mx-auto">

      <h2 class="text-3xl font-light text-center mb-10 tracking-wide">CHECKOUT</h2>

      <!-- Loading -->
      <div v-if="cart.loading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p class="text-gray-400 text-sm">Carregando carrinho...</p>
      </div>

      <!-- Empty cart -->
      <div v-else-if="cart.items.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-sm mb-6">Seu carrinho esta vazio.</p>
        <RouterLink to="/products" class="text-sm text-black underline hover:no-underline transition">
          Ver produtos
        </RouterLink>
      </div>

      <!-- Cart items -->
      <template v-else>
        <div class="border border-gray-200 divide-y divide-gray-200 mb-8">
          <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-4 px-6 py-4">
            <div class="w-16 h-16 bg-gray-100 overflow-hidden shrink-0">
              <img :src="item.product.image_url || '/placeholder.png'" class="w-full h-full object-cover" :alt="item.product.name" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-light text-gray-900 truncate">{{ item.product.name }}</p>
              <p class="text-xs text-gray-500 mt-1">Qtd: {{ item.quantity }}</p>
            </div>
            <p class="text-sm text-gray-800 shrink-0">
              R$ {{ (parseFloat(item.product.price) * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>

        <!-- Total -->
        <div class="flex items-center justify-between px-6 py-4 border border-gray-200 mb-8">
          <span class="text-sm tracking-widest text-gray-500 uppercase">Total</span>
          <span class="text-lg font-light text-gray-900">R$ {{ cart.totalPrice.toFixed(2) }}</span>
        </div>

        <!-- Error -->
        <p v-if="errorMsg" class="text-red-500 text-sm text-center mb-4">{{ errorMsg }}</p>

        <!-- Success -->
        <p v-if="successMsg" class="text-green-600 text-sm text-center mb-4">{{ successMsg }}</p>

        <!-- Actions -->
        <div class="flex flex-col gap-3">
          <button
            @click="placeOrder"
            :disabled="placing"
            class="w-full h-12 bg-black text-white text-sm font-semibold tracking-wider hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
            {{ placing ? 'FINALIZANDO...' : 'FINALIZAR PEDIDO' }}
          </button>
          <RouterLink to="/home">
            <button class="w-full h-12 text-sm font-semibold tracking-wide border border-gray-300 text-gray-600 hover:bg-gray-100 transition hover:cursor-pointer">
              CONTINUAR COMPRANDO
            </button>
          </RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import OrderService from '@/services/internal/Order/OrderService.js'

const cart = useCartStore()
const router = useRouter()

const placing = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

async function placeOrder() {
  placing.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const items = cart.items.map(i => ({
      product_id: i.product_id,
      quantity: i.quantity,
    }))

    await OrderService.create(items)

    cart.clearCart()
    successMsg.value = 'Pedido realizado com sucesso!'

    setTimeout(() => {
      router.push({ name: 'pedidos' })
    }, 1200)
  } catch (e) {
    const msg = e?.data?.message || e?.message || 'Erro ao finalizar pedido.'
    errorMsg.value = msg
  } finally {
    placing.value = false
  }
}
</script>