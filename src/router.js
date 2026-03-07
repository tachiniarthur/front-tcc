import { createRouter, createWebHistory } from "vue-router";
import AuthForm from "@/pages/auth/AuthPage.vue";
import Home from "@/pages/home/HomePage.vue";
import ForgetPassword from "@/pages/auth/ForgetPassword.vue";
import { useAuthStore } from "@/stores/auth";
import ProductListPage from "./pages/products/ProductListPage.vue";
import ProductPage from "@/pages/products/ProductPage.vue";
import NewProductPage from "@/pages/products/NewProductPage.vue";
import EditProductPage from "@/pages/products/EditProductPage.vue";
import Checkout from "@/pages/checkout/CheckoutPage.vue";
import Profile from "@/pages/profile/ProfilePage.vue";
import OrdersPage from "@/pages/orders/OrdersPage.vue";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Entrar",
    component: AuthForm,
  },
  {
    path: "/signup",
    name: "Cadastrar",
    component: AuthForm,
  },
  {
    path: "/forget-password",
    name: "Esqueceu a senha",
    component: ForgetPassword,
  },
  {
    path: "/logout",
    name: "Sair",
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      auth.logout();
      next("/login");
    },
  },
  {
    path: "/home",
    name: "Inicio",
    component: Home,
  },
  {
    path: "/products",
    name: "produtos",
    component: ProductListPage,
  },
  {
    path: "/products/:id",
    name: "produto",
    component: ProductPage,
  },
  {
    path: "/add-product",
    name: "add-product",
    component: NewProductPage,
  },
  {
    path: "/edit-product/:id",
    name: "edit-product",
    component: EditProductPage,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/profile",
    name: "Perfil",
    component: Profile,
  },
  {
    path: "/orders",
    name: "pedidos",
    component: OrdersPage,
  },
  {
    path: "/admin/orders",
    name: "admin-pedidos",
    component: AdminOrdersPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (["/login", "/signup", "/forget-password"].includes(to.path)) {
    if (auth.isLogged) return next("/home");
    return next();
  }

  if (!auth.isLogged) {
    return next("/login");
  }

  return next();
});

export default router;
