import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter()
  const API_BASE = 'http://localhost:3000'

  const register = async ({ email, password, role }) => {
    try {
      loading.value = true
      
      // Generate a simple ID (in production, use a proper ID generator)
      const userId = Date.now().toString()
      
      // Create user in JSON Server
      const response = await axios.post(`${API_BASE}/users`, {
        id: userId,
        email,
        password, // Note: In production, hash this password!
        role,
        createdAt: new Date().toISOString()
      })
      
      // Set the user data
      user.value = {
        uid: userId,
        email,
        role
      }
      
      return user.value
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return { user, loading, error, register }
})