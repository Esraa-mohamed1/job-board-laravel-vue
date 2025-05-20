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
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
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
                <div class="job-meta">
                  {{ job.type ? formatJobType(job.type) : '' }} • {{ formatDate(job.endDate) }}
                </div>
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
              <button
                v-if="job.status === 'Active'"
                @click="expireJob(job)"
                class="btn btn-warning"
              >
                Expire Job
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="modal.show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">&times;</button>
        
        <h2>{{ modal.title }}</h2>
        
        <div v-if="modal.type === 'details'">
          <h3>{{ modal.job.title }}</h3>
          <p><strong>job_type:</strong> {{ formatBackendJobType(modal.job.type) }}</p>,

          <p><strong>Status:</strong> <span :class="modal.job.status">{{ modal.job.status }}</span></p>
          <p><strong>Location:</strong> {{ modal.job.location || 'Not specified' }}</p>
          <p><strong>Education:</strong> {{ modal.job.education || 'N/A' }}</p>
          <p><strong>Experience:</strong> {{ modal.job.experience || 'N/A' }}</p>
          <p><strong>Level:</strong> {{ modal.job.level || 'N/A' }}</p>
          <p><strong>Description:</strong> {{ modal.job.description || 'N/A' }}</p>
          <p><strong>Responsibilities:</strong> {{ modal.job.responsibilities || 'N/A' }}</p>
          <p><strong>Keywords:</strong> {{ modal.job.keywords || 'None' }}</p>
          <p><strong>Skills:</strong> {{ Array.isArray(modal.job.skills) ? modal.job.skills.join(', ') : modal.job.skills }}</p>
          <div v-if="modal.job.salaryType === 'fixed'">
            <p><strong>Fixed Salary:</strong> ${{ modal.job.fixedSalary }}</p>
          </div>
          <div v-else>
            <p><strong>Min Salary:</strong> ${{ modal.job.minSalary }}</p>
            <p><strong>Max Salary:</strong> ${{ modal.job.maxSalary }}</p>
          </div>
        </div>
        
        <div v-else-if="modal.type === 'edit'">
          <form @submit.prevent="saveJob">
            <div class="form-row">
              <div class="form-group">
                <label>Job Title:</label>
                <input v-model="modal.job.title" type="text" class="form-control" required>
              </div>
              
              <div class="form-group">
                <label>Job Type:</label>
                <select v-model="modal.job.type" class="form-control" required>
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
                <input v-model="modal.job.category" type="text" class="form-control">
              </div>
              
              <div class="form-group">
                <label>Location:</label>
                <input v-model="modal.job.location" type="text" class="form-control">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Salary Type:</label>
                <select v-model="modal.job.salaryType" class="form-control">
                  <option value="fixed">Fixed</option>
                  <option value="range">Range</option>
                </select>
              </div>
              
              <template v-if="modal.job.salaryType === 'fixed'">
                <div class="form-group">
                  <label>Fixed Salary:</label>
                  <input v-model.number="modal.job.fixedSalary" type="number" class="form-control">
                </div>
              </template>

              <template v-else>
                <div class="form-group">
                  <label>Min Salary:</label>
                  <input v-model.number="modal.job.minSalary" type="number" class="form-control">
                </div>
                <div class="form-group">
                  <label>Max Salary:</label>
                  <input v-model.number="modal.job.maxSalary" type="number" class="form-control">
                </div>
              </template>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Education:</label>
                <select v-model="modal.job.education" class="form-control">
                  <option value="high-school">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="master">Master</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Experience:</label>
                <select v-model="modal.job.experience" class="form-control">
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Job Level:</label>
                <select v-model="modal.job.level" class="form-control">
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
              <textarea v-model="modal.job.description" class="form-control" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label>Responsibilities:</label>
              <textarea v-model="modal.job.responsibilities" class="form-control" rows="3"></textarea>
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
              <input v-model="modal.job.keywords" type="text" class="form-control">
            </div>

            <div class="form-group">
              <label>Status:</label>
              <select v-model="modal.job.status" class="form-control">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary">Save Job</button>
          </form>
        </div>
        
        <div v-else-if="modal.type === 'expire'">
          <h3>Expire {{ modal.job.title }}?</h3>
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
        :disabled="pagination.currentPage === 1"
        class="page-btn"
      >
        &lt;
      </button>
      
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="pagination.currentPage = page"
        :class="{ active: pagination.currentPage === page }"
        class="page-btn"
      >
        {{ page }}
      </button>
      
      <button 
        @click="nextPage" 
        :disabled="pagination.currentPage === totalPages"
        class="page-btn"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      jobs: [],
      loading: true,
      filters: {
        status: 'all',
        type: 'all',
        search: ''
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 5
      },
      modal: {
        show: false,
        type: '',
        title: '',
        job: null
      },
      skillsInput: '',
      errorMessage: ''
    };
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        const statusMatch = this.filters.status === 'all' || job.status === this.filters.status;
        const typeMatch = this.filters.type === 'all' || job.type === this.filters.type;
        const searchMatch = !this.filters.search || 
          job.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          this.formatJobType(job.type).toLowerCase().includes(this.filters.search.toLowerCase());
        
        return statusMatch && typeMatch && searchMatch;
      });
    },
  //   formatBackendJobType(type) {
  // // Handle case where type is an object (extract the value you need)
  //     if (typeof type === 'object' && type !== null) {
  //       // Adjust this based on your actual object structure
  //       type = type.value || type.type || type.name;
  //     }

  //     const typeMap = {
  //       'Full Time': 'full-time',
  //       'Part Time': 'part-time',
  //       'Internship': 'internship',
  //       'Contract': 'contract',
  //       'Temporary': 'temporary'
  //     };
      
  //     // If it's already in backend format, return as-is
  //     if (['full-time', 'part-time', 'internship', 'contract', 'temporary'].includes(type)) {
  //       return type;
  //     }
      
  //     return typeMap[type] || 'full-time'; // default to full-time if not found
  //   },
    paginatedJobs() {
      const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      return this.filteredJobs.slice(start, start + this.pagination.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.pagination.itemsPerPage);
    },
    visiblePages() {
      const range = 2;
      const start = Math.max(1, this.pagination.currentPage - range);
      const end = Math.min(this.totalPages, this.pagination.currentPage + range);
      
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    getUserIdFromToken() {
      const token = localStorage.getItem('authToken');

        axios.get('http://localhost:8000/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.jobs = response.data.jobs;
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });

      },
    showNotification(type, message) {
      ElMessage({
        message: message,
        type: type,
        duration: 3000,
        showClose: true
      });
    },
    async fetchJobs() {
  this.loading = true;
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('http://localhost:8000/api/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    this.jobs = response.data.map(job => ({
      id: job.id,
      title: job.title,
      type: this.formatFrontendJobType(job.job_type),
      status: job.status, // Directly use the backend status: 'pending', 'active', or 'closed'
      applications: job.applications_count || 0,
      endDate: job.end_date || job.created_at,
      location: job.location,
      education: this.formatEducationLevel(job.education_level),
      experience: this.formatExperienceLevel(job.experience_level),
      level: job.job_level,
      description: job.description,
      responsibilities: job.responsibilities,
      keywords: job.keywords,
      skills: job.skills ? job.skills.map(skill => skill.name) : [],
      salaryType: job.salary_type,
      fixedSalary: job.fixed_salary,
      minSalary: job.min_salary,
      maxSalary: job.max_salary
    }));

  } catch (error) {
    console.error('Error fetching jobs:', error);
    this.showNotification('error', error.response?.data?.message || 'Failed to load jobs');
  } finally {
    this.loading = false;
  }
},
    formatFrontendJobType(backendType) {
    const typeMap = {
        'full_time': 'full-time',
        'part_time': 'part-time',
        'contract': 'contract',
        'internship': 'internship',
        'temporary': 'temporary',
        'freelance': 'freelance' 
    };
    return typeMap[backendType] || backendType;
},
    formatJobType(type) {
        const types = {
            'full-time': 'Full Time',
            'part-time': 'Part Time',
            'contract': 'Contract',
            'internship': 'Internship',
            'temporary': 'Temporary',
            'freelance': 'Freelance' // Add if used in backend
        };
        return types[type] || type; // Return the formatted name or the original if not found
    },
    async expireJob(job) {
  try {
    this.loading = true;
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Please login to update jobs');
    }

    const formattedType = this.formatBackendJobType(job.type);

    const requestData = {
      status: 'closed', // Change to 'closed'
      job_type: formattedType,
    };

    const response = await axios.put(
      `http://localhost:8000/api/jobs/${job.id}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    const index = this.jobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      this.jobs[index].status = 'closed'; // Update frontend to 'closed'
    }

    this.showNotification('success', 'Job expired successfully');
  } catch (error) {
    console.error('Expire job error:', error);
    let errorMsg = error.response?.data?.message || error.message;
    this.showNotification('error', errorMsg || 'Error expiring job');
  } finally {
    this.loading = false;
  }
}

,
    
    calculateStatus(job) {
      if (job.status === 'Expired') return 'Expired';
      if (job.endDate && new Date(job.endDate) < new Date()) return 'Expired';
      return 'Active';
    },
    
    formatBackendJobType(frontendType) {
  const typeMap = {
    'full-time': 'full_time',
    'part-time': 'part_time',
    'contract': 'contract',
    'internship': 'internship',
    'freelance': 'freelance'
  };
  return typeMap[frontendType] || frontendType;
}
,
formatEducationLevel(level) {
    const levels = {
        'high_school': 'High School',
        'bachelor': 'Bachelor',
        'master': 'Master',
        'phd': 'PhD',
        'diploma': 'Diploma', // Already present, ensure backend supports it
    };
    return levels[level] || level;
},
formatExperienceLevel(level) {
  const levels = {
    'entry': 'Entry Level',
    'mid': 'Mid Level',
    'senior': 'Senior Level'
  };
  return levels[level] || level;
},
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      
      // If it's already formatted (like "5 days remaining")
      if (typeof dateString === 'string' && isNaN(new Date(dateString))) {
        return dateString;
      }
      
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    
    openModal(type, job) {
      this.modal = {
        show: true,
        type,
        title: type === 'edit' ? 'Edit Job' : 
              type === 'details' ? 'Job Details' : 'Confirm Expiration',
        job: { ...job }
      };
  let responsibilitiesText = '';

  if (type === 'edit') {
    if (typeof job.responsibilities === 'string') {
      responsibilitiesText = job.responsibilities;
    } else if (Array.isArray(job.responsibilities)) {
      responsibilitiesText = job.responsibilities.join(', ');
    } else {
      responsibilitiesText = JSON.stringify(job.responsibilities);
    }
  }

  this.modal = {
    show: true,
    type,
    title: type === 'edit' ? 'Edit Job' : 
          type === 'details' ? 'Job Details' : 'Confirm Expiration',
    job: { ...job, responsibilities: responsibilitiesText }
  };

  if (type === 'edit') {
    this.skillsInput = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '';
  }
      if (type === 'edit') {
        this.skillsInput = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '';
      }
    },
    
    closeModal() {
      this.modal.show = false;
      this.modal.type = '';
      this.modal.job = null;
      this.skillsInput = '';
    },
    
    async saveJob() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Please login to update jobs');

    const jobData = {
      title: this.modal.job.title,
      type: this.modal.job.type, 
      description: this.modal.job.description,
      responsibilities: this.modal.job.responsibilities,
      education_level: this.modal.job.education.toLowerCase().replace(' ', '_'),
      experience_level: this.modal.job.experience.toLowerCase().replace(' ', '_'),
      job_level: this.modal.job.level,
      location: this.modal.job.location,
      keywords: this.modal.job.keywords,
      status: this.modal.job.status,
      skills: this.skillsInput.split(',').map(s => s.trim()).filter(s => s),
      salary_type: this.modal.job.salaryType
    };

    if (this.modal.job.salaryType === 'fixed') {
        jobData.salary = Number(this.modal.job.fixedSalary); // Change fixed_salary to salary
    } else {
        jobData.min_salary = Number(this.modal.job.minSalary);
        jobData.max_salary = Number(this.modal.job.maxSalary);
    }
    console.log('Job Data:', jobData);
    const response = await axios.put(
      `http://localhost:8000/api/jobs/${this.modal.job.id}`,
      jobData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const index = this.jobs.findIndex(j => j.id === this.modal.job.id);
    if (index !== -1) {
      this.jobs[index] = {
        ...this.jobs[index],
        ...response.data.data,
        skills: response.data.data.skills?.map(skill => skill.name) || []
      };
    }

    this.showNotification('success', 'Job updated successfully');
    this.closeModal();
  } catch (error) {
    console.error('Error saving job:', error);
    this.showNotification('error', error.response?.data?.message || 'Error saving job');
  }
}
,
    
    prevPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--;
      }
    },
    
    nextPage() {
      if (this.pagination.currentPage < this.totalPages) {
        this.pagination.currentPage++;
      }
    }
  },
  created() {
    this.fetchJobs();
  },
  watch: {
    filters: {
      handler() {
        this.pagination.currentPage = 1;
      },
      deep: true
    }
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
.job-status .active { /* Renamed from .Active to .active */
  background-color: #e6f7ee;
  color: #28a745;
}

.job-status .closed { /* Renamed from .Expired to .closed */
  background-color: #fce8e8;
  color: #dc3545;
}

.job-status .pending { /* New style for pending */
  background-color: #fff3cd; /* Light yellow background */
  color: #ffc107; /* Orange/yellow text */
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