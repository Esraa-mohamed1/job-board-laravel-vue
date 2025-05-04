import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const API_URL = 'http://localhost:3000'
  const profile = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const createProfile = async (profileData) => {
    try {
      loading.value = true
      
      // Determine endpoint based on role
      const endpoint = profileData.role === 'employer' ? 'employers' : 'candidates'
      
      // Create profile
      await axios.post(`${API_URL}/${endpoint}`, {
        ...profileData,
        id: profileData.userId,
        createdAt: new Date().toISOString()
      })
      
    } catch (err) {
      error.value = err.response?.data || 'Profile creation failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return { profile, error, loading, createProfile }
})