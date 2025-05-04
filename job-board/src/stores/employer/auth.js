import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(null)
  
  // Mock API calls
  const api = {
    register: async (data) => {
      // In a real app, this would be an actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: Date.now().toString(),
            email: data.email,
            role: data.role,
            name: data.role === 'employer' ? 'New Employer' : 'New Candidate'
          }
          resolve(newUser)
        }, 500)
      })
    },
    
    resetPassword: async (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 500)
      })
    }
  }
  
  const register = async (formData) => {
    const userData = await api.register(formData)
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }
  
  const resetPassword = async (formData) => {
    await api.resetPassword(formData)
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    router.push('/login')
  }
  
  // Check if user is logged in on app load
  const loadUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }
  
  return { user, register, resetPassword, logout, loadUser }
})