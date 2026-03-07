import http from '@/services/http'

export const OrderService = {
  async create(items) {
    const res = await http.post('/orders', { items })
    return res.data
  },

  async list() {
    const res = await http.get('/orders')
    return res.data
  },

  async listAll() {
    const res = await http.get('/admin/orders')
    return res.data
  },

  async updateStatus(orderId, status) {
    const res = await http.patch(`/admin/orders/${orderId}/status`, { status })
    return res.data
  },
}

export default OrderService