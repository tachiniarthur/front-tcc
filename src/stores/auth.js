import { defineStore } from 'pinia'
import http from '@/services/http'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),

  getters: {
    isLogged: (state) => !!state.token,
  },

  actions: {
    setToken(token) {
      this.token = token

      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    setUser(user) {
      this.user = user
    },

    async loginWithCredentials({ email, password }) {
      
      const payload = { email, password }

      const res = await http.post('/login', payload)

      const token = res.data?.token ?? (typeof res.data === 'string' ? res.data : null)
      if (!token) throw new Error('Token não retornado pelo servidor')

      this.setToken(token)

      
      try {
        const userRes = await http.get('/api/user')
        this.setUser(userRes.data)
      } catch (e) {
        // Log and continue — user info isn't critical for completing login flow
  // (keeps linter happy and avoids silently swallowing errors)
  console.warn('Failed to fetch current user after login:', e)
      }

      router.push({ name: 'Inicio' })
    },

    async registerWithCredentials(data) {
      
      
      const res = await http.post('/create-account', data)

      const token = res.data?.token ?? null
      const user = res.data?.user ?? null

      if (token) {
        this.setToken(token)
      }

      if (user) {
        this.setUser(user)
      } else {
        
        try {
          const userRes = await http.get('/api/user')
          this.setUser(userRes.data)
        } catch (e) {
          console.warn('Failed to fetch current user after register:', e)
        }
      }

      router.push({ name: 'Inicio' })
    },

    async logout() {
      
      try {
        await http.post('/logout')
      } catch (e) {
        // logout on server failed or endpoint missing — proceed client-side
        console.warn('Server logout failed (ignoring):', e)
      }

      this.setToken(null)
      this.setUser(null)
      router.push({ name: 'Entrar' })
    },

    async checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) {
        this.setToken(null)
        this.setUser(null)
        return false
      }

      this.token = token

      try {
        const userRes = await http.get('/api/user')
        this.user = userRes.data
      } catch (e) {
        console.warn('Auth check failed, clearing token:', e)

        this.setToken(null)
        this.setUser(null)
        return false
      }

      return true
    },
  },
})
