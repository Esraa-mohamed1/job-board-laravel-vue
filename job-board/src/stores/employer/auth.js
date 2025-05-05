import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const API_URL = 'http://localhost:3000'
  const user = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const register = async ({ email, password, role }) => {
    try {
      loading.value = true
      
      // Create user ID
      const userId = Date.now().toString()
      
      // 1. Create user record
      await axios.post(`${API_URL}/users`, {
        id: userId,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      })
      
      // Return minimal user data
      return { 
        uid: userId,
        email,
        role
      }
      
    } catch (err) {
      error.value = err.response?.data || 'Registration failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return { user, error, loading, register }
})