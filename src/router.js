import { createRouter, createWebHistory } from "vue-router";
import AuthForm from "@/pages/auth/AuthForm.vue";
import Home from "@/pages/home/Home.vue";
import Product from "@/pages/home/Product.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: AuthForm,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: AuthForm,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: '/product/:id?',
    name: 'product',
    component: Product,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
