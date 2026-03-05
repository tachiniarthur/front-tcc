import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  
})

http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}

    
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    
    config.headers.Accept = config.headers.Accept || 'application/json'

    
    if (!(config.data instanceof FormData)) {
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
