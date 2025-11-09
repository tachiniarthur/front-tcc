<template>
  <div class="min-h-screen flex">
    <!-- Left Panel -->
    <div
      class="relative w-full max-w-md bg-gradient-to-br from-black via-black to-black flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-gray-900/10"></div>

      <div class="text-center z-[1] text-white">
        <h1 class="text-6xl font-bold mb-4 tracking-wide">
          {{ isSignUp ? "SIGN UP" : "LOGIN" }}
        </h1>
        <p class="text-xl opacity-90 font-light">
          {{ isSignUp ? "CREATE ACCOUNT" : "SIGN IN" }}
        </p>
      </div>

      <!-- Decorative shapes com escalas -->
      <div class="absolute top-28 left-20 w-32 h-32 bg-gray-100 rounded-full blur-sm"></div>
      <div class="absolute bottom-20 right-20 w-24 h-24 bg-secondary-100 rounded-lg rotate-45 blur-sm"></div>
    </div>

    <!-- Right Panel -->
    <div class="flex-1 bg-white text-gray-900 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <GeometricLogo />
          <h2 class="text-3xl font-bold mt-3 text-gray-900">
            {{ isSignUp ? "SIGN UP" : "LOGIN" }}
          </h2>
        </div>

        <!-- Form -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <template v-if="isSignUp">
            <!-- Full Name -->
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium text-black">Full Name</label>
              <div class="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  v-model="formData.name"
                  class="pl-4 h-12 w-full outline-none bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label for="phone" class="text-sm font-medium text-black">Phone Number</label>
              <div class="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  v-model="formData.phone"
                  class="pl-4 h-12 w-full outline-none bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>
          </template>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-black">Email</label>
            <div class="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                v-model="formData.email"
                class="pl-4 h-12 w-full outline-none bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-black">Password</label>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                v-model="formData.password"
                class="pl-4 pr-10 h-12 w-full outline-none bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-500 transition-colors"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-black hover:text-gray-900 transition-colors"
                aria-label="Toggle password visibility"
              >
                <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>

          <!-- Confirm Password (SignUp only) -->
          <template v-if="isSignUp">
            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium text-black">Confirm Password</label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  v-model="formData.confirmPassword"
                  class="pl-4 pr-10 h-12 w-full outline-none bg-transparent border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-500 transition-colors"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-3 text-black hover:text-gray-900 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <font-awesome-icon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" />
                </button>
              </div>
            </div>
          </template>

          <!-- Forgot password (Login only) -->
          <div v-if="!isSignUp" class="text-right">
            <button type="button" class="text-secondary-600 hover:text-secondary-700 text-sm transition-colors">
              Forgot Password?
            </button>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full h-10 text-md font-semibold bg-black text-white hover:bg-gray-900 transition"
          >
            {{ isSignUp ? "SIGN UP" : "LOGIN" }}
          </button>

          <!-- Switch mode -->
          <div class="text-center">
            <span class="text-black/80 text-sm">
              {{ isSignUp ? "Already have an account?" : "Don’t have an account?" }}
            </span>
            <button
              type="button"
              @click="switchMode"
              class="ml-2 text-gray-600 hover:text-black font-medium text-sm transition-colors hover:cursor-pointer hover:underline"
            >
              {{ isSignUp ? "Sign In" : "Sign Up" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import GeometricLogo from "@/components/auth/GeometricLogo.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isSignUp = ref(route.name === "SignUp");
watch(() => route.name, (n) => { isSignUp.value = n === "SignUp"; });

function switchMode() {
  router.push({ name: isSignUp.value ? "Login" : "SignUp" });
}

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const formData = reactive({ name: "", phone: "", email: "", password: "", confirmPassword: "" });

function handleSubmit() {
  if (isSignUp.value) {
    console.log("Cadastro realizado com:", formData);
  } else {
    console.log("Login realizado com:", formData);
    router.push({ name: "Home" });
  }
}
</script>
