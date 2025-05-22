<template>
  <div class="applications-page">
    <div class="breadcrumb">
      <router-link to="/employer/dashboard">Home</router-link>
      <span> / </span>
      <router-link to="/employer/dashboard/myjobs">Jobs</router-link>
      <span> / </span>
      <span>{{ job.title || 'Job' }}</span>
      <span> / </span>
      <span>Applications</span>
    </div>

    <div class="header">
      <h1>Job Applications for {{ job.title || 'This Position' }}</h1>
      <div class="header-actions">
        <router-link to="/employer/dashboard/myjobs" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to Jobs
        </router-link>
        
        <div class="controls">
          <div class="filter-sort">
            <div class="filter">
              <button class="filter-btn" @click="showFilterDropdown = !showFilterDropdown">
                <i class="fas fa-filter"></i> Filter
                <i class="fas fa-chevron-down icon"></i>
              </button>
              <div v-if="showFilterDropdown" class="filter-dropdown">
                <div class="filter-option">
                  <label><i class="fas fa-briefcase"></i> Experience</label>
                  <select v-model="filters.experience">
                    <option value="">All levels</option>
                    <option value="1">1+ years</option>
                    <option value="3">3+ years</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>
                <div class="filter-option">
                  <label><i class="fas fa-graduation-cap"></i> Education</label>
                  <select v-model="filters.education">
                    <option value="">All education</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <button class="apply-btn" @click="applyFilters">
                  <i class="fas fa-check"></i> Apply
                </button>
                <button class="reset-btn" @click="resetFilters">
                  <i class="fas fa-undo"></i> Reset
                </button>
              </div>
            </div>
            
            <div class="sort">
              <button class="sort-btn" @click="showSortDropdown = !showSortDropdown">
                <i class="fas fa-sort"></i> Sort
                <i class="fas fa-chevron-down icon"></i>
              </button>
              <div v-if="showSortDropdown" class="sort-dropdown">
                <div class="sort-option" @click="sortBy = 'newest'">
                  <i class="fas fa-check" v-if="sortBy === 'newest'"></i>
                  <span>Newest first</span>
                </div>
                <div class="sort-option" @click="sortBy = 'oldest'">
                  <i class="fas fa-check" v-if="sortBy === 'oldest'"></i>
                  <span>Oldest first</span>
                </div>
                <div class="sort-option" @click="sortBy = 'experience'">
                  <i class="fas fa-check" v-if="sortBy === 'experience'"></i>
                  <span>Most experienced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        <i :class="tabIcons[tab]"></i>
        {{ tabLabels[tab] }} ({{ tabCounts[tab] }})
      </button>
    </div>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading applications...
    </div>

    <div v-else-if="filteredApplications.length === 0" class="no-applications">
      <i class="fas fa-folder-open"></i> No applications found
    </div>

    <div v-else class="applications-container">
      <div 
      v-for="application in currentTabApplications" 
    :key="application.id" 
    class="application-card" 
    :class="application.status"
    @click="showApplicationDetails(application)"
      >
        <div class="candidate-info">
          <div class="candidate-details">
            <div class="name-status">
              <h3>{{ application.user.name }}</h3>
              <span class="status-badge" :class="application.status">
                <i :class="statusIcons[application.status]"></i>
                {{ application.status }}
              </span>
            </div>
            <p class="candidate-position">{{ application.user.position || 'No position specified' }}</p>
            <div class="candidate-meta">
              <span><i class="fas fa-briefcase"></i> {{ application.user.experience || '0' }} years experience</span>
              <span><i class="fas fa-graduation-cap"></i> {{ application.user.education || 'Not specified' }}</span>
            </div>
          </div>
        </div>

        <div class="application-details">
          <p><i class="fas fa-calendar-alt"></i> Applied: {{ formatDate(application.created_at) }}</p>
          <p><i class="fas fa-envelope"></i> Email: {{ application.user.email }}</p>
          <p v-if="application.cover_letter"><i class="fas fa-file-alt"></i> Cover letter provided</p>
          <p v-else><i class="fas fa-file-alt"></i> No cover letter</p>
        </div>

        <div class="application-actions">
          <button class="action-btn download-btn" @click.stop="downloadCV(application)">
            <i class="fas fa-download"></i> Download CV
          </button>
          
          <button 
            class="action-btn shortlist-btn" 
            @click.stop="updateStatus(application, 'reviewed')"
            :disabled="application.status === 'reviewed' || application.status === 'accepted' || application.status === 'rejected'"
          >
            <i class="fas fa-star"></i> 
            {{ application.status === 'reviewed' ? 'Under Review' : 'Mark as Reviewed' }}
          </button>
          
          <button 
            class="action-btn accept-btn" 
            @click.stop="updateStatus(application, 'accepted')"
            :disabled="application.status === 'accepted' || application.status === 'rejected'"
          >
            <i class="fas fa-check-circle"></i> Accept
          </button>
          
          <button 
            class="action-btn reject-btn" 
            @click.stop="updateStatus(application, 'rejected')"
            :disabled="application.status === 'rejected' || application.status === 'accepted'"
          >
            <i class="fas fa-times-circle"></i> Reject
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedApplication" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <h2>Application Details</h2>
          <span class="status-badge" :class="selectedApplication.status">
            <i :class="statusIcons[selectedApplication.status]"></i>
            {{ selectedApplication.status }}
          </span>
        </div>
        
        <div class="modal-body">
          <div class="candidate-profile">
            <div class="candidate-info">
              <h3>{{ selectedApplication.user.name }}</h3>
              <p class="position">{{ selectedApplication.user.position || 'No position specified' }}</p>
              <div class="contact-info">
                <p><i class="fas fa-envelope"></i> {{ selectedApplication.user.email }}</p>
                <p v-if="selectedApplication.user.phone"><i class="fas fa-phone"></i> {{ selectedApplication.user.phone }}</p>
              </div>
            </div>
          </div>
          
          <div class="details-section">
            <h4><i class="fas fa-calendar-alt"></i> Applied On</h4>
            <p>{{ formatDate(selectedApplication.created_at) }}</p>
          </div>
          
          <div class="cover-letter" v-if="selectedApplication.cover_letter">
            <h4><i class="fas fa-file-alt"></i> Cover Letter</h4>
            <div class="cover-letter-content">
              {{ selectedApplication.cover_letter }}
            </div>
          </div>
          <div v-else class="no-cover-letter">
            <h4><i class="fas fa-file-alt"></i> Cover Letter</h4>
            <p>No cover letter provided</p>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn download-btn" @click.stop="downloadCV(selectedApplication)">
            <i class="fas fa-download"></i> Download CV
          </button>
          
          <button 
            class="action-btn shortlist-btn" 
            @click.stop="updateStatus(selectedApplication, 'reviewed')"
            :disabled="selectedApplication.status === 'reviewed' || selectedApplication.status === 'accepted' || selectedApplication.status === 'rejected'"
          >
            <i class="fas fa-star"></i> 
            {{ selectedApplication.status === 'reviewed' ? 'Under Review' : 'Mark as Reviewed' }}
          </button>
          
          <button 
            class="action-btn accept-btn" 
            @click.stop="updateStatus(selectedApplication, 'accepted')"
            :disabled="selectedApplication.status === 'accepted' || selectedApplication.status === 'rejected'"
          >
            <i class="fas fa-check-circle"></i> Accept
          </button>
          
          <button 
            class="action-btn reject-btn" 
            @click.stop="updateStatus(selectedApplication, 'rejected')"
            :disabled="selectedApplication.status === 'rejected' || selectedApplication.status === 'accepted'"
          >
            <i class="fas fa-times-circle"></i> Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type: String,
      required: true,
      selectedApplication: null

    }
  },
  data() {
    return {
      job: {},
      allApplications: [],
      activeTab: 'all',
      tabs: ['all', 'reviewed', 'accepted'], 
    tabIcons: {
      all: 'fas fa-list',
      reviewed: 'fas fa-star', 
      accepted: 'fas fa-check-circle'
    },
    tabLabels: {
      all: 'All Applications',
      reviewed: 'Under Review', 
      accepted: 'Accepted'
    },
      statusIcons: {
        pending: 'fas fa-hourglass-half',
        shortlisted: 'fas fa-star',
        accepted: 'fas fa-check-circle',
        rejected: 'fas fa-times-circle'
      },
      loading: true,
      showFilterDropdown: false,
      showSortDropdown: false,
      filters: {
        experience: '',
        education: ''
      },
      sortBy: 'newest',
      sortBy: 'newest',
      selectedApplication: null
    };
  },
  computed: {
    tabCounts() {
      return {
        all: this.allApplications.length,
    reviewed: this.allApplications.filter(app => app.status === 'reviewed').length,
    accepted: this.allApplications.filter(app => app.status === 'accepted').length
      };
    },
    filteredApplications() {
      let apps = [...this.allApplications];

      // Apply filters
      if (this.filters.experience) {
        apps = apps.filter(app => (app.user?.experience || 0) >= parseInt(this.filters.experience));
      }
      if (this.filters.education) {
        apps = apps.filter(app => app.user?.education === this.filters.education);
      }

      // Apply sorting
      switch (this.sortBy) {
        case 'newest':
          apps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'oldest':
          apps.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'experience':
          apps.sort((a, b) => (b.user?.experience || 0) - (a.user?.experience || 0));
          break;
      }

      return apps;
    },
    currentTabApplications() {
    switch (this.activeTab) {
      case 'reviewed':
        return this.filteredApplications.filter(app => app.status === 'reviewed');
      case 'accepted':
        return this.filteredApplications.filter(app => app.status === 'accepted');
      default:
        return this.filteredApplications;
    }
  }
  },
  methods: {
    async fetchJob() {
      try {
        const res = await axios.get(`http://localhost:8000/api/jobs/${this.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.job = res.data;
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    },
    async fetchApplications() {
      try {
        this.loading = true;
        const res = await axios.get(`http://localhost:8000/api/jobs/${this.id}/applications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json'
          }
        });
        
        this.allApplications = res.data.map(app => ({
          ...app,
          user: {
            ...app.user,
            avatar: app.user.avatar || '/images/default-avatar.png',
            position: app.user.position || 'Not specified',
            experience: app.user.experience || 0,
            education: app.user.education || 'Not specified'
          }
        }));
        
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        if (error.response) {
          if (error.response.status === 403) {
            alert('You are not authorized to view these applications');
          } else if (error.response.status === 404) {
            alert('Job not found');
          }
        } else {
          alert('Network error - please try again later');
        }
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    async updateStatus(application, status) {
  if (application.status === status) return;

  try {
    const res = await axios.patch(
      `http://localhost:8000/api/applications/${application.id}`,
      { status },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      }
    );

    const index = this.allApplications.findIndex(app => app.id === application.id);
    if (index !== -1) {
      this.allApplications[index].status = status;
      this.allApplications = [...this.allApplications];
    }

    this.$notify({
      type: 'success',
      title: 'Success',
      text: `Application ${status} successfully`
    });

  } catch (error) {
    console.error('Failed to update status:', error);
    this.$notify({
      type: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Failed to update application status'
    });
  }
},
    showApplicationDetails(application) {
      this.selectedApplication = application;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    
    closeModal() {
      this.$emit('close'); // Emit an event to the parent to close the modal
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    downloadCV(application) {
      // Implement CV download logic here
      console.log('Downloading CV for:', application.user.name);
    },
    updateStatus(application, newStatus) {
      console.log(`Updating status for ${application.user.name} to ${newStatus}`);
      this.$emit('update-status', application.id, newStatus);
    },
    
    applyFilters() {
      this.showFilterDropdown = false;
    },
    resetFilters() {
      this.filters = {
        experience: '',
        education: ''
      };
      this.showFilterDropdown = false;
    }
  },
  async created() {
    await this.fetchJob();
    await this.fetchApplications();
  }
};
</script>

