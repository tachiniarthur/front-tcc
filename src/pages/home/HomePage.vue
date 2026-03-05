<template>
  <div class="min-h-screen text-gray-800">
    <section class="relative h-[60vh] lg:h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')">
      <div class=" absolute inset-0 bg-white/30 backdrop-blur-sm">
      </div>
      <div class="relative z-10 px-6">
        <h2 class="text-8xl lg:text-8xl font-light mb-2">Essence</h2>
        <p class="text-gray-600 text-2xl">A Essência do TCC</p>
      </div>
    </section>

    <Products :products="products" />
    <CartDrawer />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Products from '@/components/home/ProductListingComponent.vue'

const products = ref([
  { id: 1, title: 'Vaso Cerâmica Branco', price: 189.9, image: 'https://example.com/vaso-ceramica-branco.jpg' },
  { id: 2, title: 'Arte Geométrica', price: 249.9, image: 'https://example.com/arte-geometrica.jpg' },
  { id: 3, title: 'Cadeira Escandinava', price: 899.9, image: 'https://example.com/cadeira-escandinava.jpg' },
  { id: 4, title: 'Almofada Off White', price: 149.9, image: 'https://example.com/almofada-off-white.jpg' },
  { id: 5, title: 'Mesa de Centro Natural', price: 1299.9, image: 'https://example.com/mesa-de-centro-natural.jpg' },
  { id: 6, title: 'Banco de Carvalho', price: 499.9, image: 'https://example.com/banco-de-carvalho.jpg' },
])
</script>
