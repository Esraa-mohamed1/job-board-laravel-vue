<template>
  <div class="dashboard-container">
    <div class="container-fluid px-0">
      <div class="row g-0">
        <div class="col-md-9-5 p-4 bg-light">
          <div class="welcome-section mb-4">
            <h4 class="mb-3">Hello, {{ user?.name || '...' }}</h4>
            <p class="text-muted">Here is your daily activities and job alerts</p>
          </div>

          <div class="row mb-4">
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body">
                  <h5 class="card-title">{{ stats.appliedJobs }}</h5>
                  <p class="card-text">Applied jobs</p>
                </div>
              </div>
            </div>
           
          </div>

         
 
          <div class="card mb-4">
            <div class="card-header bg-white border-bottom">
              <h5 class="mb-0">Recently Applied</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(job, index) in appliedJobs" :key="job.id">
                      <td>
                        <div class="d-flex flex-column">
                          <strong>{{ job.title }}</strong>
                          <small class="text-muted">{{ job.location }}</small>
                          <small class="text-muted">{{ job.salary }}</small>
                        </div>
                      </td>
                      <td>{{ formatDate(job.applied_at) }}</td>
                      <td>
                        <span class="badge" :class="{
                          'bg-success': job.status === 'Active',
                          'bg-warning': job.status === 'Pending',
                          'bg-danger': job.status === 'Rejected'
                        }">{{ job.status }}</span>
                      </td>
                      
                    </tr>
                    <tr v-if="!appliedJobs.length">
                      <td colspan="4" class="text-center text-muted">No applied jobs found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)
const stats = ref({
  appliedJobs: 0,
  favoriteJobs: 0,
  jobAlerts: 0,
})
const appliedJobs = ref([])

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
    ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('authToken')
    console.log(token);
    const resp = await fetch('http://localhost:8000/api/candidate/dashboard', {
      headers: {
        'Accept': 'application/json',
        'Authorization':  `Bearer ${token}`
      }
    })
    if (!resp.ok) throw new Error('Failed to load dashboard data')
    const data = await resp.json()
    user.value = data.user
    stats.value = {
      appliedJobs: data.applied_jobs_count,
      favoriteJobs: data.favorite_jobs_count,
      jobAlerts: data.job_alerts_count,
    }
    appliedJobs.value = data.recent_applied_jobs || []
  } catch (err) {
    user.value = null
    stats.value = { appliedJobs:0 }
    appliedJobs.value = []
  }
}

onMounted(fetchDashboardData)
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.welcome-section h4 {
  font-weight: 600;
  color: #2c3e50;
}

.stat-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card .card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-card .card-text {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.alert-warning {
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
}

.table th {
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.85rem;
  text-transform: uppercase;
  border-top: none;
}

.table td {
  vertical-align: middle;
}

.badge {
  padding: 0.35em 0.65em;
  font-weight: 500;
}

/* Custom column widths */
.col-md-9-5 {
  flex: 0 0 auto;
  width: 80%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .col-md-9-5 {
    width: 100%;
  }

  .stat-card {
    margin-bottom: 15px;
  }
}
</style>