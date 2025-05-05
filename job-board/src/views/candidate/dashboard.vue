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
          
          <div class="sidebar-menu px-3">
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-home me-2 text-muted"></i>
                <span class="small">Dashboard</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-briefcase me-2 text-muted"></i>
                <span class="small">My Applications</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-primary py-2 px-2 rounded bg-light">
                <i class="fas fa-user-circle me-2"></i>
                <span class="small">My Profile</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-bell me-2 text-muted"></i>
                <span class="small">Job Alerts</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-heart me-2 text-muted"></i>
                <span class="small">Saved Jobs</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-file-alt me-2 text-muted"></i>
                <span class="small">My Resume</span>
              </a>
            </div>
          </div>
          
          <!-- Logout Button -->
          <div class="mt-auto px-3 pt-5">
            <button class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2" @click="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        </div>

        <!-- Main Content - slightly adjusted width -->
        <div class="col-md-9-5 p-4 bg-light">
          <!-- Enhanced Search Bar above Settings heading -->
          <div class="enhanced-search-container mb-4">
            <div class="search-box-enhanced">
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0">
                  <i class="fas fa-search text-primary"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control border-start-0" 
                  placeholder="Search settings, profile info, etc..." 
                  v-model="settingsSearch"
                  aria-label="Search settings"
                >
              </div>
            </div>
          </div>
          
          <h6 class="mb-4">Settings</h6>
          
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
                <i class="fas fa-id-card me-1"></i> Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#"
                 :class="{ 'active': activeTab === 'social' }"
                 @click="setActiveTab('social')">
                <i class="fas fa-share-alt me-1"></i> Social Links
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link small py-2 px-3" href="#"
                 :class="{ 'active': activeTab === 'account' }"
                 @click="setActiveTab('account')">
                <i class="fas fa-cog me-1"></i> Account Setting
              </a>
            </li>
          </ul>
          
          <!-- Profile Section -->
          <div v-if="activeTab === 'profile'" class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Profile Information</h6>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small">Nationality</label>
                  <div class="input-group">
                    <select class="form-select form-select-sm" v-model="nationality">
                      <option value="">Select...</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="other">Other</option>
                    </select>
                    <span class="input-group-text bg-white border-start-0">
                      <i class="fas fa-chevron-down text-muted small"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Date of Birth</label>
                  <div class="input-group">
                    <input type="text" class="form-control form-control-sm" placeholder="DD/MM/YYYY" v-model="dateOfBirth">
                    <span class="input-group-text bg-white">
                      <i class="fas fa-calendar-alt text-muted"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Gender</label>
                  <div class="input-group">
                    <select class="form-select form-select-sm" v-model="gender">
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                    <span class="input-group-text bg-white border-start-0">
                      <i class="fas fa-chevron-down text-muted small"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Marital Status</label>
                  <div class="input-group">
                    <select class="form-select form-select-sm" v-model="maritalStatus">
                      <option value="">Select...</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                    <span class="input-group-text bg-white border-start-0">
                      <i class="fas fa-chevron-down text-muted small"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Education</label>
                  <div class="input-group">
                    <select class="form-select form-select-sm" v-model="education">
                      <option value="">Select...</option>
                      <option value="high-school">High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                    <span class="input-group-text bg-white border-start-0">
                      <i class="fas fa-chevron-down text-muted small"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Experience</label>
                  <div class="input-group">
                    <select class="form-select form-select-sm" v-model="experience">
                      <option value="">Select...</option>
                      <option value="0">Less than 1 year</option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="4">4+ years</option>
                    </select>
                    <span class="input-group-text bg-white border-start-0">
                      <i class="fas fa-chevron-down text-muted small"></i>
                    </span>
                  </div>
                </div>
                
                <div class="col-12">
                  <label class="form-label small">Biography</label>
                  <textarea 
                    class="form-control" 
                    rows="4" 
                    placeholder="Write down your biography here. Let the employers know who you are..."
                    v-model="biography"
                  ></textarea>
                  
                  <div class="text-editor-toolbar mt-2">
                    <button class="btn btn-sm btn-light border"><i class="fas fa-bold"></i></button>
                    <button class="btn btn-sm btn-light border mx-1"><i class="fas fa-italic"></i></button>
                    <button class="btn btn-sm btn-light border"><i class="fas fa-underline"></i></button>
                    <button class="btn btn-sm btn-light border mx-1"><i class="fas fa-link"></i></button>
                    <button class="btn btn-sm btn-light border"><i class="fas fa-list"></i></button>
                  </div>
                </div>
              </div>
              
              <div class="text-end mt-4">
                <button class="btn btn-primary btn-sm px-4" @click="saveProfileChanges">Save Changes</button>
              </div>
            </div>
          </div>
          
          <!-- Personal Information Section -->
          <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm mb-4">
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
                        <small class="text-muted fs-11">Browse photo</small>
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
                      <label class="form-label small">Full name</label>
                      <input type="text" class="form-control form-control-sm" v-model="fullName" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Professional Title</label>
                      <input type="text" class="form-control form-control-sm" v-model="profileName" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Email</label>
                      <input type="email" class="form-control form-control-sm" v-model="email" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Phone</label>
                      <input type="tel" class="form-control form-control-sm" v-model="phone" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small">Website</label>
                      <input type="url" class="form-control form-control-sm" v-model="website" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-end mt-4">
                <button class="btn btn-primary btn-sm px-4" @click="saveChanges">Save Changes</button>
              </div>
            </div>
          </div>
          
          <!-- CV/Resume Section at the bottom of Personal tab -->
          <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Your CV/Resume</h6>
              
              <div class="row g-3">
                <div class="col-md-4" v-for="(resume, index) in resumes" :key="index">
                  <div class="card h-100 border">
                    <div class="card-body p-3">
                      <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                          <i class="far fa-file-pdf text-danger me-2"></i>
                          <span class="small">{{ resume.name }}</span>
                        </div>
                        <div class="dropdown">
                          <button class="btn btn-sm p-0" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v text-muted"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item small" href="#" @click="downloadResume(index)"><i class="fas fa-download me-2"></i> Download</a></li>
                            <li><a class="dropdown-item small text-danger" href="#" @click="deleteResume(index)"><i class="fas fa-trash-alt me-2"></i> Delete</a></li>
                          </ul>
                        </div>
                      </div>
                      <small class="text-muted d-block mb-2">{{ resume.size }}</small>
                      <div class="d-flex">
                        <button class="btn btn-sm btn-outline-primary py-1 px-2 me-2" @click="downloadResume(index)">
                          <i class="fas fa-download me-1"></i> Download
                        </button>
                        <button class="btn btn-sm btn-outline-danger py-1 px-2" @click="deleteResume(index)">
                          <i class="fas fa-trash-alt me-1"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Upload New CV Card -->
                <div class="col-md-4">
                  <div class="card h-100 border dashed-border">
                    <div class="card-body p-3 d-flex flex-column align-items-center justify-content-center" 
                         style="min-height: 150px; cursor: pointer;"
                         @click="triggerResumeUpload">
                      <i class="fas fa-cloud-upload-alt text-primary fa-2x mb-2"></i>
                      <span class="small text-center">Upload New CV/Resume</span>
                      <small class="text-muted mt-1">PDF, DOC, DOCX (Max 5MB)</small>
                      <input 
                        type="file" 
                        ref="resumeInput" 
                        accept=".pdf,.doc,.docx" 
                        @change="handleResumeUpload" 
                        class="d-none"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Links Section -->
          <div v-if="activeTab === 'social'" class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Social Media Links</h6>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small">LinkedIn</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white">
                      <i class="fab fa-linkedin-in text-primary"></i>
                    </span>
                    <input type="url" class="form-control form-control-sm" placeholder="LinkedIn profile URL" v-model="linkedin" />
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Twitter</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white">
                      <i class="fab fa-twitter text-info"></i>
                    </span>
                    <input type="url" class="form-control form-control-sm" placeholder="Twitter profile URL" v-model="twitter" />
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">GitHub</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white">
                      <i class="fab fa-github text-dark"></i>
                    </span>
                    <input type="url" class="form-control form-control-sm" placeholder="GitHub profile URL" v-model="github" />
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label small">Facebook</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white">
                      <i class="fab fa-facebook-f text-primary"></i>
                    </span>
                    <input type="url" class="form-control form-control-sm" placeholder="Facebook profile URL" v-model="facebook" />
                  </div>
                </div>
              </div>
              
              <div class="text-end mt-4">
                <button class="btn btn-primary btn-sm px-4" @click="saveSocialLinks">Save Changes</button>
              </div>
            </div>
          </div>
          
          <!-- Account Settings Section -->
          <div v-if="activeTab === 'account'" class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
              <h6 class="card-title mb-4 fw-normal">Account Settings</h6>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small">Current Password</label>
                  <input type="password" class="form-control form-control-sm" v-model="currentPassword" />
                </div>
                <div class="col-md-6">
                  <label class="form-label small">New Password</label>
                  <input type="password" class="form-control form-control-sm" v-model="newPassword" />
                </div>
                <div class="col-md-6">
                  <label class="form-label small">Confirm New Password</label>
                  <input type="password" class="form-control form-control-sm" v-model="confirmNewPassword" />
                </div>
              </div>
              
              <div class="text-end mt-4">
                <button class="btn btn-primary btn-sm px-4" @click="updatePassword">Update Password</button>
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

