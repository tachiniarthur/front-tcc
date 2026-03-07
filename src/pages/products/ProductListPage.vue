<template>
  <div class="min-h-screen bg-white pt-24">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between mt-4 mb-8">
        <h2 class="text-2xl font-light tracking-wide">Produtos</h2>
        <router-link v-if="auth.isAdmin" to="/add-product"
          class="h-10 px-6 flex items-center text-xs font-semibold tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition">
          + Novo Produto
        </router-link>
      </div>

      <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
        <ProductListingComponent v-for="product in products" :key="product.id" :product="product" @updated="loadProducts" />
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-sm mb-6">Nenhum produto cadastrado ainda.</p>
        <router-link v-if="auth.isAdmin" to="/add-product"
          class="inline-flex items-center h-10 px-6 text-xs font-semibold tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition">
          Cadastrar primeiro produto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CartService from '@/services/internal/Cart/CartService.js';
import { useCartStore } from '@/stores/cart.js';
import { useAuthStore } from '@/stores/auth.js';
import ProductListingComponent from '@/components/home/ProductListingComponent.vue';

const products = ref([]);
const cartStore = useCartStore();
const auth = useAuthStore();

async function loadProducts() {
  const { data } = await CartService.getProducts();
  products.value = data.products;
}

onMounted(async () => {
  await cartStore.fetchCart();
  await loadProducts();
});
</script>
