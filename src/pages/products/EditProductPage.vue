<template>
  <div class="min-h-screen bg-white pt-24">
    <div class="max-w-7xl mx-auto px-6">
      <RouterLink to="/home" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-4">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Voltar
      </RouterLink>
    </div>

    <main class="max-w-7xl mx-auto px-6 mt-6 mb-24">
      <div v-if="loadingPage" class="py-20 text-center text-gray-600">Carregando...</div>

      <div v-else-if="notFound" class="py-20 text-center text-gray-600">Produto nao encontrado.</div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div v-if="!showFilePond"
            class="rounded-md overflow-hidden bg-gray-50 h-full max-h-[600px] relative cursor-pointer"
            @click="showFilePond = true">
            <img :src="currentImageUrl || fallbackImage" alt="Imagem atual do produto"
              class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center">
              <span class="text-white text-sm font-medium">Clique para trocar a imagem</span>
            </div>
          </div>
          <div v-else class="rounded-md overflow-hidden h-full max-h-[600px] relative">
            <FilePond ref="pond" name="image"
              label-idle="Arraste a nova imagem ou <span class='filepond--label-action'>clique para selecionar</span>"
              :allow-multiple="false" accepted-file-types="image/*" :instant-upload="false" :allow-process="false"
              @addfile="onAddFile" @removefile="onRemoveFile" class="h-full" />
            <button v-if="showFilePond" type="button" @click="cancelImageChange"
              class="absolute bottom-2 left-2 text-sm text-gray-600 bg-white/80 px-3 py-1 rounded hover:bg-white transition">
              Manter imagem atual
            </button>
          </div>
          <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image }}</p>
        </div>

        <div class="flex flex-col">
          <h3 class="text-lg tracking-widest text-gray-600">EDITAR PRODUTO</h3>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-6 flex-1 flex flex-col">
            <div>
              <label for="name" class="block text-sm tracking-widest text-gray-700">Nome do produto <span
                  class="text-red-500">*</span></label>
              <input id="name" v-model="name" type="text" placeholder="Digite o nome do produto"
                class="mt-1 p-3.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                :class="{ 'border-red-500': errors.name }" />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <label for="description" class="block text-sm tracking-widest text-gray-700">Descricao <span
                  class="text-red-500">*</span></label>
              <textarea id="description" v-model="description" rows="4" placeholder="Digite a descricao do produto"
                class="mt-1 p-3.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                :class="{ 'border-red-500': errors.description }"></textarea>
              <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
            </div>

            <div>
              <label for="price" class="block text-sm tracking-widest text-gray-700">Preco <span
                  class="text-red-500">*</span></label>
              <input id="price" v-model.number="price" type="number" step="0.01" placeholder="Digite o preco do produto"
                class="mt-1 p-3.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                :class="{ 'border-red-500': errors.price }" />
              <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
            </div>

            <div>
              <label for="stock" class="block text-sm tracking-widest text-gray-700">Quantidade em estoque <span
                  class="text-red-500">*</span></label>
              <input id="stock" v-model.number="stock" type="number" placeholder="Digite a quantidade em estoque"
                class="mt-1 p-3.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                :class="{ 'border-red-500': errors.stock }" />
              <p v-if="errors.stock" class="text-red-500 text-xs mt-1">{{ errors.stock }}</p>
            </div>

            <div class="flex items-center gap-3">
              <input id="active" v-model="active" type="checkbox" class="h-4 w-4 rounded border-gray-300" />
              <label for="active" class="text-sm tracking-widest text-gray-700">Produto ativo</label>
            </div>

            <button type="submit" :disabled="loading"
              class="w-full h-10 text-md font-semibold bg-black text-white hover:bg-gray-900 transition hover:cursor-pointer mt-auto disabled:opacity-50">
              <span v-if="!loading">Salvar Alteracoes</span>
              <span v-else>Enviando...</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import vueFilePond from 'vue-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import ProductService from '@/services/internal/Product/ProductService'

const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginFileValidateType)

const route = useRoute()
const router = useRouter()

const pond = ref(null)
const imageFile = ref(null)
const showFilePond = ref(false)
const currentImageUrl = ref('')
const fallbackImage = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60'

const name = ref('')
const description = ref('')
const price = ref(null)
const stock = ref(null)
const active = ref(true)

const loadingPage = ref(true)
const loading = ref(false)
const notFound = ref(false)
const errors = reactive({})

let productId = null



onMounted(async () => {
  productId = route.params.id
  if (!productId) {
    notFound.value = true
    loadingPage.value = false
    return
  }

  try {
    const res = await ProductService.get(productId)
    const p = res.product
    name.value = p.name || ''
    description.value = p.description || ''
    price.value = p.price != null ? Number(p.price) : null
    stock.value = p.stock != null ? Number(p.stock) : null
    active.value = !!p.active
    currentImageUrl.value = p.image_url || ''
  } catch (e) {
    console.error('Erro ao carregar produto:', e)
    notFound.value = true
  } finally {
    loadingPage.value = false
  }
})

function onAddFile(error, fileItem) {
  if (error) return
  imageFile.value = fileItem.file
  delete errors.image
}

function onRemoveFile() {
  imageFile.value = null
}

function cancelImageChange() {
  showFilePond.value = false
  imageFile.value = null
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  let valid = true

  if (!name.value || name.value.trim().length < 3) {
    errors.name = 'Nome e obrigatorio (minimo 3 caracteres).'
    valid = false
  }
  if (!description.value || description.value.trim().length < 3) {
    errors.description = 'Descricao e obrigatoria (minimo 3 caracteres).'
    valid = false
  }
  if (price.value === null || price.value === '' || Number(price.value) < 0) {
    errors.price = 'Preco e obrigatorio e deve ser maior ou igual a zero.'
    valid = false
  }
  if (stock.value === null || stock.value === '' || Number(stock.value) < 0) {
    errors.stock = 'Estoque e obrigatorio e deve ser maior ou igual a zero.'
    valid = false
  }
  if (!currentImageUrl.value && !imageFile.value) {
    errors.image = 'Imagem do produto e obrigatoria.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return

  loading.value = true
  try {
    const payload = {
      name: name.value.trim(),
      description: description.value.trim(),
      price: Number(price.value),
      stock: Number(stock.value),
      active: active.value ? 1 : 0,
    }

    if (imageFile.value) {
      payload.image = imageFile.value
    }

    await ProductService.update(productId, payload)
    alert('Produto atualizado com sucesso!')
    router.push({ name: 'produtos' })
  } catch (err) {
    console.error(err)
    if (err?.data?.errors) {
      const serverErrors = err.data.errors
      Object.keys(serverErrors).forEach(field => {
        errors[field] = serverErrors[field][0]
      })
    } else {
      const msg = err?.data?.message || err?.message || 'Erro ao atualizar o produto'
      alert(msg)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:deep(.filepond--root) {
  height: 100% !important;
}

:deep(.filepond--panel-root),
:deep(.filepond--panel) {
  height: 100% !important;
}
</style>
