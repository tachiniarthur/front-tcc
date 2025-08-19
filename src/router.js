import { createRouter, createWebHistory } from "vue-router";
import AuthForm from "@/pages/auth/AuthForm.vue";
import Home from "@/pages/home/Home.vue";

const routes = [
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
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
