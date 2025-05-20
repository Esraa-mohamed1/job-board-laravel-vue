import { defineStore } from "pinia";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export const useJobStore = defineStore("job", {
  state: () => ({
    pendingJobs: [],
    approvedJobs: [],
    rejectedJobs: [],
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    currentJob: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDashboardData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/admin/job-moderation");
        if (!response.data) {
          console.error("API response is missing data:", response);
          throw new Error("API response is missing data");
        }

        const data = response.data;
        console.log("Received data from API:", data);

        // Temporary mock for rejected_jobs
        data.rejected_jobs = data.rejected_jobs || [
          {
            id: 3,
            user_id: 7,
            category_id: 4,
            title: "Data Scientist",
            job_type: "",
            company: "Analytix",
            location: "Boston, MA",
            salary: "$110,000 - $140,000",
            description: "Analytix is looking for a Data Scientist...",
            created_at: "2025-05-05T10:15:00.000000Z",
            updated_at: "2025-05-20T06:12:39.000000Z",
            status: "rejected",
            rejection_reason: null,
          },
          {
            id: 4,
            user_id: 2,
            category_id: 3,
            title: "UX/UI Designer",
            job_type: "Contract",
            company: "Creative Digital",
            location: "New York, NY",
            salary: "$90,000 - $120,000",
            description:
              "Creative Digital is seeking a talented UX/UI Designer...",
            created_at: "2025-05-07T16:30:00.000000Z",
            updated_at: "2025-05-20T06:30:02.000000Z",
            status: "rejected",
            rejection_reason: null,
          },
          {
            id: 7,
            user_id: 8,
            category_id: 2,
            title: "Mobile Developer (iOS)",
            job_type: "",
            company: "AppWorks",
            location: "Seattle, WA",
            salary: "$125,000 - $155,000",
            description: "AppWorks is looking for an iOS Developer...",
            created_at: "2025-05-15T14:20:00.000000Z",
            updated_at: "2025-05-20T07:18:40.000000Z",
            status: "rejected",
            rejection_reason: null,
          },
        ];

        this.pendingJobs = Array.isArray(data.pending_jobs)
          ? data.pending_jobs.map((job) => ({
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
              salary: this.formatSalary(job.salary),
              datePosted: this.formatDate(job.created_at),
              description: job.description,
              status: job.status,
            }))
          : [];

        this.approvedJobs = Array.isArray(data.approved_jobs)
          ? data.approved_jobs.map((job) => ({
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
              salary: this.formatSalary(job.salary),
              datePosted: this.formatDate(job.created_at),
              dateApproved: this.formatDate(job.updated_at),
              description: job.description,
              status: job.status,
            }))
          : [];

        this.rejectedJobs = Array.isArray(data.rejected_jobs)
          ? data.rejected_jobs.map((job) => ({
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
              salary: this.formatSalary(job.salary),
              datePosted: this.formatDate(job.created_at),
              dateRejected: this.formatDate(job.updated_at),
              description: job.description,
              status: job.status,
              rejection_reason: job.rejection_reason || "No reason provided",
            }))
          : [];

        this.pendingCount = data.pending_count || 0;
        this.approvedCount = data.approved_count || 0;
        this.rejectedCount = data.rejected_count || 0;
      } catch (error) {
        console.error("Error in fetchDashboardData:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard data";
        this.pendingJobs = [];
        this.approvedJobs = [];
        this.rejectedJobs = [];
        this.pendingCount = 0;
        this.approvedCount = 0;
        this.rejectedCount = 0;
      } finally {
        this.loading = false;
      }
    },

    async fetchJobDetails(jobId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/admin/job/${jobId}`);
        const job = response.data.data;
        this.currentJob = {
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: this.formatSalary(job.salary),
          datePosted: this.formatDate(job.created_at),
          dateApproved:
            job.status === "approved" ? this.formatDate(job.updated_at) : null,
          dateRejected:
            job.status === "rejected" ? this.formatDate(job.updated_at) : null,
          description: job.description,
          status: job.status,
        };
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch job details";
        console.error("Error fetching job details:", error);
      } finally {
        this.loading = false;
      }
    },

    async approveJob(jobId) {
      this.loading = true;
      this.error = null;
      try {
        await api.post(`/admin/job/${jobId}/approve`);
        await this.fetchDashboardData();
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to approve job";
        console.error("Error approving job:", error);
      } finally {
        this.loading = false;
      }
    },

    async rejectJob(jobId) {
      this.loading = true;
      this.error = null;
      try {
        await api.post(`/admin/job/${jobId}/reject`);
        await this.fetchDashboardData();
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to reject job";
        console.error("Error rejecting job:", error);
      } finally {
        this.loading = false;
      }
    },

    // Helper methods
    formatSalary(salary) {
      if (!salary) return "Not specified";
      if (typeof salary !== "string") return salary;

      try {
        const parts = salary.split(" - ");
        if (parts.length === 2) {
          return `$${parts[0].replace(/\$/g, "")} - $${parts[1].replace(
            /\$/g,
            ""
          )}/year`;
        }
        return salary;
      } catch {
        return salary;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
});
