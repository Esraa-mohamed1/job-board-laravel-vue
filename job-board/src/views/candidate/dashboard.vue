<template>
  <div class="dashboard-container">
    <!-- Top Navigation Bar -->

    <!-- Main Content Area with slightly wider sidebar -->
    <div class="container-fluid px-0">
      <div class="row g-0">
        <!-- Sidebar - slightly increased width -->
     
      <sidebar />
        <!-- Main Content - slightly adjusted width -->
        <div class="col-md-9-5 p-4 bg-light">
          <RouterView />
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

import navbar from '../../components/shared/navbar.vue'
import sidebar from '../../components/shared/slidebar.vue'
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




