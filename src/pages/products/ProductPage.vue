<template>
  <div class="min-h-screen bg-white pt-24">

    <div class="max-w-7xl mx-auto px-6">
      <RouterLink to="/home" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-4">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Voltar
      </RouterLink>
    </div>


    <main class="max-w-7xl mx-auto px-6 mt-6 mb-24">
      <div v-if="produtoAtual" class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div class="rounded-md overflow-hidden bg-gray-50">
          <img :src="produtoAtual.image || fallbackImage" :alt="produtoAtual.title"
            class="w-full h-[520px] lg:h-[560px] object-cover" />
        </div>


        <div>
          <h1 class="text-3xl font-medium tracking-tight text-gray-900">
            {{ produtoAtual.title }}
          </h1>

          <div class="mt-3 text-2xl text-gray-900">
            {{ formatBRL(produtoAtual.price) }}
          </div>

          <p v-if="produtoAtual.description" class="mt-6 text-gray-600 leading-relaxed max-w-2xl">
            {{ produtoAtual.description }}
          </p>

          <section v-if="produtoAtual.specs?.length" class="mt-10">
            <h2 class="text-xs font-semibold tracking-[0.2em] text-gray-700">
              CARACTERÍSTICAS
            </h2>
            <ul class="mt-4 space-y-1.5 text-gray-600">
              <li v-for="(spec, i) in produtoAtual.specs" :key="i" class="flex gap-2">
                <span>•</span><span>{{ spec }}</span>
              </li>
            </ul>
          </section>

          <div class="mt-10">
            <label class="block text-[11px] font-medium text-gray-700 tracking-[0.2em] mb-3">
              QUANTIDADE
            </label>
            <div class="inline-flex items-center rounded-md">
              <button
                class="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-10 border border-gray-300"
                :disabled="quantidade <= 1" @click="decrementarQuantidade" aria-label="Diminuir">
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <input class="w-50 h-10 text-center outline-none" type="text" min="1" :disabled="true"
                v-model.number="quantidade" @blur="normalizarQuantidade" aria-label="Quantidade" />
              <button
                class="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-300"
                @click="incrementarQuantidade" aria-label="Aumentar">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>

          <button
            class="mt-6 w-full h-12 inline-flex justify-center items-center gap-3 bg-black text-white rounded-md hover:bg-neutral-900 transition"
            @click="adicionarAoCarrinho()">
            <font-awesome-icon :icon="['fas', 'bag-shopping']" />
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      <div v-else class="py-20 text-center text-gray-600">
        Produto não encontrado.
      </div>
    </main>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cart = useCartStore()

const idProduto = computed(() => {
  const raw = route.params.id
  const n = Number(raw)
  return Number.isNaN(n) ? null : n
})

const catalogoProdutos = [
  {
    id: 2,
    title: 'Vaso Cerâmica Branco',
    description:
      'Vaso artesanal em cerâmica branca com acabamento fosco. Perfeito para ambientes minimalistas.',
    price: 189.9,
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    specs: ['Material: Cerâmica', 'Altura: 25cm', 'Diâmetro: 18cm', 'Cor: Branco']
  }
]

const produtoRota = route?.state?.product || null

const produtoAtual = computed(() => {
  if (produtoRota) return produtoRota
  const id = idProduto.value
  if (id === null) return null
  return catalogoProdutos.find(p => p.id === id) ?? null
})
const quantidade = ref(1)
function incrementarQuantidade() { quantidade.value++ }
function decrementarQuantidade() { quantidade.value = Math.max(1, quantidade.value - 1) }
function normalizarQuantidade() {
  if (!quantidade.value || quantidade.value < 1) quantidade.value = 1
  quantidade.value = Math.floor(quantidade.value)
}

function adicionarAoCarrinho() {
  if (!produtoAtual.value) return
  cart.addToCart({
    id: produtoAtual.value.id,
    title: produtoAtual.value.title,
    price: produtoAtual.value.price,
    image: produtoAtual.value.image,
    qty: quantidade.value,
  })
}

const fallbackImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'

function formatBRL(v) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v ?? 0)
  } catch { return `R$ ${Number(v || 0).toFixed(2)}` }
}
</script>
