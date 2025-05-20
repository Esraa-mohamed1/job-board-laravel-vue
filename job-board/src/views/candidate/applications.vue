<template>
  <div class="applied-jobs-container">
    <div class="header">
      <h1>Applied Jobs ({{ totalApplications }})</h1>
    </div>

    <div class="jobs-table">
      <table>
        <thead>
          <tr>
            <th>JOB</th>
            <th>DATE APPLIED</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in paginatedJobs" :key="index">
            <td>
              <div class="job-info">
                <strong>{{ job.title }}</strong>
                <div class="job-details">
                  <span>{{ job.location }}</span>
                  <span>{{ job.salary }}</span>
                </div>
              </div>
            </td>
            <td>{{ job.dateApplied }}</td>
            <td>
              <span :class="['status-badge', { 'rejected': job.status.toLowerCase() === 'rejected' }]">
                <i class="fas fa-check"></i> {{ job.status }}
              </span>
            </td>
            <td>
              <button class="view-details-btn">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppliedJobs',
  data() {
    return {
      appliedJobs: [],
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    totalApplications() {
      return this.appliedJobs.length
    },
    totalPages() {
      return Math.ceil(this.appliedJobs.length / this.pageSize)
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.appliedJobs.slice(start, start + this.pageSize)
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('authToken');

    axios.get('http://127.0.0.1:8000/api/applications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const applications = response.data.applications;
      this.appliedJobs = applications.map(app => ({
        title: app.job?.title || `Job ID #${app.job_id}`,
        location: app.job?.location || 'Remote',
        salary: app.job?.salary || '$50k-80k/month',
        dateApplied: new Date(app.created_at).toLocaleString(),
        status: app.status
      }));
    })
    .catch(error => {
      console.error('Error fetching applications:', error);
    });
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.applied-jobs-container {
  font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.jobs-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
}

td {
  padding: 16px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

.job-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.job-info strong {
  font-weight: 600;
  color: #333;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: #666;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge.rejected {
  background-color: #ffebee;
  color: #c62828;
}

.status-badge i {
  font-size: 10px;
}

.view-details-btn {
  background-color: transparent;
  color: #0d6efd;
  border: 1px solid #0d6efd;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-details-btn:hover {
  background-color: #0d6efd;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .applied-jobs-container {
    padding: 15px;
  }

  th, td {
    padding: 10px 8px;
    font-size: 13px;
  }

  .job-info strong {
    font-size: 14px;
  }

  .job-details {
    font-size: 12px;
  }
}
</style>
