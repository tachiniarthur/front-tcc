import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}

    let token = localStorage.getItem('token')
    if (token) {
      // Strip BOM and non-ASCII characters that break XMLHttpRequest headers
      token = token.replace(/[^\x20-\x7E]/g, '')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
    }

    config.headers.Accept = config.headers.Accept || 'application/json'

    if (config.data instanceof FormData) {
      // Let the browser set Content-Type with the correct boundary
      delete config.headers['Content-Type']
    } else {
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    }

    return config
  },
  (err) => Promise.reject(err)
)

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data || null,
    }
    return Promise.reject(customError)
  }
)

export default http
