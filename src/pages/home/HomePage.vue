<template>
  <div class="min-h-screen text-gray-800">
    <section class="relative h-[60vh] lg:h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')">
      <div class="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      <div class="relative z-10 px-6">
        <h2 class="text-8xl lg:text-8xl font-light mb-2">Essence</h2>
        <p class="text-gray-600 text-2xl font-light">A Essencia do TCC</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-xs tracking-widest text-gray-400 uppercase">Nossos Produtos</h2>
        <router-link v-if="auth.isAdmin" to="/add-product"
          class="h-10 px-6 flex items-center text-xs font-semibold tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition">
          + Novo Produto
        </router-link>
      </div>

      <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductListingComponent v-for="product in products" :key="product.id" :product="product" @updated="loadProducts" />
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-sm mb-6">Nenhum produto cadastrado ainda.</p>
        <router-link v-if="auth.isAdmin" to="/add-product"
          class="inline-flex items-center h-10 px-6 text-xs font-semibold tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition">
          Cadastrar primeiro produto
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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

// Reload products whenever cart items change (add/remove/update from drawer)
watch(() => cartStore.items, loadProducts, { deep: true });

onMounted(async () => {
  await loadProducts();
  await cartStore.fetchCart();
});
</script>