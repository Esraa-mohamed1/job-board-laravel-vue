<template>
  <div class="min-vh-100 bg-light d-flex">
    <!-- Sidebar -->
    <aside class="w-25 bg-white shadow-lg d-flex flex-column" style="max-width: 250px;">
      <div class="d-flex align-items-center justify-content-center h-20 border-bottom">
        <img :src="logo" alt="Logo" class="h-10 w-auto" />
      </div>
      <nav class="flex-grow-1 py-4 overflow-y-auto">
        <ul class="list-unstyled">
          <li>
            <a href="#" class="d-flex align-items-center px-4 py-3 text-white bg-primary rounded font-weight-bold sidebar-link active">
              <i class="fas fa-tachometer-alt me-2"></i>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="d-flex align-items-center px-4 py-3 text-secondary sidebar-link">
              <i class="fas fa-users me-2"></i>
              Users
            </a>
          </li>
          <li>
            <a href="#" class="d-flex align-items-center px-4 py-3 text-secondary sidebar-link">
              <i class="fas fa-cog me-2"></i>
              Settings
            </a>
          </li>
        </ul>
      </nav>
      <div class="p-4">
        <button class="w-100 d-flex align-items-center justify-content-center px-4 py-2 btn btn-outline-primary font-weight-bold">
          <i class="fas fa-question-circle me-2"></i>
          Support
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- Top Bar -->
      <header class="h-20 bg-white shadow-sm d-flex align-items-center justify-content-between px-4">
        <div class="w-50 position-relative">
          <input type="text" placeholder="Search..." class="form-control rounded-pill ps-5" />
          <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-link text-secondary me-3 position-relative">
            <i class="fas fa-bell"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </button>
          <div class="dropdown">
            <button class="btn p-0 d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="rounded-circle border border-primary" style="width: 40px; height: 40px;" />
              <span class="ms-2 fw-bold text-secondary">Employer</span>
              <i class="fas fa-chevron-down ms-1"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
              <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-grow-1 p-4">
        <!-- Statistic Cards -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          <div class="col">
            <div class="card shadow stat-card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-briefcase me-2 fs-4"></i>
                    <span class="fs-5 fw-bold">Total Jobs</span>
                  </div>
                  <span class="fs-6 opacity-75">+12%</span>
                </div>
                <div class="fs-2 fw-bold">{{ stats.totalJobs }}</div>
                <div class="progress mt-2 bg-primary bg-opacity-25" style="height: 6px;">
                  <div class="progress-bar bg-white" role="progressbar" style="width: 72%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow stat-card bg-warning text-white">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-check-circle me-2 fs-4"></i>
                    <span class="fs-5 fw-bold">Active Jobs</span>
                  </div>
                  <span class="fs-6 opacity-75">+5%</span>
                </div>
                <div class="fs-2 fw-bold">{{ stats.activeJobs }}</div>
                <div class="progress mt-2 bg-warning bg-opacity-25" style="height: 6px;">
                  <div class="progress-bar bg-white" role="progressbar" style="width: 45%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow stat-card bg-info text-white">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-file-alt me-2 fs-4"></i>
                    <span class="fs-5 fw-bold">Total Applications</span>
                  </div>
                  <span class="fs-6 opacity-75">+24%</span>
                </div>
                <div class="fs-2 fw-bold">{{ stats.totalApplications }}</div>
                <div class="progress mt-2 bg-info bg-opacity-25" style="height: 6px;">
                  <div class="progress-bar bg-white" role="progressbar" style="width: 68%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow stat-card bg-danger text-white">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-user-plus me-2 fs-4"></i>
                    <span class="fs-5 fw-bold">New Candidates</span>
                  </div>
                  <span class="fs-6 opacity-75">+8%</span>
                </div>
                <div class="fs-2 fw-bold">{{ stats.newCandidates }}</div>
                <div class="progress mt-2 bg-danger bg-opacity-25" style="height: 6px;">
                  <div class="progress-bar bg-white" role="progressbar" style="width: 38%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Jobs Section -->
        <div class="card shadow mb-4">
          <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 py-3">
            <h2 class="h5 mb-0 fw-bold text-dark">Recent Jobs</h2>
            <button class="btn btn-primary btn-sm d-flex align-items-center">
              View All
              <i class="fas fa-chevron-right ms-1"></i>
            </button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="bg-light">
                  <tr>
                    <th scope="col" class="px-4 py-3 text-start text-xs font-weight-bold text-secondary text-uppercase">Title</th>
                    <th scope="col" class="px-4 py-3 text-start text-xs font-weight-bold text-secondary text-uppercase">Type</th>
                    <th scope="col" class="px-4 py-3 text-start text-xs font-weight-bold text-secondary text-uppercase">Status</th>
                    <th scope="col" class="px-4 py-3 text-start text-xs font-weight-bold text-secondary text-uppercase">Applications</th>
                    <th scope="col" class="px-4 py-3 text-start text-xs font-weight-bold text-secondary text-uppercase">Created</th>
                    <th scope="col" class="px-4 py-3 text-end text-xs font-weight-bold text-secondary text-uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="job in recentJobs" :key="job.id" class="align-middle">
                    <td class="px-4 py-3 text-sm font-weight-medium text-dark">
                      <div class="d-flex align-items-center">
                        <div class="me-3 bg-primary bg-opacity-10 rounded p-2">
                          <i class="fas fa-briefcase text-primary"></i>
                        </div>
                        <div>
                          <div class="fw-bold">{{ job.title }}</div>
                          <div class="text-xs text-muted">{{ job.department }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <span class="badge bg-primary bg-opacity-10 text-primary">{{ job.job_type }}</span>
                    </td>
                    <td class="px-4 py-3">
                      <span :class="[
                        'badge',
                        job.status === 'approved' ? 'bg-success bg-opacity-10 text-success' :
                        job.status === 'pending' ? 'bg-warning bg-opacity-10 text-warning' :
                        'bg-danger bg-opacity-10 text-danger'
                      ]">
                        {{ job.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-secondary">
                      <div class="d-flex align-items-center">
                        <i class="fas fa-user me-1"></i>
                        {{ job.applications_count }}
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-secondary">{{ new Date(job.created_at).toLocaleDateString() }}</td>
                    <td class="px-4 py-3 text-end">
                      <button class="btn btn-sm btn-outline-primary">Manage</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Recent Applications Section -->
        <div class="card shadow">
          <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 py-3">
            <h2 class="h5 mb-0 fw-bold text-dark">Recent Applications</h2>
            <button class="btn btn-primary btn-sm d-flex align-items-center">
              View All
              <i class="fas fa-chevron-right ms-1"></i>
            </button>
          </div>
          <div class="card-body">
            <div v-for="application in recentApplications" :key="application.id" class="d-flex justify-content-between align-items-center py-3 border-bottom application-item">
              <div class="d-flex align-items-center">
                <img :src="application.user.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`" 
                     alt="User" 
                     class="rounded-circle me-3" 
                     style="width: 40px; height: 40px;" />
                <div>
                  <h3 class="h6 mb-1 fw-bold text-dark">{{ application.job.title }}</h3>
                  <p class="text-sm text-secondary mb-0">Applied by {{ application.user.name }}</p>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <span class="text-sm text-secondary me-3">{{ new Date(application.created_at).toLocaleDateString() }}</span>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="applicationActions" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="applicationActions">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-eye me-2"></i>View Details</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-calendar-alt me-2"></i>Schedule Interview</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-times-circle me-2"></i>Reject Application</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-envelope me-2"></i>Message Candidate</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import logo from '@/assets/logo.png'

export default {
  name: 'EmployerOverview',
  setup() {
    const stats = ref({
      totalJobs: 0,
      activeJobs: 0,
      totalApplications: 0,
      newCandidates: 0
    })
    const recentJobs = ref([])
    const recentApplications = ref([])
    const loading = ref(true)

    const fetchDashboardData = async () => {
      try {
        loading.value = true
        const response = await axios.get('/api/employer/dashboard/overview')
        stats.value = response.data.stats
        recentJobs.value = response.data.recent_jobs
        recentApplications.value = response.data.recent_applications.map(app => ({
          ...app,
          user: {
            ...app.user,
            avatar: app.user.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`
          }
        }))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      stats,
      recentJobs,
      recentApplications,
      loading,
      logo
    }
  }
}
</script>

<style>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 123, 255, 0.5);
  border-radius: 4px;
  transition: background 0.3s ease;
}
::-webkit-scrollbar-thumb:hover {
  background: #007bff;
}

/* Sidebar */
aside .sidebar-link {
  transition: all 0.3s ease;
  margin: 0.25rem 1rem;
  border-radius: 0.5rem;
  color: #64748b;
}
aside .sidebar-link:hover {
  background-color: #f1f5f9;
  color: #007bff;
  transform: translateX(4px);
}
aside .sidebar-link.active {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 123, 255, 0.3);
}
aside .sidebar-link.active:hover {
  background-color: #0069d9;
}

/* Header */
header input.form-control {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding-left: 2.5rem;
  transition: all 0.3s ease;
}
header input.form-control:focus {
  background-color: white;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
header .dropdown-toggle::after {
  display: none;
}
header .dropdown-menu {
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Statistic Cards */
.stat-card {
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.stat-card .progress {
  border-radius: 3px;
  overflow: hidden;
}
.stat-card .progress-bar {
  transition: width 1s ease;
}

/* Tables */
.card .table th {
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #64748b;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.card .table td {
  vertical-align: middle;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.card .table tbody tr {
  transition: all 0.3s ease;
}
.card .table tbody tr:hover {
  background-color: #f8fafc;
  transform: translateX(2px);
}

/* Application Items */
.application-item {
  transition: all 0.3s ease;
}
.application-item:hover {
  background-color: #f8fafc;
  border-radius: 0.5rem;
  transform: translateX(2px);
}

/* Buttons */
.btn {
  transition: all 0.3s ease;
  font-weight: 500;
  border-radius: 0.5rem;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

/* Badges */
.badge {
  padding: 0.35em 0.65em;
  font-weight: 500;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  aside {
    width: 70px;
    max-width: none;
  }
  aside .fs-4,
  aside .sidebar-link span,
  aside .btn span {
    display: none;
  }
  aside .sidebar-link {
    justify-content: center;
    padding: 0.75rem;
  }
  aside .p-4 {
    padding: 1rem !important;
  }
}

@media (max-width: 768px) {
  .row-cols-lg-4 {
    display: flex;
    flex-direction: column;
  }
  main {
    padding: 1rem;
  }
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

@media (max-width: 576px) {
  header .w-50 {
    width: 100% !important;
  }
  header .d-flex.align-items-center:not(.ms-2) {
    display: none !important;
  }
  .application-item {
    flex-direction: column;
    align-items: flex-start !important;
  }
  .application-item > div:last-child {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: space-between;
  }
}
</style>