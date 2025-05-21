import { defineStore } from 'pinia'
import { fetchJson, patchJson, putJson } from '@/utils/api'

const API_BASE = 'http://localhost:3000'

export const useEmployerStore = defineStore('employer', {
  state: () => ({
    profile: {
      companyInfo: {},
      foundingInfo: {},
      socialMedia: {},
      contactInfo: {}
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchProfile(employerId) {
      this.loading = true
      try {
        const data = await fetchJson(`${API_BASE}/employers/${employerId}`)
        this.profile = data
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async saveProfileStep(employerId, stepName, stepData) {
      this.loading = true
      try {
        const data = await patchJson(`${API_BASE}/employers/${employerId}`, {
          [stepName]: stepData
        })
        this.profile[stepName] = data[stepName]
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async completeProfile(employerId) {
      this.loading = true
      try {
        const data = await fetchJson(`${API_BASE}/employers/${employerId}`)
        this.profile = data
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = (event) => {
          const base64String = event.target.result
          resolve(base64String)
        }
        
        reader.onerror = (error) => {
          reject(new Error('Failed to read image file'))
        }
        
        reader.readAsDataURL(file)
      })
    },

    async saveProfileStep(employerId, stepName, stepData) {
      this.loading = true
      try {
        if (stepName === 'companyInfo' && stepData.logo instanceof File) {
          stepData.logo = await this.uploadImage(stepData.logo)
        }
        if (stepName === 'companyInfo' && stepData.banner instanceof File) {
          stepData.banner = await this.uploadImage(stepData.banner)
        }

        const data = await patchJson(`${API_BASE}/employers/${employerId}`, {
          [stepName]: stepData
        })
        
        this.profile[stepName] = data[stepName]
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getProfile: (state) => state.profile,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})