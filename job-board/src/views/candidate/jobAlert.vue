<template>
  <div class="job-alerts-modern">
    <!-- Header with glowing effect -->
     <div class="modern-header">
      <div class="title-group">
        <h1><span class="hashtag">#</span> Job Alerts</h1>
        <span class="new-badge">New</span>
      </div>
    
    </div>

    <!-- Job Categories with animated cards -->
    <div class="job-category" v-for="(category, index) in jobCategories" :key="index">
      <div class="category-header">
        <h2>{{ category.title }}</h2>
        <span class="job-type-badge">{{ category.type }}</span>
      </div>

      <div class="job-listings">
        <div 
          class="job-card" 
          v-for="(job, jobIndex) in category.jobs" 
          :key="jobIndex"
        >
          <div class="job-main-info">
            <h3>{{ job.title }}</h3>
            <div class="job-meta">
              <span class="location" v-if="job.location">
                <i class="fas fa-map-marker-alt"></i> {{ job.location }}
              </span>
              <span class="job-type">{{ job.jobType }}</span>
            </div>
          </div>
          <div class="job-details">
            <span class="salary">
              <i class="fas fa-dollar-sign"></i> {{ job.salary }}
            </span>
            <span class="time-remaining">
              <i class="far fa-clock"></i> {{ job.timeRemaining }}
            </span>
          </div>
       <RouterLink :to="`/candidate/jobs/${job.id}`">
       <div class="job-hover-content">
        <button class="quick-apply-btn">
      Quick Apply <i class="fas fa-bolt"></i>
    </button>
          </div>
           </RouterLink>

        </div>
      </div>
    </div>

    <!-- Floating action button -->
    <button class="floating-action-btn">
      <i class="fas fa-paper-plane"></i>
    </button>

    <!-- Pagination Controls -->
<div class="pagination-controls" v-if="totalPages > 1">
  <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
</div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ModernJobAlerts',
  data() {
    return {
      jobCategories: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/latest-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: this.currentPage
          }
        });

        const jobs = response.data.jobs.data || response.data.jobs; 
        const total = response.data.jobs.total || 1; 
        const perPage = response.data.jobs.per_page || 3;

        this.totalPages = Math.ceil(total / perPage);

        this.jobCategories = [
          {
            title: 'Latest Jobs',
            type: 'All Types',
            jobs: jobs.map(job => ({
               id: job.id,
              title: job.title,
              location: job.location,
              jobType: job.job_type || 'Not specified',
              salary: job.salary ? `${job.salary} EGP` : 'Negotiable',
              timeRemaining: this.calculateTimeRemaining(job.created_at)
            }))
          }
        ];
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchJobs();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchJobs();
      }
    },
    calculateTimeRemaining(createdAt) {
      const created = new Date(createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - created);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} day(s) ago`;
    }
  }
};
</script>




<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.job-alerts-modern {
  max-width: 680px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(13, 110, 253, 0.1);
  position: relative;
  overflow: hidden;
}

/* Modern header with gradient border */
.modern-header {
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(13, 110, 253, 0.1);
  position: relative;
}

.modern-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #0d6efd;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.hashtag {
  font-size: 40px;
  margin-right: 8px;
  background: linear-gradient(135deg, #0d6efd, #00b4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-container {
  position: relative;
}

.search-input {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 50px;
  padding: 12px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.search-input:hover {
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
}

.search-input i {
  color: #6c757d;
  margin-right: 10px;
}

.search-input input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
}

/* Job category styling */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.category-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.job-type-badge {
  background: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
}

/* Job card styling */
.job-listings {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.job-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(to bottom, #0d6efd, #00b4ff);
  transition: height 0.3s ease;
  z-index: -1;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.15);
  border-color: rgba(13, 110, 253, 0.3);
}

.job-card:hover::before {
  height: 100%;
}

.job-main-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 8px;
}

.job-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
}

.job-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.location {
  color: #6c757d;
}

.job-type {
  background: #f8f9fa;
  padding: 4px 10px;
  border-radius: 4px;
  color: #495057;
  font-size: 13px;
}

.job-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary {
  color: #0d6efd;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.time-remaining {
  color: #6c757d;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Hover content (hidden by default) */
.job-hover-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.job-card:hover .job-hover-content {
  opacity: 1;
}

.quick-apply-btn {
  background: linear-gradient(135deg, #0d6efd, #00b4ff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
  transition: all 0.3s ease;
}

.quick-apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
}

/* Floating action button */
.floating-action-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d6efd, #00b4ff);
  color: white;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.floating-action-btn:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.4);
}

.new-badge {
  background: linear-gradient(135deg, #dc3545, #a30909);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}
.title-group {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>