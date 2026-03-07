<template>
  <div class="group">
    <router-link :to="`/products/${product.id}`" class="block">
      <div class="aspect-square overflow-hidden bg-gray-50">
        <img :src="product.image_url || '/placeholder.png'" :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
    </router-link>
    <div class="mt-3">
      <router-link :to="`/products/${product.id}`" class="block">
        <h3 class="text-sm tracking-wide">{{ product.name }}</h3>
      </router-link>
      <p class="text-sm text-gray-500 mt-1">R$ {{ parseFloat(product.price).toFixed(2) }}</p>
      <p class="text-xs mt-1" :class="available > 0 ? 'text-gray-400' : 'text-red-500'">
        {{ available > 0 ? `${available} em estoque` : 'Sem estoque' }}
      </p>
      <button @click="handleAdd" :disabled="available <= 0"
        class="mt-3 w-full h-10 text-xs font-semibold tracking-widest uppercase transition" :class="available > 0
          ? 'bg-black text-white hover:bg-gray-900 cursor-pointer'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
        {{ available > 0 ? 'Adicionar' : 'Indisponivel' }}
      </button>

      <div v-if="auth.isAdmin" class="flex gap-2 mt-2">
        <router-link :to="`/edit-product/${product.id}`"
          class="flex-1 h-9 flex items-center justify-center text-xs font-semibold tracking-widest uppercase border border-black text-black hover:bg-gray-100 transition">
          Editar
        </router-link>
        <button @click="handleDelete" :disabled="deleting"
          class="flex-1 h-9 text-xs font-semibold tracking-widest uppercase border border-red-500 text-red-500 hover:bg-red-50 transition disabled:opacity-50">
          {{ deleting ? '...' : 'Remover' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart.js';
import { useAuthStore } from '@/stores/auth.js';
import ProductService from '@/services/internal/Product/ProductService';

const props = defineProps({
  product: { type: Object, required: true },
});

const emit = defineEmits(['updated']);

const cartStore = useCartStore();
const auth = useAuthStore();
const deleting = ref(false);

const available = computed(() => props.product.available_stock ?? props.product.stock);

async function handleAdd() {
  if (available.value <= 0) {
    alert('Produto sem estoque disponivel.');
    return;
  }
  const result = await cartStore.addToCart(props.product.id, 1);
  if (result.success) {
    emit('updated');
  }
}

async function handleDelete() {
  if (!confirm(`Remover "${props.product.name}"?`)) return;
  deleting.value = true;
  try {
    await ProductService.remove(props.product.id);
    emit('updated');
  } catch (err) {
    alert(err?.data?.message || err?.message || 'Erro ao remover produto.');
  } finally {
    deleting.value = false;
  }
}
</script>
