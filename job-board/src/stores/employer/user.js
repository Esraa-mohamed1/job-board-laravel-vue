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
      error.value = null
      
      const endpoint = profileData.role === 'employer' ? 'employers' : 'candidates'
      
      // Prepare the payload
      const payload = {
        id: profileData.userId,
        userId: profileData.userId,
        fullName: profileData.fullName,
        email: profileData.email,
        role: profileData.role,
        ...(profileData.profilePhoto && { profilePhoto: profileData.profilePhoto }),
        ...(profileData.role === 'employer' && { 
          companyName: profileData.companyName 
        }),
        createdAt: new Date().toISOString()
      }
      
      const response = await axios.post(`${API_URL}/${endpoint}`, payload)
      profile.value = response.data
      return profile.value
      
    } catch (err) {
      error.value = err.response?.data?.message || 
                   err.message || 
                   'Profile creation failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }


  return { profile, error, loading, createProfile }
})









