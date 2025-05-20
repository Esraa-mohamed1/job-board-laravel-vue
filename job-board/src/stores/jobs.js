import { defineStore } from 'pinia';
import { jobs } from '@/utils/api';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobList: [],
    currentJob: null,
    loading: false,
    error: null,
  }),

  getters: {
    getJobs: (state) => state.jobList,
    getCurrentJob: (state) => state.currentJob,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  actions: {
    async fetchJobs() {
      this.loading = true;
      this.error = null;
      try {
        const response = await jobs.getAll();
        this.jobList = response.data;
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch jobs';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchJobById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await jobs.getById(id);
        this.currentJob = response.data;
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch job details';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createJob(jobData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await jobs.create(jobData);
        this.jobList.push(response.data);
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create job';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async applyForJob(jobId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await jobs.apply(jobId);
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to apply for job';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    }
  }
}); 