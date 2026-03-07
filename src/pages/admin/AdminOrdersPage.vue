<template>
  <div class="min-h-screen bg-white pt-24 pb-16 px-4">
    <div class="max-w-4xl mx-auto">

      <h2 class="text-3xl font-light text-center mb-10 tracking-wide">GERENCIAR PEDIDOS</h2>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p class="text-gray-400 text-sm">Carregando pedidos...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 text-sm mb-4">{{ error }}</p>
        <button @click="fetchOrders" class="text-sm text-black underline hover:no-underline transition hover:cursor-pointer">
          Tentar novamente
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="orders.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-sm">Nenhum pedido encontrado.</p>
      </div>

      <!-- Orders list -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="border border-gray-200">
          <!-- Order header -->
          <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div>
              <span class="text-xs tracking-widest text-gray-400 uppercase">Pedido #{{ order.id }}</span>
              <p class="text-xs text-gray-500 mt-1">{{ order.user?.name }} &mdash; {{ order.user?.email }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ formatDate(order.created_at) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <select
                :value="order.status"
                @change="changeStatus(order, $event.target.value)"
                :disabled="updatingId === order.id"
                class="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-black transition disabled:opacity-50">
                <option value="pending">Pendente</option>
                <option value="processing">Processando</option>
                <option value="completed">Finalizado</option>
                <option value="cancelled">Cancelado</option>
              </select>
              <span v-if="updatingId === order.id" class="text-xs text-gray-400">Salvando...</span>
            </div>
          </div>

          <!-- Order items -->
          <div class="divide-y divide-gray-100">
            <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 px-6 py-3">
              <div class="w-10 h-10 bg-gray-100 overflow-hidden shrink-0">
                <img :src="item.product?.image_url || '/placeholder.png'" class="w-full h-full object-cover" :alt="item.product?.name || 'Produto'" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-light text-gray-900 truncate">{{ item.product?.name || 'Produto removido' }}</p>
                <p class="text-xs text-gray-500">Qtd: {{ item.quantity }} &times; R$ {{ parseFloat(item.price).toFixed(2) }}</p>
              </div>
              <p class="text-sm text-gray-800 shrink-0">
                R$ {{ (parseFloat(item.price) * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>

          <!-- Order total -->
          <div class="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
            <span class="text-xs tracking-widest text-gray-400 uppercase">Total</span>
            <span class="text-sm font-light text-gray-900">R$ {{ orderTotal(order).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrderService from '@/services/internal/Order/OrderService.js'

const orders = ref([])
const loading = ref(true)
const error = ref(null)
const updatingId = ref(null)

function orderTotal(order) {
  return order.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function changeStatus(order, newStatus) {
  if (order.status === newStatus) return
  updatingId.value = order.id
  try {
    const updated = await OrderService.updateStatus(order.id, newStatus)
    order.status = updated.status
  } catch (e) {
    const msg = e?.data?.message || e?.message || 'Erro ao atualizar status.'
    alert(msg)
  } finally {
    updatingId.value = null
  }
}

async function fetchOrders() {
  loading.value = true
  error.value = null
  try {
    const data = await OrderService.listAll()
    orders.value = data
  } catch (e) {
    error.value = 'Nao foi possivel carregar os pedidos.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)
</script>