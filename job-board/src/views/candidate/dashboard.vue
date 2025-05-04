<template>
  <div class="dashboard-container">
    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom py-2">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center">
          <a class="navbar-brand me-4" href="#">
            <img src="@/assets/logo.svg" alt="MyJob Logo" width="20" class="d-inline-block align-text-top" />
            <span class="fw-bold text-primary ms-1 fs-6">MyJob</span>
          </a>
          <div class="navbar-nav me-auto d-flex flex-row gap-3">
            <a class="nav-link small px-2" href="#">Home</a>
            <a class="nav-link small px-2" href="#">Find Job</a>
            <a class="nav-link small px-2" href="#">Find Employers</a>
            <a class="nav-link small px-2 active" href="#">Dashboard</a>
            <a class="nav-link small px-2" href="#">Job Alerts</a>
            <a class="nav-link small px-2" href="#">Candidate Support</a>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-3 small"><i class="fas fa-phone-alt me-1"></i> +1 202-555-0156</span>
          <div class="dropdown">
            <button class="btn btn-sm dropdown-toggle d-flex align-items-center py-1" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://flagcdn.com/w20/us.png" width="16" alt="English" class="me-1" />
              <span class="small">English</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li><a class="dropdown-item small" href="#">English</a></li>
              <li><a class="dropdown-item small" href="#">Spanish</a></li>
              <li><a class="dropdown-item small" href="#">French</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Area with slightly wider sidebar -->
    <div class="container-fluid px-0">
      <div class="row g-0">
        <!-- Sidebar - slightly increased width -->
        <div class="col-md-2-5 sidebar py-3 border-end">
          <div class="d-flex align-items-center px-3 mb-3">
            <img src="@/assets/logo.svg" alt="MyJob Logo" width="18" class="me-2" />
            <span class="fw-bold text-primary small">MyJob</span>
            <span class="ms-auto badge bg-primary rounded-pill small py-1 px-2">Jobs</span>
          </div>
          
          <div class="search-box mb-4 px-3">
            <div class="input-group search-input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="fas fa-search text-primary"></i>
              </span>
              <input 
                type="text" 
                class="form-control border-start-0 py-2" 
                placeholder="Job title, keyword, company" 
              />
              <button class="btn btn-primary btn-sm px-3" type="button">
                <i class="fas fa-filter"></i>
              </button>
            </div>
          </div>
          
          <p class="text-uppercase small text-muted mb-2 px-3 fs-11">Candidate Dashboard</p>
          <ul class="nav flex-column px-2">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center py-2 small" href="#" 
                 :class="{ 'active': activeMenuItem === 'overview' }"
                 @click="setActiveMenuItem('overview')">
                <i class="fas fa-th-large me-2" :class="activeMenuItem === 'overview' ? 'text-primary' : 'text-muted'"></i> 
                <span :class="activeMenuItem === 'overview' ? 'text-primary' : ''">Overview</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center py-2 small" href="#"
                 :class="{ 'active': activeMenuItem === 'applied' }"
                 @click="setActiveMenuItem('applied')">
                <i class="fas fa-briefcase me-2" :class="activeMenuItem === 'applied' ? 'text-primary' : 'text-muted'"></i> 
                <span :class="activeMenuItem === 'applied' ? 'text-primary' : ''">Applied Jobs</span>
                <span class="ms-auto badge rounded-pill bg-light text-dark small">12</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center py-2 small" href="#"
                 :class="{ 'active': activeMenuItem === 'saved' }"
                 @click="setActiveMenuItem('saved')">
                <i class="far fa-heart me-2" :class="activeMenuItem === 'saved' ? 'text-primary' : 'text-muted'"></i> 
                <span :class="activeMenuItem === 'saved' ? 'text-primary' : ''">Saved Jobs</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center py-2 small" href="#"
                 :class="{ 'active': activeMenuItem === 'alerts' }"
                 @click="setActiveMenuItem('alerts')">
                <i class="fas fa-bell me-2" :class="activeMenuItem === 'alerts' ? 'text-primary' : 'text-muted'"></i> 
                <span :class="activeMenuItem === 'alerts' ? 'text-primary' : ''">Job Alerts</span>
                <span class="ms-auto badge rounded-pill bg-light text-dark small">5</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center py-2 small" href="#"
                 :class="{ 'active': activeMenuItem === 'settings' }"
                 @click="setActiveMenuItem('settings')">
                <i class="fas fa-cog me-2" :class="activeMenuItem === 'settings' ? 'text-primary' : 'text-muted'"></i> 
                <span :class="activeMenuItem === 'settings' ? 'text-primary' : ''">Settings</span>
              </a>
            </li>
          </ul>
          
          <!-- Logout Button -->
          <div class="mt-auto px-3 pt-5">
            <button class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2" @click="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        </div>

        <!-- Main Content - slightly adjusted width -->
        <div class="col-md-9-5 p-4 bg-light">
          <h6 class="mb-4">Setting</h6>
          
          <!-- Tabs -->
          <ul class="nav nav-tabs mb-4 border-0">
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#" 
                 :class="{ 'active': activeTab === 'personal' }"
                 @click="setActiveTab('personal')">
                <i class="fas fa-user me-1"></i> Personal
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#"
                 :class="{ 'active': activeTab === 'profile' }"
                 @click="setActiveTab('profile')">
                <i class="fas fa-lock me-1"></i> Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#"
                 :class="{ 'active': activeTab === 'social' }"
                 @click="setActiveTab('social')">
                <i class="fas fa-id-card me-1"></i> Social Links
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#"
                 :class="{ 'active': activeTab === 'account' }"
                 @click="setActiveTab('account')">
                <i class="fas fa-bell me-1"></i> Account Setting
              </a>
            </li>
          </ul>
          
          <!-- Basic Information Section -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Basic Information</h6>
              
              <div class="row">
                <div class="col-md-3">
                  <div class="profile-upload text-center mb-3">
                    <div class="upload-preview rounded-circle mx-auto position-relative" 
                         style="width: 100px; height: 100px; border: 1px dashed #ddd;"
                         @click="triggerPhotoUpload">
                      <img v-if="profilePhoto" :src="profilePhoto" alt="Profile Photo" class="rounded-circle w-100 h-100 object-fit-cover" />
                      <div v-else class="upload-placeholder d-flex flex-column align-items-center justify-content-center h-100">
                        <i class="fas fa-user-circle fa-2x text-muted mb-1"></i>
                        <small class="text-muted fs-11">Browse photo or drop here</small>
                        <small class="text-muted fs-11">Maximum file size: 2MB</small>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      ref="photoInput" 
                      accept="image/*" 
                      @change="handlePhotoUpload" 
                      class="d-none"
                    >
                  </div>
                </div>
                
                <div class="col-md-9">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label small">Profile Picture</label>
                      <input type="text" class="form-control form-control-sm" v-model="profileName" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Full name</label>
                      <input type="text" class="form-control form-control-sm" v-model="fullName" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Experience</label>
                      <select class="form-select form-select-sm" v-model="experience">
                        <option value="">Select...</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4+ years</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Education</label>
                      <select class="form-select form-select-sm" v-model="education">
                        <option value="">Select...</option>
                        <option value="high-school">High School</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <label class="form-label small">Personal Website</label>
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">https://</span>
                        <input type="text" class="form-control" placeholder="website.com" v-model="website" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-end mt-4">
                <button class="btn btn-primary btn-sm px-4" @click="saveChanges">Save Changes</button>
              </div>
            </div>
          </div>
          
          <!-- CV/Resume Section -->
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Your CV/Resume</h6>
              
              <div class="row g-3">
                <div class="col-md-4" v-for="(resume, index) in resumes" :key="index">
                  <div class="card h-100 border">
                    <div class="card-body p-3">
                      <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                          <i class="far fa-file-pdf text-primary me-2"></i>
                          <span class="small">{{ resume.name }}</span>
                        </div>
                        <button class="btn btn-sm p-0" @click="deleteResume(index)">
                          <i class="fas fa-trash-alt text-danger"></i>
                        </button>
                      </div>
                      <small class="text-muted d-block">{{ resume.size }}</small>
                      <div class="mt-2">
                        <button class="btn btn-sm btn-outline-danger py-1 px-2 small" @click="deleteResume(index)">
                          <i class="fas fa-trash-alt me-1"></i> Delete
                        </button>
                        <button class="btn btn-sm btn-outline-secondary py-1 px-2 ms-1 small" @click="downloadResume(index)">
                          <i class="fas fa-download me-1"></i> Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4">
                <button class="btn btn-outline-primary btn-sm" @click="triggerResumeUpload">
                  <i class="fas fa-plus me-2"></i> Add CV/Resume
                </button>
                <small class="text-muted ms-3">Browse file in .doc, .docx, .pdf</small>
                <input 
                  type="file" 
                  ref="resumeInput" 
                  accept=".doc,.docx,.pdf" 
                  @change="handleResumeUpload" 
                  class="d-none"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-light border-top py-2 mt-auto">
      <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center">
          <small class="text-muted fs-11">© 2024 MyJob - Job Portal. All Rights Reserved</small>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Profile data
