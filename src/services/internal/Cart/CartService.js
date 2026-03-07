import http from '@/services/http';

export default {
  getCart() {
    return http.get('/cart');
  },

  addToCart(productId, quantity = 1) {
    return http.post('/cart', { product_id: productId, quantity });
  },

  updateCartItem(cartItemId, quantity) {
    return http.put(`/cart/${cartItemId}`, { quantity });
  },

  removeCartItem(cartItemId) {
    return http.delete(`/cart/${cartItemId}`);
  },

  getProducts() {
    return http.get('/products');
  },

  getProduct(productId) {
    return http.get(`/products/${productId}`);
  },
};
