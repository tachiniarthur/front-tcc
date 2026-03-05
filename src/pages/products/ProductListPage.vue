<template>
  <div class="min-h-screen bg-white pt-24">

    <ProductListingComponent :products="products" :isHome="false" />
  </div>
</template>

<script setup>
import ProductListingComponent from '@/components/home/ProductListingComponent.vue';
import { ref } from 'vue';

const products = ref([
  { id: 1, title: 'Vaso Cerâmica Branco', price: 189.9, image: 'https://example.com/vaso-ceramica-branco.jpg' },
  { id: 2, title: 'Arte Geométrica', price: 249.9, image: 'https://example.com/arte-geometrica.jpg' },
  { id: 3, title: 'Cadeira Escandinava', price: 899.9, image: 'https://example.com/cadeira-escandinava.jpg' },
  { id: 4, title: 'Almofada Off White', price: 149.9, image: 'https://example.com/almofada-off-white.jpg' },
  { id: 5, title: 'Mesa de Centro Natural', price: 1299.9, image: 'https://example.com/mesa-de-centro-natural.jpg' },
  { id: 6, title: 'Banco de Carvalho', price: 499.9, image: 'https://example.com/banco-de-carvalho.jpg' },
])
</script>
