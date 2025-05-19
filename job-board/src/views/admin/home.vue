<template>
  <div class="admin-dashboard">
    <!-- Loading overlay -->
    <div v-if="jobStore.loading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <!-- Error message -->
    <div v-if="jobStore.error" class="alert alert-danger mx-3 mt-3">
      {{ jobStore.error }}
      <button @click="jobStore.fetchDashboardData" class="btn btn-sm btn-outline-danger ms-2">
        Retry
      </button>
    </div>
    
    <div class="row g-0">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-2 sidebar">
        <div class="p-3 text-center border-bottom">
          <h5 class="fw-bold">ADMIN DASHBOARD</h5>
        </div>
        <ul class="nav flex-column mt-2">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link" :class="{ active: $route.path === '/admin' }">
              <i class="fas fa-tachometer-alt me-2"></i> Overview
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/pending" class="nav-link" :class="{ active: $route.path === '/admin/pending' }">
              <i class="fas fa-clipboard-list me-2"></i> Pending Jobs
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/approved" class="nav-link" :class="{ active: $route.path === '/admin/approved' }">
              <i class="fas fa-check-circle me-2"></i> Approved Jobs
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/rejected" class="nav-link" :class="{ active: $route.path === '/admin/rejected' }">
              <i class="fas fa-times-circle me-2"></i> Rejected Jobs
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/settings" class="nav-link" :class="{ active: $route.path === '/admin/settings' }">
              <i class="fas fa-cog me-2"></i> Settings
            </router-link>
          </li>
        </ul>
        <div class="mt-auto p-3 border-top log-out-section">
          <a href="#" class="nav-link text-secondary" @click.prevent="logout">
            <i class="fas fa-sign-out-alt me-2"></i> Log-out
          </a>
        </div>
      </div>

      <!-- Main content -->
      <div class="col-md-9 col-lg-10 ms-auto main-content">
        <div class="container-fluid py-4">
          <h3 class="mb-3">Hello, Admin User</h3>
          <p class="text-secondary mb-4">Here is your job moderation dashboard</p>

          <!-- Stats cards -->
          <div class="row mb-4">
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ jobStore.pendingCount }}</h2>
                    <div class="text-secondary">Pending Jobs</div>
                  </div>
                  <div class="stat-icon pending-icon">
                    <i class="fas fa-hourglass-half"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ jobStore.approvedCount }}</h2>
                    <div class="text-secondary">Approved Jobs</div>
                  </div>
                  <div class="stat-icon approved-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ jobStore.rejectedCount }}</h2>
                    <div class="text-secondary">Rejected Jobs</div>
                  </div>
                  <div class="stat-icon rejected-icon">
                    <i class="fas fa-times-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending jobs table -->
          <div class="card mb-4">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Jobs Pending Review</h5>
              <div class="view-all">
                <router-link to="/admin/pending" class="text-primary">
                  View all <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Date Posted</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="job in jobStore.pendingJobs.slice(0, 5)" :key="job.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="company-logo me-3" :style="{ backgroundColor: job.logoBackground }">
                            <img :src="job.logo" alt="Company Logo" v-if="job.logo">
                            <span v-else>{{ job.companyInitial }}</span>
                          </div>
                          <div>{{ job.title }}</div>
                        </div>
                      </td>
                      <td>{{ job.company }}</td>
                      <td>
                        <i class="fas fa-map-marker-alt me-1 text-secondary"></i>
                        {{ job.location }}
                      </td>
                      <td>
                        <i class="fas fa-dollar-sign me-1 text-secondary"></i>
                        {{ job.salary }}
                      </td>
                      <td>{{ job.datePosted }}</td>
                      <td>
                        <span class="badge bg-warning">Pending</span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <button class="btn btn-sm btn-outline-secondary" @click="viewJobDetails(job.id)">
                            View
                          </button>
                          <button class="btn btn-sm btn-success" @click="approveJob(job.id)">
                            <i class="fas fa-check"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="rejectJob(job.id)">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="jobStore.pendingJobs.length === 0">
                      <td colspan="7" class="text-center py-4 text-muted">
                        No pending jobs to review
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Approved jobs table -->
          <div class="card">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Recently Approved Jobs</h5>
              <div class="view-all">
                <router-link to="/admin/approved" class="text-primary">
                  View all <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Date Approved</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="job in jobStore.approvedJobs" :key="job.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="company-logo me-3" :style="{ backgroundColor: job.logoBackground }">
                            <img :src="job.logo" alt="Company Logo" v-if="job.logo">
                            <span v-else>{{ job.companyInitial }}</span>
                          </div>
                          <div>{{ job.title }}</div>
                        </div>
                      </td>
                      <td>{{ job.company }}</td>
                      <td>
                        <i class="fas fa-map-marker-alt me-1 text-secondary"></i>
                        {{ job.location }}
                      </td>
                      <td>
                        <i class="fas fa-dollar-sign me-1 text-secondary"></i>
                        {{ job.salary }}
                      </td>
                      <td>{{ job.dateApproved }}</td>
                      <td>
                        <span class="badge bg-success">Approved</span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline-secondary" @click="viewJobDetails(job.id)">
                          View Details
                        </button>
                      </td>
                    </tr>
                    <tr v-if="jobStore.approvedJobs.length === 0">
                      <td colspan="7" class="text-center py-4 text-muted">
                        No approved jobs yet
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Details Modal -->
    <div class="modal fade" id="jobDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ jobStore.currentJob?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="jobStore.currentJob">
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="company-logo-lg mb-3" :style="{ backgroundColor: jobStore.currentJob.logoBackground }">
                    <img :src="jobStore.currentJob.logo" v-if="jobStore.currentJob.logo">
                    <span v-else>{{ jobStore.currentJob.companyInitial }}</span>
                  </div>
                  <h4>{{ jobStore.currentJob.company }}</h4>
                  <div class="text-muted mb-2">
                    <i class="fas fa-map-marker-alt me-1"></i>
                    {{ jobStore.currentJob.location }}
                  </div>
                  <div class="text-muted mb-2">
                    <i class="fas fa-dollar-sign me-1"></i>
                    {{ jobStore.currentJob.salary }}
                  </div>
                  <div class="text-muted">
                    <i class="fas fa-calendar-alt me-1"></i>
                    Posted: {{ jobStore.currentJob.datePosted }}
                  </div>
                  <div v-if="jobStore.currentJob.dateApproved" class="text-muted">
                    <i class="fas fa-check-circle me-1"></i>
                    Approved: {{ jobStore.currentJob.dateApproved }}
                  </div>
                </div>
                <div class="col-md-8">
                  <h5>Job Description</h5>
                  <div class="job-description" v-html="jobStore.currentJob.description"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const jobStore = useJobStore();
