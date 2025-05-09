<template>
  <div class="jobs-dashboard">
    <div class="header">
      <h1>My Jobs ({{ filteredJobs.length }})</h1>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Status:</label>
        <select v-model="filters.status" class="filter-select">
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Job Type:</label>
        <select v-model="filters.type" class="filter-select">
          <option value="all">All</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Search:</label>
        <input type="text" v-model="filters.search" placeholder="Search jobs..." class="search-input">
      </div>
    </div>

    <div class="table-responsive">
      <table class="jobs-table">
        <thead>
          <tr>
            <th>JOB</th>
            <th>STATUS</th>
            <th>APPLICATIONS</th>
            <th>View Applications</th>
            <th>Job Details</th>
            <th>Edit</th>
            <th>Expire</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="loading">Loading jobs...</td>
          </tr>
          <tr v-else-if="paginatedJobs.length === 0">
            <td colspan="7" class="no-jobs">No jobs found</td>
          </tr>
          
          <tr v-else v-for="job in paginatedJobs" :key="job.id" class="job-row">
            <td class="job-info">
              <div class="job-title">{{ job.title }}</div>
              <div class="job-meta">
                {{ formatJobType(job.type) }} • {{ formatDate(job.endDate) }}
              </div>
            </td>
            
            <td class="job-status">
              <span :class="job.status">{{ job.status }}</span>
            </td>
            
            <td class="job-applications">
              {{ job.applications }} Applications
            </td>
            
            <td class="job-actions">
              <router-link 
                :to="{ name: 'job-applications', params: { id: job.id } }" 
                class="view-btn"
              >
                View Applications
              </router-link>
            </td>
            
            <td class="job-actions">
             <button class="detail-btn" @click="openModal('details', job)">Details</button>
            </td>
            
            <td class="job-actions">
              <button class="edit-btn" @click="openModal('edit', job)">Edit</button>
            </td>
            
            <td class="job-actions">
              <button class="expire-btn" @click="openModal('expire', job)">Expire</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">&times;</button>
        
        
        <h2>{{ modalTitle }}</h2>
        
        <div v-if="modalType  === 'details'">
          <h3>{{ currentJob.title }}</h3>
          <p><strong>Type:</strong> {{ formatJobType(currentJob.type) }}</p>
          <p><strong>Status:</strong> <span :class="currentJob.status">{{ currentJob.status }}</span></p>
          <p><strong>Location:</strong> {{ currentJob.location || 'Not specified' }}</p>
          <p><strong>Education:</strong> {{ currentJob.education || 'N/A' }}</p>
          <p><strong>Experience:</strong> {{ currentJob.experience || 'N/A' }}</p>
          <p><strong>Level:</strong> {{ currentJob.level || 'N/A' }}</p>
          <p><strong>Description:</strong> {{ currentJob.description || 'N/A' }}</p>
          <p><strong>Responsibilities:</strong> {{ currentJob.responsibilities || 'N/A' }}</p>
          <p><strong>Keywords:</strong> {{ currentJob.keywords || 'None' }}</p>
          <p><strong>Skills:</strong> {{ currentJob.skills || [] }}</p>
          <div v-if="currentJob.salaryType === 'fixed'">
            <p><strong>Fixed Salary:</strong> ${{ currentJob.fixedSalary }}</p>
          </div>
          <div v-else>
            <p><strong>Min Salary:</strong> ${{ currentJob.minSalary }}</p>
            <p><strong>Max Salary:</strong> ${{ currentJob.maxSalary }}</p>
          </div>
        </div>
        <div v-else-if="modalType === 'edit'">
        <form @submit.prevent="saveJob">
          <div class="form-row">
            <div class="form-group">
              <label>Job Title:</label>
              <input v-model="currentJob.title" type="text" class="form-control" required>
            </div>
            
            <div class="form-group">
              <label>Job Type:</label>
              <select v-model="currentJob.type" class="form-control" required>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Category:</label>
              <input v-model="currentJob.category" type="text" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Location:</label>
              <input v-model="currentJob.location" type="text" class="form-control">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Salary Type:</label>
              <select v-model="currentJob.salaryType" class="form-control">
                <option value="fixed">Fixed</option>
                <option value="range">Range</option>
              </select>
            </div>
            
            <template v-if="currentJob.salaryType === 'fixed'">
              <div class="form-group">
                <label>Fixed Salary:</label>
                <input v-model.number="currentJob.fixedSalary" type="number" class="form-control">
              </div>
            </template>

            <template v-else>
              <div class="form-group">
                <label>Min Salary:</label>
                <input v-model.number="currentJob.minSalary" type="number" class="form-control">
              </div>
              <div class="form-group">
                <label>Max Salary:</label>
                <input v-model.number="currentJob.maxSalary" type="number" class="form-control">
              </div>
            </template>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Education:</label>
              <select v-model="currentJob.education" class="form-control">
                <option value="high-school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Experience:</label>
              <select v-model="currentJob.experience" class="form-control">
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Job Level:</label>
              <select v-model="currentJob.level" class="form-control">
                <option value="intern">Intern</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Description:</label>
            <textarea v-model="currentJob.description" class="form-control" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Responsibilities:</label>
            <textarea v-model="currentJob.responsibilities" class="form-control" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Skills (comma separated):</label>
            <input 
              v-model="skillsInput" 
              type="text" 
              class="form-control" 
              placeholder="e.g. JavaScript, HTML, CSS"
            >
          </div>

          <div class="form-group">
            <label>Keywords:</label>
            <input v-model="currentJob.keywords" type="text" class="form-control">
          </div>

          <div v-if="editing" class="form-group">
            <label for="status">Status:</label>
            <select v-model="currentJob.status" id="status" class="form-control">
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Save Job</button>
        </form>
      </div>
        
        <div v-else-if="modalType === 'expire'">
          <h3>Expire {{ currentJob.title }}?</h3>
          <p>This action cannot be undone.</p>
          
          <div class="modal-actions">
            <button @click="closeModal" class="cancel-btn">Cancel</button>
            <button @click="confirmExpire" class="confirm-btn">Confirm</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        &lt;
      </button>
      
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: currentPage === page }"
        class="page-btn"
      >
        {{ page }}
      </button>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 5,
      filters: {
        status: 'all',
        type: 'all',
        search: ''
      },
      showModal: false,
      modalType: '',
      currentJob: null,
      modalTitle: ''
    };
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        if (this.filters.status !== 'all' && job.status !== this.filters.status) {
          return false;
        }
        
        if (this.filters.type !== 'all' && job.type !== this.filters.type) {
          return false;
        }
        
        if (this.filters.search) {
          const searchTerm = this.filters.search.toLowerCase();
          const titleMatch = job.title.toLowerCase().includes(searchTerm);
          const typeMatch = this.formatJobType(job.type).toLowerCase().includes(searchTerm);
          return titleMatch || typeMatch;
        }
        
        return true;
      });
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredJobs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    },
    visiblePages() {
      const range = 2;
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.totalPages, this.currentPage + range);
      
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    async fetchJobs() {
    try {
      const response = await fetch('http://localhost:3000/jobs');
      const data = await response.json();

      this.jobs = data.map(job => ({
        ...job,
        title: job.title || 'Untitled Position',
        type: job.type || 'full-time',
        status: this.calculateStatus(job),
        applications: 0, 
        endDate: job.endDate || this.generateEndDate()
          }));
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          this.loading = false;
        }
      }
    ,
    async fetchApplicationsCount() {
      try {
        const response = await fetch('http://localhost:3000/applications');
        const data = await response.json();

        const countMap = {};
        data.forEach(app => {
          if (!countMap[app.jobId]) countMap[app.jobId] = 0;
          countMap[app.jobId]++;
        });

        this.jobs = this.jobs.map(job => ({
          ...job,
          applications: countMap[job.id] || 0
        }));
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
    ,
    calculateStatus(job) {
      return Math.random() > 0.3 ? 'Active' : 'Expired';
    },
    getRandomApplications() {
      return Math.floor(Math.random() * 1000) + 50;
    },
    generateEndDate() {
      const days = Math.floor(Math.random() * 30) + 1;
      return days > 15 ? `${days} days remaining` : 
             this.randomPastDate();
    },
    randomPastDate() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[Math.floor(Math.random() * 12)];
      const day = Math.floor(Math.random() * 28) + 1;
      const year = 2025 + Math.floor(Math.random() * 3);
      return `${month} ${day}, ${year}`;
    },
    formatJobType(type) {
      const types = {
        'full-time': 'Full Time',
        'part-time': 'Part Time',
        'internship': 'Internship',
        'contract': 'Contract',
        'temporary': 'Temporary'
      };
      return types[type] || type;
    },
    formatDate(date) {
      return date;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    async openModal(type, job) {
    this.modalType = type;
    this.currentJob = JSON.parse(JSON.stringify(job));

    const titles = {
      'details': 'Job Details',
      'edit': 'Edit Job',
      'expire': 'Confirm Expire'
    };
    this.modalTitle = titles[type];
    this.showModal = true;
    if (type === 'edit') {
      this.editing = true;
      this.currentJob = JSON.parse(JSON.stringify(job));
      this.currentJob.startDate = this.formatDate(this.currentJob.startDate);
      this.skillsInput = this.currentJob.skills?.join(', ') || '';
      this.statusInput = this.currentJob.status || 'Active'; 
    }
    
    this.showModal = true;
  }
    ,closeModal() {
      this.showModal = false;
      this.modalType = '';
      this.currentJob = null;
    },
    async saveJob() {
     try {
      this.currentJob.skills = this.skillsInput
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill);

     const response = await fetch(`http://localhost:3000/jobs/${this.currentJob.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        title: this.currentJob.title,
        type: this.currentJob.type,
        category: this.currentJob.category,
        location: this.currentJob.location,
        salaryType: this.currentJob.salaryType,
        fixedSalary: this.currentJob.fixedSalary,
        minSalary: this.currentJob.minSalary,
        maxSalary: this.currentJob.maxSalary,
        education: this.currentJob.education,
        experience: this.currentJob.experience,
        level: this.currentJob.level,
        description: this.currentJob.description,
        responsibilities: this.currentJob.responsibilities,
        skills: this.currentJob.skills,
        keywords: this.currentJob.keywords,
        status: this.currentJob.status 
      })
    });

    if (!response.ok) throw new Error('Failed to update job');

    const updatedJob = await response.json();

    const index = this.jobs.findIndex(j => j.id === updatedJob.id);
    if (index !== -1) {
      this.jobs[index] = updatedJob;
    }

    this.closeModal();
  } catch (error) {
    console.error('Error saving job:', error);
  }
    },
    async confirmExpire() {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${this.currentJob.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'Expired',
            endDate: 'Expired'
          })
        });

        if (!response.ok) throw new Error('Failed to expire job');

        const updatedJob = await response.json();
        const index = this.jobs.findIndex(j => j.id === updatedJob.id);
        if (index !== -1) {
          this.jobs[index] = updatedJob;
        }

        this.closeModal();
      } catch (error) {
        console.error('Error expiring job:', error);
      }
    }

  },
  watch: {
    filters: {
      handler() {
        this.currentPage = 1;
      },
      deep: true
    }
  },
  async mounted() {
  await this.fetchJobs();
  await this.fetchApplicationsCount();
}

};
</script>

<style scoped>
.jobs-dashboard {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-weight: bold;
  font-size: 14px;
}

.filter-select, .search-input {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  min-width: 200px;
}
.view-btn {
  display: inline-block;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.view-btn:hover {
  background-color: #0069d9;
}
.table-responsive {
  overflow-x: auto;
  margin-bottom: 20px;
}

.jobs-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.jobs-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.jobs-table td {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}

.jobs-table tr:last-child td {
  border-bottom: none;
}

.job-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.job-meta {
  color: #666;
  font-size: 14px;
}

.job-status span {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.job-status .Active {
  background-color: #e6f7ee;
  color: #28a745;
}

.job-status .Expired {
  background-color: #fce8e8;
  color: #dc3545;
}

.job-applications {
  color: #666;
}

.job-actions {
  white-space: nowrap;
}

.view-btn, .detail-btn, .edit-btn, .expire-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.view-btn {
  background-color: #007bff;
  color: white;
}

.view-btn:hover {
  background-color: #0069d9;
}

.detail-btn {
  background-color: #6c757d;
  color: white;
}

.detail-btn:hover {
  background-color: #5a6268;
}

.edit-btn {
  background-color: #17a2b8;
  color: white;
}

.edit-btn:hover {
  background-color: #138496;
}

.expire-btn {
  background-color: #dc3545;
  color: white;
}

.expire-btn:hover {
  background-color: #c82333;
}

.loading, .no-jobs {
  padding: 20px;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.page-btn:hover:not(:disabled) {
  background-color: #f1f1f1;
}

.page-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn, .confirm-btn {
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover, .confirm-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
  
  .jobs-table {
    display: block;
  }
  
  .jobs-table thead {
    display: none;
  }
  
  .jobs-table tr {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  
  .jobs-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .jobs-table td:before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
  }
  
  .jobs-table td:last-child {
    border-bottom: none;
  }
  
  .job-actions {
    justify-content: flex-end;
  }
  
  .loading, .no-jobs {
    padding: 20px;
    display: block;
  }
  
  .modal-content {
    width: 95%;
    padding: 15px;
  }
}
</style>