import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    getters: {
        totalItems: (state) => state.items.reduce((s, i) => s + i.qty, 0),
        totalPrice: (state) => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    },
    actions: {
        addToCart(product) {
            const existing = this.items.find((i) => i.id === product.id)
            if (existing) {
                existing.qty += 1
            } else {
                this.items.push({ ...product, qty: 1 })
            }
        },
        removeFromCart(productId) {
            this.items = this.items.filter((i) => i.id !== productId)
        },
        updateQuantity(productId, qty) {
            const item = this.items.find((i) => i.id === productId)
            if (!item) return
            item.qty = Math.max(1, qty)
        },
        clearCart() {
            this.items = []
        },
    },
})
