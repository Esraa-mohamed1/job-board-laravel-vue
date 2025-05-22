<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Dashboard Overview</h1>
      <div class="stats">
        <div class="stat-card">
          <h3>Total Jobs Posted</h3>
          <p>{{ stats.totalJobs }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Applications</h3>
          <p>{{ stats.activeApplications }}</p>
        </div>
        <div class="stat-card">
          <h3>Profile Completion</h3>
          <p>{{ stats.profileCompletion }}%</p>
        </div>
      </div>
    </div>
    
    <div class="content">
      <div class="recent-jobs">
        <h2>Recent Jobs</h2>
        <div class="job-list">
          <div v-for="job in recentJobs" :key="job.id" class="job-card">
            <h3>{{ job.title }}</h3>
            <p>{{ job.applications }} applications</p>
            <div class="status" :class="job.status">{{ job.status }}</div>
          </div>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button @click="navigateTo('/employer/dashboard/post')" class="btn-action">
            <span>+</span>
            Post New Job
          </button>
          <button @click="navigateTo('/employer/dashboard/myjobs')" class="btn-action">
            <span>📋</span>
            View Applications
          </button>
          <button @click="navigateTo('/employer/dashboard/settings')" class="btn-action">
            <span>⚙️</span>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref({
  totalJobs: 5,
  activeApplications: 12,
  profileCompletion: 85
})

const recentJobs = ref([
  { id: 1, title: 'Frontend Developer', applications: 8, status: 'active' },
  { id: 2, title: 'Backend Developer', applications: 4, status: 'active' },
  { id: 3, title: 'UI/UX Designer', applications: 0, status: 'draft' }
])

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.recent-jobs, .quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.job-list {
  margin-top: 1rem;
}

.job-card {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.job-card h3 {
  margin-bottom: 0.5rem;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.status.active {
  background: #e6f7ee;
  color: #28a745;
}

.status.draft {
  background: #fff3cd;
  color: #856404;
}

.action-buttons {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-action {
  padding: 1rem;
  border: 1px dashed #ddd;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.btn-action:hover {
  border-color: #0A65CC;
  color: #0A65CC;
}

.btn-action span {
  font-size: 1.2rem;
}
</style>