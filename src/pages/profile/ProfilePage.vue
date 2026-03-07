<template>
  <div class="min-h-screen pt-24 pb-16 px-4">
    <div class="max-w-xl mx-auto">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p class="text-gray-400 text-sm">Carregando perfil...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 text-sm mb-4">{{ error }}</p>
        <button @click="fetchUser" class="text-sm text-black underline hover:no-underline transition">
          Tentar novamente
        </button>
      </div>

      <!-- Profile -->
      <template v-else-if="user">
        <!-- Avatar + Name -->
        <div class="flex flex-col items-center mb-10">
          <div
            class="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-light mb-4"
            aria-hidden="true">
            {{ initials }}
          </div>
          <h1 class="text-2xl font-light tracking-wide">{{ user.name }}</h1>
          <p class="text-gray-400 text-sm mt-1">@{{ user.username || '' }}</p>
        </div>

        <!-- View Mode -->
        <div v-if="!editing" class="border border-gray-200 divide-y divide-gray-200">
          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">Nome</span>
            <span class="text-sm text-gray-800">{{ user.name }}</span>
          </div>

          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">Username</span>
            <span class="text-sm text-gray-800">{{ user.username || '—' }}</span>
          </div>
          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">Telefone</span>
            <span class="text-sm text-gray-800">{{ user.phone || '—' }}</span>
          </div>
          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">E-mail</span>
            <span class="text-sm text-gray-800">{{ user.email }}</span>
          </div>
        </div>

        <!-- Edit Mode -->
        <form v-else @submit.prevent="saveProfile" class="border border-gray-200 divide-y divide-gray-200">
          <div class="flex items-center justify-between px-6 py-4 gap-4">
            <label for="edit-name" class="text-xs tracking-widest text-gray-400 uppercase shrink-0">Nome</label>
            <input id="edit-name" v-model="form.name" type="text" required minlength="3" maxlength="255"
              class="text-sm text-gray-800 text-right bg-transparent border-b border-gray-300 focus:border-black outline-none py-1 w-full max-w-[280px] transition" />
          </div>
          <p v-if="errors.name" class="text-red-500 text-xs px-6 pb-2">{{ errors.name }}</p>

          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">Username</span>
            <span class="text-sm text-gray-500 italic">{{ user.username || '—' }}</span>
          </div>

          <div class="flex items-center justify-between px-6 py-4 gap-4">
            <label for="edit-phone" class="text-xs tracking-widest text-gray-400 uppercase shrink-0">Telefone</label>
            <input id="edit-phone" v-model="form.phone" type="text" maxlength="20"
              class="text-sm text-gray-800 text-right bg-transparent border-b border-gray-300 focus:border-black outline-none py-1 w-full max-w-[280px] transition" />
          </div>
          <p v-if="errors.phone" class="text-red-500 text-xs px-6 pb-2">{{ errors.phone }}</p>

          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-xs tracking-widest text-gray-400 uppercase">E-mail</span>
            <span class="text-sm text-gray-500 italic">{{ user.email }}</span>
          </div>
        </form>

        <!-- Success message -->
        <p v-if="successMsg" class="text-green-600 text-sm text-center mt-3">{{ successMsg }}</p>

        <!-- Order Buttons -->
        <div v-if="!editing" class="mt-6 flex flex-col gap-3">
          <RouterLink v-if="!auth.isAdmin" to="/orders">
            <button class="w-full h-12 text-sm font-semibold tracking-wide border border-gray-300 text-gray-600 hover:bg-gray-100 transition hover:cursor-pointer">
              MEUS PEDIDOS
            </button>
          </RouterLink>
          <RouterLink v-if="auth.isAdmin" to="/admin/orders">
            <button class="w-full h-12 text-sm font-semibold tracking-wide border border-gray-300 text-gray-600 hover:bg-gray-100 transition hover:cursor-pointer">
              GERENCIAR PEDIDOS
            </button>
          </RouterLink>
        </div>

        <!-- Action Buttons -->
        <div v-if="!editing" class="mt-3 flex flex-col gap-3">
          <button @click="startEditing"
            class="w-full h-12 text-sm font-semibold tracking-wide border border-black text-black hover:bg-gray-100 transition">
            EDITAR PERFIL
          </button>
          <button @click="handleLogout" :disabled="loggingOut"
            class="w-full h-12 text-sm font-semibold tracking-wide bg-black text-white hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loggingOut ? 'Saindo...' : 'SAIR DA CONTA' }}
          </button>
        </div>

        <div v-else class="mt-6 flex flex-col gap-3">
          <button type="button" @click="saveProfile" :disabled="saving"
            class="w-full h-12 text-sm font-semibold tracking-wide bg-black text-white hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ saving ? 'Salvando...' : 'SALVAR' }}
          </button>
          <button type="button" @click="cancelEditing" :disabled="saving"
            class="w-full h-12 text-sm font-semibold tracking-wide border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50">
            CANCELAR
          </button>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import http from '@/services/http'

const auth = useAuthStore()

const user = ref(null)
const loading = ref(true)
const error = ref(null)
const loggingOut = ref(false)
const editing = ref(false)
const saving = ref(false)
const successMsg = ref('')
const errors = reactive({ name: '', phone: '' })

const form = reactive({ name: '', phone: '' })

const initials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
})

async function fetchUser() {
  loading.value = true
  error.value = null
  try {
    const res = await http.get('/user')
    user.value = res.data
    auth.setUser(res.data)
  } catch {
    error.value = 'Não foi possível carregar os dados do perfil.'
  } finally {
    loading.value = false
  }
}

function startEditing() {
  form.name = user.value.name || ''
  form.phone = user.value.phone || ''
  errors.name = ''
  errors.phone = ''
  successMsg.value = ''
  editing.value = true
}

function cancelEditing() {
  editing.value = false
  errors.name = ''
  errors.phone = ''
}

function validate() {
  let valid = true
  errors.name = ''
  errors.phone = ''

  if (!form.name || form.name.trim().length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres.'
    valid = false
  }

  if (form.phone && form.phone.trim().length > 20) {
    errors.phone = 'O telefone deve ter no máximo 20 caracteres.'
    valid = false
  }

  return valid
}

async function saveProfile() {
  if (!validate()) return

  saving.value = true
  successMsg.value = ''
  try {
    const res = await http.put('/user', {
      name: form.name.trim(),
      phone: form.phone?.trim() || null,
    })
    user.value = res.data
    auth.setUser(res.data)
    editing.value = false
    successMsg.value = 'Perfil atualizado com sucesso!'
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (e) {
    const serverErrors = e?.data?.errors
    if (serverErrors) {
      errors.name = serverErrors.name?.[0] || ''
      errors.phone = serverErrors.phone?.[0] || ''
    } else {
      const msg = e?.data?.message || 'Erro ao salvar perfil.'
      alert(msg)
    }
  } finally {
    saving.value = false
  }
}

async function handleLogout() {
  loggingOut.value = true
  await auth.logout()
}

onMounted(fetchUser)
</script>
