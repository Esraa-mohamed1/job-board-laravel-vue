<template>
  <div class="profile-container">
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
    <div v-if="activeTab === 'profile'" class="card mb-4 border-0 shadow-sm">
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
    <div v-if="activeTab === 'personal'" class="card mb-4 border-0 shadow-sm">
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
    
    <!-- Social Links Section -->
    <div v-if="activeTab === 'social'" class="card mb-4 border-0 shadow-sm">
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
    <div v-if="activeTab === 'account'" class="card mb-4 border-0 shadow-sm">
      <div class="card-body p-4">
        <h6 class="card-title mb-4 fw-normal">Account Settings</h6>
        
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label small">Current Password</label>
            <input type="password" class="form-control form-control-sm" placeholder="Enter current password" v-model="currentPassword" />
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">New Password</label>
            <input type="password" class="form-control form-control-sm" placeholder="Enter new password" v-model="newPassword" />
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">Confirm Password</label>
            <input type="password" class="form-control form-control-sm" placeholder="Confirm new password" v-model="confirmPassword" />
          </div>
        </div>
        
        <div class="text-end mt-4">
          <button class="btn btn-primary btn-sm px-4" @click="updatePassword">Update Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Active tab state
const activeTab = ref('profile')

// Profile data
const nationality = ref('')
const dateOfBirth = ref('')
const gender = ref('')
const maritalStatus = ref('')
const education = ref('')
const experience = ref('')
const biography = ref('')

// Personal data
const profilePhoto = ref(null)
const fullName = ref('')
const profileName = ref('')
const email = ref('')
const phone = ref('')
const website = ref('')

// Social links data
const linkedin = ref('')
const twitter = ref('')
const github = ref('')
const facebook = ref('')

// Account settings data
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// Navigation methods
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// Photo upload methods
const photoInput = ref(null)
const triggerPhotoUpload = () => {
  photoInput.value.click()
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePhoto.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Save methods
const saveProfileChanges = () => {
  // In a real app, you would send this data to your backend
  alert('Profile information saved successfully!')
}

const saveChanges = () => {
  // In a real app, you would send this data to your backend
  alert('Personal information saved successfully!')
}

const saveSocialLinks = () => {
  // In a real app, you would send this data to your backend
  alert('Social links saved successfully!')
}

const updatePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match!')
    return
  }
  
  // In a real app, you would send this data to your backend
  alert('Password updated successfully!')
}
</script>

<style scoped>
.profile-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link.active {
  color: #0A65CC;
  background: none;
  border-bottom: 2px solid #0A65CC;
}

.card {
  border-radius: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #495057;
}

.form-control, .form-select {
  border-color: #dee2e6;
}

.form-control:focus, .form-select:focus {
  border-color: #0A65CC;
  box-shadow: 0 0 0 0.25rem rgba(10, 101, 204, 0.1);
}

.input-group-text {
  padding: 0.25rem 0.5rem;
}

.text-editor-toolbar button {
  padding: 0.25rem 0.5rem;
}

.btn-primary {
  background-color: #0A65CC;
  border-color: #0A65CC;
}

.btn-primary:hover {
  background-color: #0956af;
  border-color: #0956af;
}

.upload-preview {
  transition: border-color 0.3s;
}

.upload-preview:hover {
  border-color: #0A65CC;
  cursor: pointer;
}

.fs-11 {
  font-size: 11px;
}
</style>