// Search functionality
const settingsSearch = ref('')

// Profile data
const profilePhoto = ref(null)
const profileName = ref('Full Stack Developer')
const fullName = ref('John Doe')
const email = ref('john.doe@example.com')
const phone = ref('+1 202-555-0156')
const experience = ref('3')
const education = ref('bachelor')
const website = ref('https://johndoe.com')
const photoInput = ref(null)
const resumeInput = ref(null)

// Profile details
const nationality = ref('us')
const dateOfBirth = ref('15/05/1990')
const gender = ref('male')
const maritalStatus = ref('single')
const biography = ref('Experienced Full Stack Developer with 3+ years of experience building web applications using Vue.js and Laravel. Passionate about creating user-friendly interfaces and optimizing backend performance.')

// Social links
const linkedin = ref('https://linkedin.com/in/johndoe')
const twitter = ref('https://twitter.com/johndoe')
const github = ref('https://github.com/johndoe')
const facebook = ref('')

// Account settings
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// Resume data
const resumes = ref([
  { name: 'Professional_Resume_2023.pdf', size: '2.5 MB', file: null },
  { name: 'Portfolio_John_Doe.pdf', size: '1.8 MB', file: null }
])

// Active states
const activeTab = ref('personal')

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab
}

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

const triggerResumeUpload = () => {
  resumeInput.value.click()
}

const handleResumeUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit')
      return
    }
    
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

const downloadResume = (index) => {
  // In a real app, this would download the file
  console.log('Downloading resume:', resumes.value[index].name)
}

const deleteResume = (index) => {
  if (confirm('Are you sure you want to delete this resume?')) {
    resumes.value.splice(index, 1)
  }
}

const saveChanges = () => {
  // In a real app, this would save changes to the server
  console.log('Saving changes...')
}

const logout = () => {
  // In a real app, this would log the user out
  console.log('Logging out...')
}
</script>

<style scoped>
/* Enhanced search styling */
.enhanced-search-container {
  max-width: 500px;
  margin-left: 0;
}

.search-box-enhanced {
  width: 100%;
}

.search-box-enhanced .input-group {
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-radius: 6px;
  overflow: hidden;
}

.search-box-enhanced .input-group-text {
  border-radius: 6px 0 0 6px;
  padding: 0.5rem 0.75rem;
  border-color: #e9ecef;
}

.search-box-enhanced .form-control {
  border-color: #e9ecef;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

.search-box-enhanced .form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

/* Sidebar menu item styling */
.sidebar-menu-item a {
  transition: all 0.2s ease;
}

.sidebar-menu-item a:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.sidebar-menu-item a.text-primary {
  font-weight: 500;
}

/* Dashed border for upload card */
.dashed-border {
  border: 1px dashed #ddd !important;
  transition: all 0.3s ease;
}

.dashed-border:hover {
  border-color: #0d6efd !important;
}

/* Profile upload styling */
.profile-upload .upload-preview {
  transition: all 0.3s ease;
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




