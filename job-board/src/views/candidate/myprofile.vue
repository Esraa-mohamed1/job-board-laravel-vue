<template>
  <div class="dashboard-container">
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
              <select class="form-select form-select-sm" v-model="profileData.nationality">
                <option value="">Select...</option>
                <option value="Egyptian">Egyptian</option>
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
              <input type="date" class="form-control form-control-sm" v-model="profileData.date_of_birth">
              <span class="input-group-text bg-white">
                <i class="fas fa-calendar-alt text-muted"></i>
              </span>
            </div>
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">Gender</label>
            <div class="input-group">
              <select class="form-select form-select-sm" v-model="profileData.gender">
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
              <select class="form-select form-select-sm" v-model="profileData.marital_status">
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
              <select class="form-select form-select-sm" v-model="profileData.education">
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
              <select class="form-select form-select-sm" v-model="profileData.experience">
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
              v-model="profileData.biography"
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
          <button class="btn btn-primary btn-sm px-4" @click="saveProfileChanges" :disabled="userStore.loading">
            <span v-if="userStore.loading" class="spinner-border spinner-border-sm me-1"></span>
            Save Changes
          </button>
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
                <img v-if="profilePhotoUrl" :src="profilePhotoUrl" alt="Profile Photo" class="rounded-circle w-100 h-100 object-fit-cover" />
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
                <input type="text" class="form-control form-control-sm" v-model="userData.name" />
              </div>
              <div class="col-md-6">
                <label class="form-label small">Professional Title</label>
                <input type="text" class="form-control form-control-sm" v-model="userData.professional_title" />
              </div>
              <div class="col-md-6">
                <label class="form-label small">Email</label>
                <input type="email" class="form-control form-control-sm" v-model="userData.email" />
              </div>
              <div class="col-md-6">
                <label class="form-label small">Phone</label>
                <input type="tel" class="form-control form-control-sm" v-model="userData.phone" />
              </div>
              <div class="col-md-6">
                <label class="form-label small">Website</label>
                <input type="url" class="form-control form-control-sm" v-model="userData.website" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-end mt-4">
          <button class="btn btn-primary btn-sm px-4" @click="savePersonalChanges" :disabled="userStore.loading">
            <span v-if="userStore.loading" class="spinner-border spinner-border-sm me-1"></span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
    
    <!-- CV/Resume Section at the bottom of Personal tab -->
    <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <h6 class="card-title mb-4 fw-normal">Your CV/Resume</h6>
        
        <div class="row g-3">
          <div class="col-md-4" v-for="resume in (userStore.user && userStore.user.resumes ? userStore.user.resumes : [])" :key="resume.id">
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
                      <li><a class="dropdown-item small" href="#" @click.prevent="downloadResume(resume)"><i class="fas fa-download me-2"></i> Download</a></li>
                      <li><a class="dropdown-item small text-danger" href="#" @click.prevent="deleteResume(resume.id)"><i class="fas fa-trash-alt me-2"></i> Delete</a></li>
                    </ul>
                  </div>
                </div>
                <small class="text-muted d-block mb-2">{{ formatFileSize(resume.size) }}</small>
                <div class="d-flex">
                  <button class="btn btn-sm btn-outline-primary py-1 px-2 me-2" @click="downloadResume(resume)">
                    <i class="fas fa-download me-1"></i> Download
                  </button>
                  <button class="btn btn-sm btn-outline-danger py-1 px-2" @click="deleteResume(resume.id)">
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
                  multiple
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
              <input type="url" class="form-control form-control-sm" placeholder="LinkedIn profile URL" v-model="socialData.linkedin" />
            </div>
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">Twitter</label>
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="fab fa-twitter text-info"></i>
              </span>
              <input type="url" class="form-control form-control-sm" placeholder="Twitter profile URL" v-model="socialData.twitter" />
            </div>
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">GitHub</label>
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="fab fa-github text-dark"></i>
              </span>
              <input type="url" class="form-control form-control-sm" placeholder="GitHub profile URL" v-model="socialData.github" />
            </div>
          </div>
          
          <div class="col-md-6">
            <label class="form-label small">Facebook</label>
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="fab fa-facebook-f text-primary"></i>
              </span>
              <input type="url" class="form-control form-control-sm" placeholder="Facebook profile URL" v-model="socialData.facebook" />
            </div>
          </div>
        </div>
        
        <div class="text-end mt-4">
          <button class="btn btn-primary btn-sm px-4" @click="saveSocialChanges" :disabled="userStore.loading">
            <span v-if="userStore.loading" class="spinner-border spinner-border-sm me-1"></span>
            Save Changes
          </button>
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
            <input type="password" class="form-control form-control-sm" v-model="passwordData.current_password" />
          </div>
          <div class="col-md-6">
            <label class="form-label small">New Password</label>
            <input type="password" class="form-control form-control-sm" v-model="passwordData.password" />
          </div>
          <div class="col-md-6">
            <label class="form-label small">Confirm New Password</label>
            <input type="password" class="form-control form-control-sm" v-model="passwordData.password_confirmation" />
          </div>
        </div>
        
        <div class="text-end mt-4">
          <button class="btn btn-primary btn-sm px-4" @click="updatePasswordd" :disabled="userStore.loading">
            <span v-if="userStore.loading" class="spinner-border spinner-border-sm me-1"></span>
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useUserStore } from '../../../src/stores/candidate/userStore'
import axios from 'axios'