const profilePhoto = ref(null)
const profileName = ref('Full name')
const fullName = ref('Title/Headline')
const experience = ref('')
const education = ref('')
const website = ref('')
const photoInput = ref(null)
const resumeInput = ref(null)

// Active states
const activeMenuItem = ref('settings')
const activeTab = ref('personal')

// Resume data
const resumes = ref([
  { name: 'Professional Resume', size: '2.5 MB', file: null },
  { name: 'Product Designer', size: '1.2 MB', file: null },
  { name: 'Visual Designer', size: '1.5 MB', file: null }
])

// Navigation methods
const setActiveMenuItem = (item) => {
  activeMenuItem.value = item
}

const setActiveTab = (tab) => {
  activeTab.value = tab
}

// Photo upload methods
const triggerPhotoUpload = () => {
  photoInput.value.click()
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePhoto.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Resume upload methods
const triggerResumeUpload = () => {
  resumeInput.value.click()
}

const handleResumeUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Format file size
    const size = file.size / 1024 / 1024
    const formattedSize = size.toFixed(1) + ' MB'
    
    // Add new resume to the list
    resumes.value.push({
      name: file.name,
      size: formattedSize,
      file: file
    })
  }
}

// Resume management methods
const downloadResume = (index) => {
  const resume = resumes.value[index]
  
  if (resume.file) {
    // If we have an actual file object (from upload)
    const url = URL.createObjectURL(resume.file)
    const a = document.createElement('a')
    a.href = url
    a.download = resume.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } else {
    // For demo purposes - in a real app, you'd download from server
    alert(`Downloading ${resume.name}...`)
  }
}

