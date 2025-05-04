// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const API_BASE = 'http://localhost:3000' // Your JSON Server URL

  const initProfile = async ({ id, email, role }) => {
    try {
      loading.value = true
      
      // Check if user already exists
      const existingUser = await getUserById(id)
      if (existingUser) {
        profile.value = existingUser
        return existingUser
      }

      // Create new user
      const response = await axios.post(`${API_BASE}/users`, {
        id,
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      profile.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createProfile = async (profileData) => {
    try {
      loading.value = true
      
      // Update user data
      await axios.patch(`${API_BASE}/users/${profileData.userId}`, {
        fullName: profileData.fullName,
        profilePhoto: profileData.profilePhoto,
        updatedAt: new Date().toISOString()
      })

      // Create employer or candidate profile
      const profileType = profileData.role === 'employer' ? 'employers' : 'candidates'
      await axios.post(`${API_BASE}/${profileType}`, {
        ...profileData,
        id: profileData.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      // Update local profile
      profile.value = { ...profile.value, ...profileData }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}`)
      return response.data
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null // User not found
      }
      throw err
    }
  }

  const userExists = async (userId) => {
    const user = await getUserById(userId)
    return user !== null
  }

  return { profile, loading, error, initProfile, createProfile, userExists, getUserById }
})