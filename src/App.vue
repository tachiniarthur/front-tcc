<script setup>
import Header from '@/components/home/Header.vue'
import Footer from './components/home/Footer.vue';

const isLoggedIn = true;
</script>

<template>
  <div v-if="isLoggedIn">
    <Header />
      <router-view />
    <Footer />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
