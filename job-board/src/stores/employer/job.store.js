import { defineStore } from 'pinia'
import { fetchJson, patchJson, putJson, postJson } from '@/utils/api'

const API_BASE = 'http://localhost:3000'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
    currentJob: null,
    loading: false,
    error: null
  }),

  actions: {
    async postJob(employerId, jobData) {
      this.loading = true
      try {
        const data = await postJson(`${API_BASE}/employers/${employerId}/jobs`, jobData)
        this.jobs.push(data)
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchJobs(employerId) {
      this.loading = true
      try {
        const data = await fetchJson(`${API_BASE}/employers/${employerId}/jobs`)
        this.jobs = data
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateJob(employerId, jobId, jobData) {
      this.loading = true
      try {
        const data = await putJson(`${API_BASE}/employers/${employerId}/jobs/${jobId}`, jobData)
        const index = this.jobs.findIndex(job => job.id === jobId)
        if (index !== -1) {
          this.jobs[index] = data
        }
        this.error = null
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteJob(employerId, jobId) {
      this.loading = true
      try {
        await fetchJson(`${API_BASE}/employers/${employerId}/jobs/${jobId}`, {
          method: 'DELETE'
        })
        this.jobs = this.jobs.filter(job => job.id !== jobId)
        this.error = null
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async getJobById(employerId, jobId) {
      this.loading = true
      try {
        const data = await fetchJson(`${API_BASE}/employers/${employerId}/jobs/${jobId}`)
        this.currentJob = data
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
    getJobs: (state) => state.jobs,
    getCurrentJob: (state) => state.currentJob,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
}) 