const router = useRouter();
const toast = useToast();
const jobDetailsModal = ref(null);

onMounted(() => {
  // Initialize modal
  jobDetailsModal.value = new Modal(document.getElementById('jobDetailsModal'));
  
  // Fetch initial data
  jobStore.fetchDashboardData();
});

const viewJobDetails = async (jobId) => {
  try {
    await jobStore.fetchJobDetails(jobId);
    jobDetailsModal.value.show();
  } catch (error) {
    toast.error('Failed to load job details');
  }
};

const approveJob = async (jobId) => {
  try {
    await jobStore.approveJob(jobId);
    toast.success('Job approved successfully');
  } catch (error) {
    toast.error('Failed to approve job');
  }
};

const rejectJob = async (jobId) => {
  try {
    await jobStore.rejectJob(jobId);
    toast.success('Job rejected successfully');
  } catch (error) {
    toast.error('Failed to reject job');
  }
};

const logout = () => {
  // Clear auth token and redirect to login
  localStorage.removeItem('authToken');
  router.push('/login');
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  background-color: white;
  height: 100vh;
  position: fixed;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.nav-link {
  padding: 12px 16px;
  color: #555;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #3498db;
  border-left-color: #3498db;
}

.nav-link.active {
  background-color: #e6f2ff;
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 500;
}

.main-content {
  padding-left: 0;
  padding-right: 0;
}

.stat-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.pending-icon {
  background-color: #fff5e6;
  color: #f39c12;
}

.approved-icon {
  background-color: #e6ffee;
  color: #2ecc71;
}

.rejected-icon {
  background-color: #ffe6e6;
  color: #e74c3c;
}

.company-logo {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.company-logo-lg {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 36px;
}

.company-logo-lg img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.table th {
  font-weight: 500;
  color: #555;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-weight: 500;
  padding: 6px 10px;
}

.card-header {
  border-bottom: 1px solid #f0f0f0;
}

.log-out-section {
  margin-top: auto;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.job-description {
  white-space: pre-line;
}
</style>