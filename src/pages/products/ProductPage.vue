<template>
  <div class="min-h-screen bg-white pt-24">
    <div class="max-w-7xl mx-auto px-6">

      <div v-if="!product" class="py-20 text-center">
        <p class="text-gray-400 text-sm">Carregando...</p>
      </div>

      <template v-else>
        <RouterLink to="/home" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-4">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
          Voltar
        </RouterLink>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6 mb-24">
          <div class="aspect-square overflow-hidden bg-gray-50">
            <img :src="product.image_url || '/placeholder.png'" :alt="product.name"
              class="w-full h-full object-cover" />
          </div>

          <div class="flex flex-col">
            <h1 class="text-2xl font-light tracking-wide">{{ product.name }}</h1>
            <p class="text-gray-500 text-sm mt-3 leading-relaxed">{{ product.description }}</p>
            <p class="text-lg mt-4">R$ {{ parseFloat(product.price).toFixed(2) }}</p>

            <p class="text-xs mt-3" :class="maxAddable > 0 ? 'text-gray-400' : 'text-red-500'">
              {{ maxAddable > 0 ? `${maxAddable} unidade(s) disponivel(is)` : 'Produto sem estoque' }}
            </p>

            <div class="flex-1"></div>

            <div class="flex items-center gap-3 mt-6">
              <label for="qty" class="text-xs tracking-widest text-gray-400 uppercase">Qtd</label>
              <input id="qty" type="number" v-model.number="quantity" :min="1" :max="maxAddable"
                class="w-16 h-10 border border-gray-300 text-center text-sm focus:border-black outline-none transition"
                :disabled="maxAddable <= 0" />
            </div>

            <button @click="handleAddToCart" :disabled="maxAddable <= 0 || quantity < 1"
              class="mt-6 w-full h-12 text-sm font-semibold tracking-widest uppercase transition" :class="maxAddable > 0 && quantity >= 1
                ? 'bg-black text-white hover:bg-gray-900 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
              {{ maxAddable > 0 ? 'Adicionar ao Carrinho' : 'Indisponivel' }}
            </button>

            <div v-if="auth.isAdmin" class="flex gap-3 mt-4">
              <router-link :to="`/edit-product/${product.id}`"
                class="flex-1 h-10 flex items-center justify-center text-xs font-semibold tracking-widest uppercase border border-black text-black hover:bg-gray-100 transition">
                Editar
              </router-link>
              <button @click="handleDelete" :disabled="deleting"
                class="flex-1 h-10 text-xs font-semibold tracking-widest uppercase border border-red-500 text-red-500 hover:bg-red-50 transition disabled:opacity-50">
                {{ deleting ? 'Removendo...' : 'Remover' }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart.js';
import { useAuthStore } from '@/stores/auth.js';
import ProductService from '@/services/internal/Product/ProductService';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const auth = useAuthStore();

const product = ref(null);
const quantity = ref(1);
const deleting = ref(false);

const cartItem = computed(() =>
  product.value ? cartStore.getItemByProductId(product.value.id) : null
);

// maxAddable = how many more units the user can add to their cart.
// When the product is already in the cart, the cart API returns
// item.available_stock = stock - reservedByOthers - userQty (ready to use).
// When NOT in cart, product.available_stock = stock - allReserved (same thing
// since user has 0 reserved).
const maxAddable = computed(() => {
  if (!product.value) return 0;
  if (cartItem.value) {
    return cartItem.value.available_stock ?? 0;
  }
  return product.value.available_stock ?? product.value.stock;
});

async function loadProduct() {
  const res = await ProductService.get(route.params.id);
  product.value = res.product;
}

async function handleAddToCart() {
  if (quantity.value > maxAddable.value) {
    alert(`Estoque insuficiente. Voce pode adicionar no maximo ${maxAddable.value} unidade(s).`);
    return;
  }

  const result = await cartStore.addToCart(product.value.id, quantity.value);
  if (result.success) {
    await loadProduct();
    quantity.value = 1;
  }
}

async function handleDelete() {
  if (!confirm('Tem certeza que deseja remover este produto?')) return;
  deleting.value = true;
  try {
    await ProductService.remove(product.value.id);
    router.push({ name: 'Inicio' });
  } catch (err) {
    const msg = err?.data?.message || err?.message || 'Erro ao remover produto.';
    alert(msg);
  } finally {
    deleting.value = false;
  }
}

onMounted(async () => {
  await cartStore.fetchCart();
  await loadProduct();
});
</script>