<style scoped>
.applications-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  padding: 10px 0;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}
/* Modal Styles */
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
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.close-modal:hover {
  color: #333;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.candidate-profile {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 25px;
  grid-column: 1 / -1;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-info h3 {
  margin: 0 0 5px 0;
  font-size: 22px;
}

.position {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 16px;
}

.contact-info p {
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.details-section {
  margin-bottom: 20px;
}

.details-section h4 {
  margin: 15px 0 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #444;
}

.details-section p {
  margin: 0 0 15px 0;
  color: #666;
}

.cover-letter {
  grid-column: 1 / -1;
  margin-top: 15px;
}

.cover-letter h4 {
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cover-letter-content {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  white-space: pre-line;
  line-height: 1.6;
}

.no-cover-letter {
  grid-column: 1 / -1;
  color: #777;
  font-style: italic;
}

.modal-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  grid-column: 1 / -1;
}

/* Make sure card is clickable */
.application-card {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    padding: 15px;
  }
  
  .candidate-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span {
  margin: 0 5px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.back-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.back-btn:hover {
  background-color: #e0e0e0;
}

.controls {
  margin-bottom: 20px;
}

.filter-sort {
  display: flex;
  gap: 10px;
}

.filter-btn, .sort-btn {
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.filter-btn:hover, .sort-btn:hover {
  background-color: #f5f5f5;
}

.icon {
  font-size: 12px;
}

.filter-dropdown, .sort-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 200px;
}

.filter-option {
  margin-bottom: 10px;
}

.filter-option label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.filter-option select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.apply-btn, .reset-btn {
  padding: 8px 12px;
  margin-top: 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.apply-btn {
  background-color: #007bff;
  color: white;
}

.apply-btn:hover {
  background-color: #0069d9;
}

.reset-btn {
  background-color: #6c757d;
  color: white;
}

.reset-btn:hover {
  background-color: #5a6268;
}

.sort-dropdown {
  min-width: 180px;
}

.sort-option {
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.sort-option:hover {
  background-color: #f5f5f5;
}

.sort-option i {
  width: 16px;
  color: #007bff;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.tabs button.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
  font-weight: 600;
}

.tabs button i {
  font-size: 14px;
}

.applications-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.application-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff;
}

.application-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.application-card.accepted {
  border-left: 4px solid #28a745;
}

.application-card.reviewed {
  border-left: 4px solid #0073df;
}

.application-card.rejected {
  border-left: 4px solid #dc3545;
}

.candidate-info {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.candidate-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.candidate-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name-status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.candidate-details h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 18px;
}

.candidate-position {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.candidate-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: #777;
}

.candidate-meta span {
  display: flex;
  align-items: center;
  gap: 3px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.shortlisted {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.accepted {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.rejected {
  background-color: #f8d7da;
  color: #721c24;
}

.application-details {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
}

.application-details p {
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.application-details i {
  width: 16px;
  color: #666;
}

.application-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
}

.action-btn {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.download-btn {
  background-color: #6c757d;
  color: white;
}

.download-btn:hover {
  background-color: #5a6268;
}

.shortlist-btn {
  background-color: #046baf;
  color: #e7e3e3;
}

.shortlist-btn:hover:not(:disabled) {
  background-color: #066eb3;
}

.accept-btn {
  background-color: #28a745;
  color: white;
}

.accept-btn:hover:not(:disabled) {
  background-color: #218838;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
}

.reject-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.loading, .no-applications {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.loading i {
  font-size: 24px;
  margin-bottom: 10px;
}

.no-applications i {
  font-size: 24px;
  opacity: 0.5;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-sort {
    width: 100%;
    flex-direction: column;
  }
  
  .filter-dropdown {
    right: auto;
    left: 0;
  }
  
  .applications-container {
    grid-template-columns: 1fr;
  }
  
  .application-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 5px;
  }
  
  .tabs button {
    padding: 8px 15px;
  }
}
</style>