const deleteResume = (index) => {
  if (confirm(`Are you sure you want to delete "${resumes.value[index].name}"?`)) {
    resumes.value.splice(index, 1)
  }
}

// Save changes
const saveChanges = () => {
  // In a real app, you would send this data to your backend
  alert('Profile information saved successfully!')
}

// Logout
const logout = () => {
  // In a real app, you would handle logout logic here
  alert('Logging out...')
}

onMounted(() => {
  // Initialize Bootstrap dropdowns
  if (typeof bootstrap !== 'undefined') {
    const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]')
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))
  }
})
</script>

<style scoped>
/* Custom column widths */
.col-md-2-5 {
  flex: 0 0 auto;
  width: 20%; /* Slightly wider than col-md-2 (16.67%) */
}

.col-md-9-5 {
  flex: 0 0 auto;
  width: 80%; /* Adjusted to complement the sidebar */
}

.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar {
  background-color: #ffffff;
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
}

.nav-link {
  color: #6c757d;
  border-radius: 0.25rem;
}

.nav-link:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.nav-link.active {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
  font-weight: 500;
}

.card {
  border-radius: 0.375rem;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  background-color: transparent;
}

.profile-upload .upload-preview:hover {
  border-color: #0d6efd;
  cursor: pointer;
}

.fs-11 {
  font-size: 11px;
}

.object-fit-cover {
  object-fit: cover;
}

/* Enhanced search styling */
.search-box {
  width: 100%;
  margin-top: 10px;
}

.search-input-group {
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-radius: 6px;
  overflow: hidden;
}

.search-input-group .input-group-text {
  border-radius: 6px 0 0 6px;
  padding: 0.5rem 0.75rem;
  border-color: #e9ecef;
}

.search-input-group .form-control {
  border-color: #e9ecef;
  font-size: 0.875rem;
}

.search-input-group .form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.search-input-group .btn {
  border-radius: 0 6px 6px 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .col-md-2-5, .col-md-9-5 {
    width: 100%;
  }
  
  .sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow-y: auto;
  }
}

.dropdown-menu {
  min-width: 8rem;
  padding: 0.25rem 0;
  font-size: 0.875rem;
}

.dropdown-item {
  padding: 0.4rem 1rem;
}

.dropdown-item.text-danger:hover {
  background-color: rgba(220, 53, 69, 0.05);
}

.dropdown-divider {
  margin: 0.25rem 0;
}
</style>




