


import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const API_URL = 'http://localhost:3000'
  const user = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const resetToken = ref(null) // Add this line to store token in memory

  // ... (keep your existing register function)




  const register = async ({ email, password, role }) => {
    try {
      loading.value = true
      error.value = null
      
      // Generate unique ID
      const userId = Date.now().toString()
      
      // Create user record
      const response = await axios.post(`${API_URL}/users`, {
        id: userId,
        email,
        password, // Note: In production, hash this password!
        role,
        createdAt: new Date().toISOString()
      })
      
      // Set the current user
      user.value = {
        uid: userId,
        email,
        role
      }
      
      return user.value
      
    } catch (err) {
      error.value = err.response?.data?.message || 
                   err.message || 
                   'Registration failed. Please try again.'
      throw error.value
    } finally {
      loading.value = false
    }
  }




  const sendPasswordResetEmail = async (email) => {
    try {
      loading.value = true
      error.value = null
      
      // 1. Find user by email
      const { data: users } = await axios.get(`${API_URL}/users?email=${email}`)
      if (users.length === 0) {
        throw new Error("No user found with that email")
      }
      
      const user = users[0]
      
      // 2. Generate token (in real app use proper JWT)
      const token = `reset-${Date.now()}`
      resetToken.value = token // Store token in memory
      
      // 3. Update user with reset token (for demo using JSON Server)
      await axios.patch(`${API_URL}/users/${user.id}`, {
        resetToken: token
      })
      
      console.log('Reset token generated:', token) // Debug log
      
      return { success: true, token } // Return token for debugging
      
    } catch (err) {
      error.value = err.message || 'Failed to send reset email'
      throw error
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async ({ newPassword, confirmPassword, token }) => {
    try {
      loading.value = true
      error.value = null

      console.log('Received token:', token) // Debug log
      console.log('Stored token:', resetToken.value) // Debug log

      // 1. Validate passwords match
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords don't match")
      }

      // 2. Verify token exists
      if (!token) {
        throw new Error("Reset token is required")
      }

      // 3. Find user by token
      const { data: users } = await axios.get(`${API_URL}/users?resetToken=${token}`)
      if (users.length === 0) {
        throw new Error("Invalid or expired reset token")
      }

      const user = users[0]
      
      // 4. Update password and clear token
      await axios.patch(`${API_URL}/users/${user.id}`, {
        password: newPassword, // In real app, hash this password!
        resetToken: null
      })

      // Clear in-memory token
      resetToken.value = null
      
      return { success: true }
      
    } catch (err) {
      error.value = err.message || 'Password reset failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { 
    user, 
    error, 
    loading,
    resetToken, // Expose the token for debugging
    register,
    sendPasswordResetEmail,
    resetPassword
  }
})















