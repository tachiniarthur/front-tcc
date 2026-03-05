<template>
  <section class="max-w-7xl mx-auto px-6" :class="isHome ? 'py-20' : 'pt-8 pb-30'">
    <h3 v-if="isHome" class="text-center text-lg tracking-widest text-gray-600 mb-12">ITENS</h3>
    <div class="flex mb-8" v-else>
      <h3 class="text-lg tracking-widest text-gray-600 ">LISTA DE PRODUTOS</h3>
      <RouterLink to="/add-product"
        class="ml-auto px-4 py-2 border border-gray-300 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition hover:cursor-pointer"
        @click="$emit('add-product')">
        ADICIONAR PRODUTO
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      <div v-for="product in products" :key="product.id" class="flex flex-col items-left group">
        <RouterLink :to="{ name: 'produto', params: { id: product.id } }">
          <div class="overflow-hidden rounded-lg w-full aspect-square bg-white block">
            <img :src="product.image" :alt="product.title"
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
          </div>
        </RouterLink>

        <div class="mt-4">
          <h4 class="font-light text-gray-700 text-lg">{{ product.title }}</h4>
          <p class="text-gray-500 mt-1 text-sm">R$ {{ product.price.toFixed(2) }}</p>

          <button
            class="mt-4 w-100 px-8 py-2 border border-gray-300 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition hover:cursor-pointer"
            @click="addToCart(product)">
            ADICIONAR
          </button>
        </div>
      </div>
    </div>

    <div v-if="isHome" class="flex justify-center mt-12">
      <RouterLink to="/products" class="px-6 text-black text-sm hover:underline transition hover:cursor-pointer">
        VER TODOS OS PRODUTOS
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

defineProps({
  products: {
    type: Array,
    required: true,
  },
  isHome: {
    type: Boolean,
    default: true,
  },
})

function addToCart(product) {
  cart.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  })
  alert(`${product.title} adicionado ao carrinho!`)
}
</script>