const userStore = useUserStore()

// Active tab state
const activeTab = ref('personal')

// Refs for file inputs
const photoInput = ref(null)
const resumeInput = ref(null)

// Form data objects
const userData = ref({
  name: '',
  email: '',
  phone: '',
  website: '',
  professional_title: '',
  profile_photo: null
})

const profileData = ref({
  nationality: '',
  date_of_birth: '',
  gender: '',
  marital_status: '',
  education: '',
  experience: '',
  biography: ''
})

const socialData = ref({
  linkedin: '',
  twitter: '',
  github: '',
  facebook: ''
})

const passwordData = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
});

const updatePasswordd = async () => {
  if (passwordData.value.password !== passwordData.value.password_confirmation) {
    alert('New password and confirmation do not match');
    return;
  }
  
  try {
    await userStore.updatePassword(passwordData.value);
    alert('Password updated successfully');
    // Clear fields after success
    passwordData.value = {
      current_password: '',
      password: '',
      password_confirmation: ''
    };
  } catch (error) {
    console.error('Error updating password:', error);
    alert(error.message || 'Failed to update password. Please try again.');
  }
};

// New resumes to upload
const newResumes = ref([])

// Computed property for profile photo URL
const profilePhotoUrl = computed(() => {
  if (userData.value.profile_photo instanceof File) {
    return URL.createObjectURL(userData.value.profile_photo)
  }
  if (userStore.user?.profile_photo_path) {
    return `/storage/${userStore.user.profile_photo_path}`
  }
  return null
})

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
    userData.value.profile_photo = file
  }
}

const triggerResumeUpload = () => {
  resumeInput.value.click()
}

const handleResumeUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  // Validate files
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} exceeds 5MB limit`);
      return;
    }
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert(`File ${file.name} must be a PDF, DOC, or DOCX`);
      return;
    }
  }

  try {
    await userStore.uploadResumes(userStore.user.id, files);
    alert('Resumes uploaded successfully');
    // Clear the file input
    resumeInput.value.value = '';
  } catch (error) {
    console.error('Error uploading resumes:', error);
    alert(error.message || 'Failed to upload resumes. Please try again.');
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const downloadResume = async (resume) => {
  try {
    const response = await axios.get(`/storage/${resume.path}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', resume.name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading resume:', error)
    alert('Failed to download resume. Please try again.')
  }
}

const deleteResume = async (resumeId) => {
  if (confirm('Are you sure you want to delete this resume?')) {
    try {
      await userStore.deleteResume(resumeId)
    } catch (error) {
      console.error('Error deleting resume:', error)
      alert('Failed to delete resume. Please try again.')
    }
  }
}


const savePersonalChanges = async () => {
  try {
    const formData = new FormData();
    
    // Append all user data
    Object.keys(userData.value).forEach(key => {
      if (userData.value[key] !== null && userData.value[key] !== undefined) {
        // For file fields, append directly
        if (key === 'profile_photo' && userData.value[key] instanceof File) {
          formData.append(key, userData.value[key]);
        } else {
          formData.append(key, userData.value[key]);
        }
      }
    });

    // Use PUT to /api/users/{id} - matches apiResource definition
    await axios.put(`http://127.0.0.1:8000/api/users/${userStore.user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    // Refresh user data
    await userStore.fetchUser();
    alert('Personal information updated successfully');
  } catch (error) {
    console.error('Error updating personal information:', error);
    if (error.response) {
      const errors = error.response.data.errors || error.response.data.message;
      alert(JSON.stringify(errors));
    } else {
      alert('Failed to update personal information. Please try again.');
    }
  }
};

const saveProfileChanges = async () => {
  try {
    await userStore.updateProfile({
      ...profileData.value,
      _method: 'PUT'
    })
    alert('Profile information updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  }
}

const saveSocialChanges = async () => {
  try {
    await userStore.updateProfile({
      ...socialData.value,
      _method: 'PUT'
    })
    alert('Social links updated successfully')
  } catch (error) {
    console.error('Error updating social links:', error)
    alert('Failed to update social links. Please try again.')
  }
}



// Initialize data when component mounts
onMounted(async () => {
  try {
    await userStore.fetchUser()
    
    // Populate form data from store
    if (userStore.user) {
      userData.value = {
        name: userStore.user.name,
        email: userStore.user.email,
        phone: userStore.user.phone,
        website: userStore.user.website,
        professional_title: userStore.user.professional_title,
        profile_photo: null
      }
      
      if (userStore.user.profile) {
        profileData.value = {
          nationality: userStore.user.profile.nationality,
          date_of_birth: userStore.user.profile.date_of_birth,
          gender: userStore.user.profile.gender,
          marital_status: userStore.user.profile.marital_status,
          education: userStore.user.profile.education,
          experience: userStore.user.profile.experience,
          biography: userStore.user.profile.biography
        }
      }
      
      if (userStore.user.social_links) {
        socialData.value = {
          linkedin: userStore.user.social_links.linkedin,
          twitter: userStore.user.social_links.twitter,
          github: userStore.user.social_links.github,
          facebook: userStore.user.social_links.facebook
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    alert('Failed to load user data. Please try again.')
  }
})
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