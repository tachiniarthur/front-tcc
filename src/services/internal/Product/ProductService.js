import http from '@/services/http'

export const ProductService = {
  async list() {
    const res = await http.get('/products')
    return res.data
  },

  async get(id) {
    const res = await http.get('/products/' + id)
    return res.data
  },

  async create(data) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value)
      }
    })
    const res = await http.post('/products', formData)
    return res.data
  },

  async update(id, data) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value)
      }
    })
    const res = await http.post('/products/' + id, formData)
    return res.data
  },

  async remove(id) {
    await http.delete('/products/' + id)
  },
}

export default ProductService
