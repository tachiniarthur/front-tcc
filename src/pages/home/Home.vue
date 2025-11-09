<template>
  <div class="min-h-screen text-gray-800">
    <section
      class="relative h-[60vh] lg:h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600');"
    >
      <div class="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      <div class="relative z-10 px-6">
        <h2 class="text-4xl lg:text-5xl font-light mb-2">Essence</h2>
        <p class="text-gray-600 text-lg">A Essência do TCC</p>
      </div>
    </section>

    <Products :products="products" />
    <CartDrawer />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Products from '@/components/home/Products.vue'
import CartDrawer from '@/components/home/CartDrawer.vue'

const products = ref([
  { id: 1, title: 'Vaso Cerâmica Branco', price: 189.9, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Arte Geométrica', price: 249.9, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Cadeira Escandinava', price: 899.9, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Almofada Off White', price: 149.9, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Mesa de Centro Natural', price: 1299.9, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600' },
  { id: 6, title: 'Banco de Carvalho', price: 499.9, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
])
</script>
