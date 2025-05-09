<template>
    <div class="applications-page">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb">
        <router-link to="/employer/dashboard">Home</router-link>
        <span> / </span>
        <router-link to="/employer/dashboard/myjobs">Jobs</router-link>
        <span> / </span>
       {{ job.title }}
        <span> / </span>
        <span>Applications</span>
      </div>
  
      <div class="header">
        <h1>Job Applications</h1>
        <router-link to="/employer/dashboard/myjobs" class="back-btn">
          &larr; Back to Jobs
        </router-link>
      </div>
  
      <div class="controls">
        <div class="tabs">
          <button 
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
          >
            All Applications ({{ allApplications.length }})
          </button>
          <button 
            :class="{ active: activeTab === 'shortlisted' }"
            @click="activeTab = 'shortlisted'"
          >
            Shortlisted ({{ shortlistedApplications.length }})
          </button>
        </div>
  
        <div class="filter-sort">
          <div class="filter">
            <button @click="showFilterDropdown = !showFilterDropdown" class="filter-btn">
              Filter
              <span class="icon">▼</span>
            </button>
            <div v-if="showFilterDropdown" class="filter-dropdown">
              <div class="filter-option">
                <label>Experience:</label>
                <select v-model="filters.experience">
                  <option value="">All</option>
                  <option value="1">1+ years</option>
                  <option value="3">3+ years</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                </select>
              </div>
              <div class="filter-option">
                <label>Education:</label>
                <select v-model="filters.education">
                  <option value="">All</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <button @click="applyFilters" class="apply-btn">Apply</button>
              <button @click="resetFilters" class="reset-btn">Reset</button>
            </div>
          </div>
  
          <div class="sort">
            <button @click="showSortDropdown = !showSortDropdown" class="sort-btn">
              Sort
              <span class="icon">▼</span>
            </button>
            <div v-if="showSortDropdown" class="sort-dropdown">
              <div class="sort-option" @click="sortApplications('newest')">
                <input type="radio" id="newest" v-model="sortBy" value="newest">
                <label for="newest">Newest</label>
              </div>
              <div class="sort-option" @click="sortApplications('oldest')">
                <input type="radio" id="oldest" v-model="sortBy" value="oldest">
                <label for="oldest">Oldest</label>
              </div>
              <div class="sort-option" @click="sortApplications('experience')">
                <input type="radio" id="experience" v-model="sortBy" value="experience">
                <label for="experience">Experience (High to Low)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="activeTab === 'all'" class="applications-container">
        <div v-if="loading" class="loading">Loading applications...</div>
        <div v-else-if="filteredApplications.length === 0" class="no-applications">
          No applications found for this job
        </div>
        
        <div v-else v-for="application in filteredApplications" :key="application.id" class="application-card">
          <div class="candidate-info">
            <h3>{{ application.candidateName }}</h3>
            <p class="position">{{ application.position }}</p>
          </div>
          
          <div class="application-details">
            <p><strong>{{ application.experience }} Years Experience</strong></p>
            <p>Education: {{ application.education }}</p>
            <p>Applied: {{ formatDate(application.appliedDate) }}</p>
          </div>
          
          <div class="application-actions">
            <button class="download-btn" @click="downloadCV(application)">
              Download CV
            </button>
            <button 
              class="shortlist-btn" 
              @click="toggleShortlist(application)"
              :disabled="application.status === 'shortlisted'"
            >
              {{ application.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist' }}
            </button>
          </div>
        </div>
      </div>
  
      <div v-else class="applications-container">
        <div v-if="loading" class="loading">Loading applications...</div>
        <div v-else-if="filteredShortlisted.length === 0" class="no-applications">
          No shortlisted applications
        </div>
        
        <div v-else v-for="application in filteredShortlisted" :key="application.id" class="application-card">
          <div class="candidate-info">
            <h3>{{ application.candidateName }}</h3>
            <p class="position">{{ application.position }}</p>
          </div>
          
          <div class="application-details">
            <p><strong>{{ application.experience }} Years Experience</strong></p>
            <p>Education: {{ application.education }}</p>
            <p>Applied: {{ formatDate(application.appliedDate) }}</p>
          </div>
          
          <div class="application-actions">
            <button class="download-btn" @click="downloadCV(application)">
              Download CV
            </button>
            <button class="remove-btn" @click="toggleShortlist(application)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
        activeTab: 'all',
        loading: true,
        showFilterDropdown: false,
        showSortDropdown: false,
        filters: {
          experience: '',
          education: ''
        },
        sortBy: 'newest',
        originalApplications: []
      };
    },
    computed: {
      filteredApplications() {
        let apps = this.allApplications;
        
        // Apply filters
        if (this.filters.experience) {
          apps = apps.filter(app => app.experience >= parseInt(this.filters.experience));
        }
        
        if (this.filters.education) {
          apps = apps.filter(app => app.education.includes(this.filters.education));
        }
        
        // Apply sorting
        return this.sortApps([...apps]);
      },
      filteredShortlisted() {
        return this.sortApps([...this.shortlistedApplications]);
      }
    },
    async created() {
      await this.fetchJob();
      await this.fetchApplications();
    },
    methods: {
      async fetchJob() {
        try {
          const response = await fetch(`http://localhost:3000/jobs/${this.id}`);
          this.job = await response.json();
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      },
      
      async fetchApplications() {
        try {
          const response = await fetch(`http://localhost:3000/applications?jobId=${this.id}`);
          const data = await response.json();
          
          this.allApplications = data.map(app => ({
            id: app.id,
            candidateName: this.getCandidateName(app.candidateId),
            position: this.getCandidatePosition(app.candidateId),
            experience: this.getRandomExperience(),
            education: this.getRandomEducation(),
            appliedDate: app.appliedDate || new Date().toISOString(),
            status: app.status || 'pending',
            cvUrl: app.cvUrl || '#'
          }));
          
          this.originalApplications = [...this.allApplications];
          this.shortlistedApplications = this.allApplications.filter(app => app.status === 'shortlisted');
          
        } catch (error) {
          console.error('Error fetching applications:', error);
        } finally {
          this.loading = false;
        }
      },
      
      getCandidateName(candidateId) {
        const names = ['Ronald Richards', 'Theresa Webb', 'Devon Lane', 'Kathryn Murphy', 'Darrell Steward', 'Jenny Wilson'];
        return names[candidateId % names.length] || 'Unknown Candidate';
      },
      
      getCandidatePosition(candidateId) {
        const positions = ['UI/UX Designer', 'Product Designer', 'User Experience Designer', 'UI Designer'];
        return positions[candidateId % positions.length] || 'Designer';
      },
      
      getRandomExperience() {
        return Math.floor(Math.random() * 10) + 1;
      },
      
      getRandomEducation() {
        const educations = ['High School Degree', 'Bachelor Degree', 'Master Degree', 'PhD'];
        return educations[Math.floor(Math.random() * educations.length)];
      },
      
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      },
      
      sortApps(apps) {
        switch(this.sortBy) {
          case 'newest':
            return apps.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
          case 'oldest':
            return apps.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
          case 'experience':
            return apps.sort((a, b) => b.experience - a.experience);
          default:
            return apps;
        }
      },
      
      sortApplications(type) {
        this.sortBy = type;
        this.showSortDropdown = false;
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
      },
      
      async toggleShortlist(application) {
        try {
          const newStatus = application.status === 'shortlisted' ? 'pending' : 'shortlisted';
          
          const response = await fetch(`http://localhost:3000/applications/${application.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus })
          });
          
          if (!response.ok) throw new Error('Failed to update application');
          
          application.status = newStatus;
          this.shortlistedApplications = this.allApplications.filter(app => app.status === 'shortlisted');
          
        } catch (error) {
          console.error('Error updating application:', error);
        }
      },
      
      downloadCV(application) {
        console.log('Downloading CV for:', application.candidateName);
        window.open(application.cvUrl, '_blank');
      }
    }
  };
  </script>
  
  <style scoped>
  .applications-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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
  }
  
  .back-btn:hover {
    background-color: #e0e0e0;
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .tabs {
    display: flex;
    gap: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .tabs button {
    padding: 8px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
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
  }
  
  .candidate-info h3 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  .position {
    margin: 0 0 15px 0;
    color: #666;
  }
  
  .application-details {
    margin-bottom: 15px;
  }
  
  .application-details p {
    margin: 5px 0;
    color: #444;
  }
  
  .application-actions {
    display: flex;
    gap: 10px;
  }
  
  .download-btn, .shortlist-btn, .remove-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
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
  }
  </style>