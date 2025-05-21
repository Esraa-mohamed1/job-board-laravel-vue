<template>
  <div class="applications-page">
    <!-- Breadcrumb Navigation -->
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
      <router-link to="/employer/dashboard/myjobs" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Jobs
      </router-link>
    </div>

    <!-- Tabs -->
    <div class="tabs container">
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

    <!-- Applications Container -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading applications...
    </div>

    <div v-else-if="filteredApplications.length === 0" class="no-applications">
      <i class="fas fa-folder-open"></i> No applications found
    </div>

    <div v-else class="applications-container">
      <div 
        v-for="application in filteredApplications" 
        :key="application.id" 
        class="application-card" 
        :class="application.status"
      >
        <!-- Candidate Info -->
        <div class="candidate-info" @click="viewCandidate(application)">
          <div class="candidate-avatar">
            <img :src="application.user.avatar || '/images/default-avatar.png'" :alt="application.user.name">
          </div>
          <div>
            <h3>{{ application.user.name }}</h3>
            <p class="position">{{ application.user.position }}</p>
            <div class="candidate-meta">
              <span><i class="fas fa-briefcase"></i> {{ application.user.experience }} Years</span>
              <span><i class="fas fa-graduation-cap"></i> {{ application.user.education }}</span>
            </div>
          </div>
        </div>

        <!-- Application Details -->
        <div class="application-details">
          <p><i class="fas fa-calendar-alt"></i> Applied: {{ formatDate(application.created_at) }}</p>
          <p><i class="fas fa-id-card"></i> Status: {{ application.status }}</p>
        </div>

        <!-- Actions -->
        <div class="application-actions">
          <button class="download-btn" @click.stop="downloadCV(application)">
            <i class="fas fa-download"></i> CV
          </button>
          
          <template v-if="application.status !== 'accepted'">
            <button 
              class="shortlist-btn" 
              @click.stop="updateStatus(application, 'shortlisted')"
              :disabled="application.status === 'shortlisted'"
            >
              <i class="fas fa-star"></i> {{ application.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist' }}
            </button>
            
            <button 
              class="accept-btn" 
              @click.stop="updateStatus(application, 'accepted')"
            >
              <i class="fas fa-check-circle"></i> Accept
            </button>
          </template>
          
          <span v-else class="badge accepted-badge">
            <i class="fas fa-check-circle"></i> Accepted
          </span>
        </div>
      </div>
    <div class="candidate-profile-header">
          <div class="profile-header-content">
            <div class="profile-image">
              <img :src="getCandidateImage(selectedCandidate.id)" :alt="selectedCandidate.name" />
            </div>
            <div class="profile-info">
              <h2>{{ selectedCandidate.name }}</h2>
              <p class="position">{{ selectedCandidate.position }}</p>
              <div class="profile-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ selectedCandidate.experience || '0' }}</span>
                  <span class="stat-label">Years Exp.</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ selectedCandidate.education || 'Not specified' }}</span>
                  <span class="stat-label">Education</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ selectedCandidate.nationality || 'Not specified' }}</span>
                  <span class="stat-label">Nationality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="candidate-sections">
          <!-- Biography -->
          <div class="section">
            <h3><i class="fas fa-user icon-title"></i> BIOGRAPHY</h3>
            <p class="bio-text">
              {{ selectedCandidate.bio || 'No biography available' }}
            </p>
            <div class="skills-tags">
              <span v-for="(skill, index) in selectedCandidate.skills" :key="index" class="skill-tag">
                <i :class="skillIcons[skill] || 'fas fa-check'"></i> {{ skill }}
              </span>
            </div>
          </div>

          <!-- Cover Letter -->
          <div class="section">
            <h3><i class="fas fa-envelope icon-title"></i> COVER LETTER</h3>
            <div class="cover-letter-box">
              <p class="cover-letter">
                {{ selectedCandidate.coverLetter || 'No cover letter provided' }}
              </p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="section">
            <h3><i class="fas fa-id-card icon-title"></i> CONTACT INFORMATION</h3>
            <div class="contact-details">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ selectedCandidate.location || 'Not specified' }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>{{ selectedCandidate.phone || 'Not specified' }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>{{ selectedCandidate.email || 'Not specified' }}</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="section">
            <h3><i class="fas fa-share-alt icon-title"></i> SOCIAL MEDIA</h3>
            <div class="social-media-links">
              <a v-if="selectedCandidate.linkedin" :href="selectedCandidate.linkedin" class="social-link linkedin">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a v-if="selectedCandidate.twitter" :href="selectedCandidate.twitter" class="social-link twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a v-if="selectedCandidate.github" :href="selectedCandidate.github" class="social-link github">
                <i class="fab fa-github"></i>
              </a>
              <a v-if="selectedCandidate.portfolio" :href="selectedCandidate.portfolio" class="social-link portfolio">
                <i class="fas fa-globe"></i>
              </a>
            </div>
          </div>

          <!-- Resume -->
          <div class="section resume-section">
            <button class="download-btn" @click="downloadResume(selectedCandidate)">
              <i class="fas fa-download"></i> Download Resume
            </button>
            <p class="resume-name">{{ selectedCandidate.name }}.pdf</p>
          </div>

          <!-- Action Buttons -->
          <div class="section action-section" v-if="selectedApplication.status !== 'accepted'">
            <button class="accept-btn" @click="acceptCandidate(selectedApplication)">
              <i class="fas fa-check-circle"></i> Accept Candidate
            </button>
            <button class="shortlist-btn" v-if="selectedApplication.status !== 'shortlisted'" @click="toggleShortlist(selectedApplication)">
              <i class="fas fa-star"></i> Shortlist
            </button>
          </div>
          <div class="section action-section" v-else>
            <button class="contact-btn" @click="contactCandidate(selectedCandidate)">
              <i class="fas fa-envelope"></i> Contact Candidate
            </button>
            <button class="reject-btn badge" @click="rejectCandidate(selectedApplication)">
              <i class="fas fa-times"></i> Reject
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
      required: true
    }
  },
  data() {
    return {
      job: {},
      allApplications: [],
      shortlistedApplications: [],
      acceptedApplications: [],
      activeTab: 'all',
      tabs: ['all', 'shortlisted', 'accepted'],
      tabIcons: {
        all: 'fas fa-list',
        shortlisted: 'fas fa-star',
        accepted: 'fas fa-check-circle'
      },
      tabLabels: {
        all: 'All Applications',
        shortlisted: 'Shortlisted',
        accepted: 'Accepted'
      },
      loading: true,
      showFilterDropdown: false,
      showSortDropdown: false,
      filters: {
        experience: '',
        education: ''
      },
      sortBy: 'newest',
      showCandidateModal: false,
      selectedCandidate: {},
      selectedApplication: {},
      candidatesData: [],
      skillIcons: {
        'UI/UX Design': 'fas fa-palette',
        'Mobile App': 'fas fa-mobile-alt',
        'Wireframing': 'fas fa-pencil-ruler',
        'JavaScript': 'fab fa-js',
        'CSS': 'fab fa-css3-alt',
        'HTML': 'fab fa-html5',
        'React': 'fab fa-react',
        'Vue': 'fab fa-vuejs',
        'Node.js': 'fab fa-node-js'
      }
    };
  },
  computed: {
    tabCounts() {
    return {
      all: this.allApplications.length,
      shortlisted: this.shortlistedApplications.length,
      accepted: this.acceptedApplications.length
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
   filteredShortlisted() {
    return this.filteredApplications.filter(app => app.status === 'shortlisted');
  },
  filteredAccepted() {
    return this.filteredApplications.filter(app => app.status === 'accepted');
  }
  },
  async created() {
    await this.fetchJob();
    await this.fetchApplications();
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
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    this.allApplications = res.data;

    this.shortlistedApplications = this.allApplications.filter(app => app.status === 'shortlisted');
    this.acceptedApplications = this.allApplications.filter(app => app.status === 'accepted');
  } catch (error) {
    console.error('Failed to fetch applications:', error);
  } finally {
    this.loading = false;
  }
},
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  },
  getCandidateImage(userId) {
    return `/api/users/${userId}/avatar`; // Adjust based on your backend API
  },
  viewCandidate(application) {
    this.selectedCandidate = application.user;
    this.selectedApplication = application;
    this.showCandidateModal = true;
  },
  closeCandidateModal() {
    this.showCandidateModal = false;
    this.selectedCandidate = {};
    this.selectedApplication = {};
  },
  applyFilters() {
    // Triggered via filter dropdown – computed properties will handle the filtering
  },
  resetFilters() {
    this.filters.experience = '';
    this.filters.education = '';
  },
  sortApplications(sortBy) {
    this.sortBy = sortBy;
  },
  sortApps(apps) {
    switch (this.sortBy) {
      case 'newest':
        return apps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return apps.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'experience':
        return apps.sort((a, b) => (b.user?.experience || 0) - (a.user?.experience || 0));
      default:
        return apps;
    }
  },
  toggleShortlist(application) {
    const newStatus = application.status === 'shortlisted' ? 'all' : 'shortlisted';
    axios.patch(`http://localhost:8000/api/applications/${application.id}`, { status: newStatus })
      .then(() => this.fetchApplications());
  },
  acceptCandidate(application) {
    axios.patch(`http://localhost:8000/api/applications/${application.id}`, { status: 'accepted' })
      .then(() => this.fetchApplications());
  },
  rejectCandidate(application) {
    axios.patch(`http://localhost:8000/api/applications/${application.id}`, { status: 'rejected' })
      .then(() => this.fetchApplications());
  },
  downloadCV(application) {
    window.open(`http://localhost:8000/api/applications/${application.id}/cv`, '_blank');
  },
  downloadResume(candidate) {
    window.open(`http://localhost:8000/api/users/${candidate.id}/resume`, '_blank');
  },
  contactCandidate(candidate) {
    window.location.href = `mailto:${candidate.email}`;
  }
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
.application-card.accepted {
  border-left: 4px solid #28a745;
  background-color: rgba(40, 167, 69, 0.05);
}

