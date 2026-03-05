<script setup>
import Header from '@/components/home/HeaderComponent.vue'
import Footer from '@/components/home/FooterComponent.vue'
import CartDrawer from '@/components/home/CartDrawerComponent.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div v-if="auth.isLogged">
    <Header />
    <CartDrawer />
    <router-view />
    <Footer />
  </div>

  <div v-else>
    <router-view />
  </div>
</template>
