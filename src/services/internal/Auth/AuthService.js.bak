// Deprecated thin wrapper—prefer using the auth store directly (useAuthStore)
// This module delegates to the Pinia auth store methods to avoid breaking
// existing imports elsewhere in the codebase.

import { useAuthStore } from '@/stores/auth'

export const AuthService = {
  async login(payload) {
    const auth = useAuthStore()
    // payload expected: { email, password }
    return auth.loginWithCredentials(payload)
  },

  async register(payload) {
    const auth = useAuthStore()
    // payload expected: { name, username, phone, email, password }
    return auth.registerWithCredentials(payload)
  },
}

export default AuthService