.application-card.shortlisted {
  border-left: 4px solid #ffc107;
  background-color: rgba(255, 193, 7, 0.05);
}

.accept-btn {
  background-color: #28a745;
  color: white;
  border: none;
}

.accept-btn:hover {
  background-color: #218838;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.reject-btn:hover {
  background-color: #c82333;
}

.contact-btn {
  background-color: #17a2b8;
  color: white;
  border: none;
}

.contact-btn:hover {
  background-color: #138496;
}

.badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.accepted-badge {
  background-color: #d4edda;
  color: #155724;
}

.shortlisted-badge {
  background-color: #fff3cd;
  color: #856404;
}

.action-section {
  display: flex;
  justify-content: center;
  gap: 15px;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-top: 20px;
}

.vue-notification {
  padding: 15px;
  margin: 10px;
  font-size: 14px;
  color: white;
  border-radius: 4px;
}

.vue-notification.success {
  background-color: #28a745;
}

.vue-notification.error {
  background-color: #dc3545;
}

.vue-notification.warn {
  background-color: #ffc107;
  color: #333;
}
@media (max-width: 768px) {
  .action-section {
    flex-direction: column;
  }
  
  .application-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .application-actions button {
    width: 100%;
  }
}
  .breadcrumb {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
  }
  
  .breadcrumb a {
    color: #007bff;
    text-decoration: none;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .breadcrumb span {
    margin: 0 5px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
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
  }
  
  .back-btn:hover {
    background-color: #e0e0e0;
  }
  
  .controls {
    margin-bottom: 20px;
 
  }
  
  .tabs {
    
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .tabs button {
    padding: 8px 16px;
    background: none;
    border: none;
    cursor: pointer;
 
  }
  
  .tabs button.active {
    border-bottom: 2px solid #007bff;
    color: #007bff;
    font-weight: bold;
  }
  
  .filter-sort {
    display: flex;
    gap: 15px;
  }
  
  .filter, .sort {
    position: relative;
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
  }
  
  .filter-option select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .apply-btn, .reset-btn {
    padding: 5px 10px;
    margin-top: 10px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
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
    min-width: 220px;
  }
  
  .sort-option {
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .sort-option:hover {
    background-color: #f5f5f5;
  }
  
  .sort-option input {
    margin: 0;
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .application-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .candidate-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .candidate-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .candidate-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .candidate-info h3 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 18px;
  }
  
  .position {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 14px;
  }
  
  .candidate-meta {
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: #777;
  }
  
  .candidate-meta span {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  
  .application-details {
    font-size: 13px;
    color: #666;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .application-details p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .application-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }
  
  .download-btn, .shortlist-btn, .remove-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    flex: 1;
    justify-content: center;
  }
  
  .download-btn {
    background-color: #007bff;
    color: white;
  }
  
  .download-btn:hover {
    background-color: #0069d9;
  }
  
  .shortlist-btn {
    background-color: #28a745;
    color: white;
  }
  
  .shortlist-btn:hover:not(:disabled) {
    background-color: #218838;
  }
  
  .shortlist-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .remove-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .remove-btn:hover {
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
  }
  
  .loading i {
    font-size: 24px;
  }
  
  .no-applications i {
    font-size: 24px;
    opacity: 0.5;
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
    border-radius: 8px;
    position: relative;
  }
  
  .candidate-modal {
    max-width: 800px;
    max-height: 97vh;
    overflow-y: auto;
    padding: 25px;
    width: 90%;
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
    z-index: 1;
  }
  
  .candidate-profile-header {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
  }
  
  .candidate-profile-header::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  .profile-header-content {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid white;
    margin-right: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-info h2 {
    margin: 0;
    font-size: 24px;
  }
  
  .position {
    margin: 5px 0;
    font-size: 16px;
    opacity: 0.9;
  }
  
  .profile-stats {
    display: flex;
    margin-top: 10px;
  }
  
  .stat-item {
    margin-right: 20px;
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-weight: bold;
    font-size: 18px;
  }
  
  .stat-label {
    font-size: 12px;
    opacity: 0.8;
  }
  
  .candidate-sections {
    display: grid;
    gap: 25px;
  }
  
  .section {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .section h3 {
    margin-top: 0;
    color: #444;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .bio-text {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    background-color: #e0e7ff;
    color: #4f46e5;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .cover-letter-box {
    background-color: #f8f9fa;
    border-left: 4px solid #6e8efb;
    padding: 15px;
    border-radius: 0 4px 4px 0;
  }
  
  .cover-letter {
    white-space: pre-line;
    line-height: 1.6;
    margin: 0;
  }
  
  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .contact-item i {
    color: #6e8efb;
    width: 20px;
    text-align: center;
  }
  
  .icon-title {
    margin-right: 8px;
    color: #6e8efb;
  }
  
  .social-media-links {
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    transition: transform 0.3s;
  }
  
  .social-link:hover {
    transform: translateY(-3px);
  }
  
  .social-link.linkedin {
    background-color: #0077b5;
  }
  
  .social-link.twitter {
    background-color: #1da1f2;
  }
  
  .social-link.dribbble {
    background-color: #ea4c89;
  }
  
  .social-link.behance {
    background-color: #1769ff;
  }
  
  .resume-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .download-btn i {
    margin-right: 8px;
  }
  
  .resume-name {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
  
  .status {
    text-transform: capitalize;
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
    font-size: 12px;
  }
  
  .status.pending {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .status.shortlisted {
    background-color: #d4edda;
    color: #155724;
  }
  
  .status.rejected {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .filter-sort {
      width: 100%;
      justify-content: space-between;
    }
    
    .filter-dropdown {
      right: auto;
      left: 0;
    }
    
    .applications-container {
      grid-template-columns: 1fr;
    }
    
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .profile-header-content {
      flex-direction: column;
      text-align: center;
    }
    
    .profile-image {
      margin-right: 0;
      margin-bottom: 15px;
    }
    
    .profile-stats {
      justify-content: center;
    }
    
    .resume-section {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .application-card {
      padding: 15px;
    }
    
    .candidate-info {
      flex-direction: column;
      text-align: center;
    }
    
    .candidate-avatar {
      margin-bottom: 10px;
    }
    
    .candidate-meta {
      justify-content: center;
    }
    
    .application-actions {
      flex-direction: column;
    }
    
    .download-btn, .shortlist-btn, .remove-btn {
      width: 100%;
    }
  }
  </style>