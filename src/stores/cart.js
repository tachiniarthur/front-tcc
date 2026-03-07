import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import CartService from '@/services/internal/Cart/CartService.js';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const loading = ref(false);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * parseFloat(item.product.price), 0)
  );

  async function fetchCart() {
    loading.value = true;
    try {
      const { data } = await CartService.getCart();
      items.value = data.items;
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
    } finally {
      loading.value = false;
    }
  }

  async function addToCart(productId, quantity = 1) {
    try {
      await CartService.addToCart(productId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Erro ao adicionar ao carrinho.';
      if (error.response?.status === 422) {
        alert(msg);
      }
      return { success: false, message: msg };
    }
  }

  async function updateQuantity(cartItemId, quantity) {
    try {
      await CartService.updateCartItem(cartItemId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Erro ao atualizar quantidade.';
      if (error.response?.status === 422) {
        alert(msg);
      }
      return { success: false, message: msg };
    }
  }

  async function removeItem(cartItemId) {
    try {
      await CartService.removeCartItem(cartItemId);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Erro ao remover item:', error);
      return { success: false };
    }
  }

  function clearCart() {
    items.value = [];
  }

  function getItemByProductId(productId) {
    return items.value.find((item) => item.product_id === productId);
  }

  function getAvailableStock(productId) {
    const item = items.value.find((i) => i.product_id === productId);
    return item ? item.available_stock : null;
  }

  return {
    items,
    loading,
    totalItems,
    totalPrice,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getItemByProductId,
    getAvailableStock,
  };
});
