import { defineStore } from 'pinia';
import axios from 'axios';

export const useJobStore = defineStore('jobs', {
  state: () => ({
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    pendingJobs: [],
    approvedJobs: [],
    loading: false,
    error: null,
    currentJob: null
  }),
  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      
      try {
        // Fetch dashboard stats and pending jobs in parallel
        const [dashboardResponse, pendingResponse] = await Promise.all([
          axios.get('/dashboard'),
          axios.get('/job-posts?status=pending')
        ]);

        // Update counts
        this.pendingCount = dashboardResponse.data.pending_count || 0;
        this.approvedCount = dashboardResponse.data.approved_count || 0;
        this.rejectedCount = dashboardResponse.data.rejected_count || 0;
        
        // Update pending jobs
        this.pendingJobs = pendingResponse.data.map(job => this.formatJob(job));
        
        // Fetch recently approved jobs
        const approvedResponse = await axios.get('/job-posts?status=approved&limit=5');
        this.approvedJobs = approvedResponse.data.map(job => this.formatJob(job));
        
      } catch (error) {
        this.error = 'Failed to load dashboard data. Please try again later.';
        console.error('Error fetching dashboard data:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchJobDetails(jobId) {
      try {
        const response = await axios.get(`/job-posts/${jobId}`);
        this.currentJob = this.formatJob(response.data);
        return this.currentJob;
      } catch (error) {
        console.error('Error fetching job details:', error);
        throw error;
      }
    },

    async approveJob(jobId) {
      try {
        await axios.post(`/job-posts/${jobId}/approve`);
        
        // Update local state
        const jobIndex = this.pendingJobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
          const approvedJob = {...this.pendingJobs[jobIndex]};
          approvedJob.status = 'approved';
          approvedJob.dateApproved = new Date().toLocaleString();
          this.pendingJobs.splice(jobIndex, 1);
          this.approvedJobs.unshift(approvedJob);
          this.pendingCount--;
          this.approvedCount++;
        }
        
        return true;
      } catch (error) {
        console.error('Error approving job:', error);
        throw error;
      }
    },

    async rejectJob(jobId) {
      try {
        await axios.post(`/job-posts/${jobId}/reject`);
        
        // Update local state
        const jobIndex = this.pendingJobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
          this.pendingJobs.splice(jobIndex, 1);
          this.pendingCount--;
          this.rejectedCount++;
        }
        
        return true;
      } catch (error) {
        console.error('Error rejecting job:', error);
        throw error;
      }
    },

    formatJob(job) {
      return {
        id: job.id,
        title: job.title,
        company: job.company_name || job.company?.name || 'Unknown Company',
        companyInitial: (job.company_name || job.company?.name || 'U').charAt(0).toUpperCase(),
        logo: job.company_logo || job.company?.logo_url || null,
        logoBackground: this.generateColor(job.company_name || job.company?.name || 'Unknown'),
        location: job.location || 'Remote',
        salary: job.salary || job.salary_range || 'Not specified',
        datePosted: new Date(job.created_at).toLocaleString(),
        dateApproved: job.approved_at ? new Date(job.approved_at).toLocaleString() : null,
        status: job.status,
        description: job.description || 'No description provided'
      };
    },

    generateColor(string) {
      const hash = [...string].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return hsl(`${Math.abs(hash % 360)}, 70%, 80%`);
    }
  }
});