<template>
  <div class="employer-profile-edit">
    <div class="header">
      <h1>Edit Company Profile</h1>
      <p>Update your company information to attract the best talent</p>
    </div>

    <div class="edit-form-container">
      <!-- Stepper Navigation -->
      <div class="stepper">
        <div v-for="(step, index) in steps" 
             :key="index"
             :class="['step', { 'active': currentStep === index, 'completed': currentStep > index }]"
             @click="goToStep(index)">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-title">{{ step.title }}</span>
        </div>
      </div>

      <!-- Form Content -->
      <div class="form-content">
        <!-- Founding Info -->
        <div v-if="currentStep === 0" class="form-section">
          <h2>Basic Information</h2>
          <div class="form-group">
            <label>Company Name *</label>
            <input v-model="formData.companyInfo.name" type="text" required>
          </div>
          <div class="form-group">
            <label>About Company</label>
            <textarea v-model="formData.companyInfo.about" rows="4"></textarea>
          </div>
        </div>

        <!-- Company Info -->
        <div v-if="currentStep === 1" class="form-section">
          <h2>Company Details</h2>
          <div class="upload-group">
            <label>Company Logo</label>
            <div class="upload-box" @click="triggerLogoUpload">
              <div v-if="!formData.companyInfo.logo" class="upload-placeholder">
                <span>Click to upload logo</span>
              </div>
              <img v-else :src="formData.companyInfo.logo" class="logo-preview" alt="Company Logo">
              <input ref="logoInput" type="file" accept="image/*" @change="handleLogoUpload" class="file-input">
            </div>
          </div>
          
          <div class="upload-group">
            <label>Banner Image</label>
            <div class="upload-box" @click="triggerBannerUpload">
              <div v-if="!formData.companyInfo.banner" class="upload-placeholder">
                <span>Click to upload banner</span>
              </div>
              <img v-else :src="formData.companyInfo.banner" class="banner-preview" alt="Company Banner">
              <input ref="bannerInput" type="file" accept="image/*" @change="handleBannerUpload" class="file-input">
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div v-if="currentStep === 2" class="form-section">
          <h2>Contact Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Email *</label>
              <input v-model="formData.contactInfo.email" type="email" required>
            </div>
            <div class="form-group">
              <label>Phone *</label>
              <div class="phone-input">
                <select v-model="formData.contactInfo.countryCode">
                  <option value="+20">+20 (Egypt)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <input v-model="formData.contactInfo.phone" type="tel" required>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Address *</label>
            <input v-model="formData.contactInfo.address.street" type="text" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>City *</label>
              <input v-model="formData.contactInfo.address.city" type="text" required>
            </div>
            <div class="form-group">
              <label>Country *</label>
              <input v-model="formData.contactInfo.address.country" type="text" required>
            </div>
          </div>
        </div>

        <!-- Review -->
        <div v-if="currentStep === 3" class="review-section">
          <h2>Review Your Information</h2>
          
          <div class="review-item">
            <h3>Company Information</h3>
            <p><strong>Name:</strong> {{ formData.companyInfo.name }}</p>
            <p><strong>About:</strong> {{ formData.companyInfo.about || 'Not provided' }}</p>
          </div>
          
          <div class="review-item">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {{ formData.contactInfo.email }}</p>
            <p><strong>Phone:</strong> {{ formData.contactInfo.countryCode }} {{ formData.contactInfo.phone }}</p>
            <p><strong>Address:</strong> 
              {{ formData.contactInfo.address.street }}, 
              {{ formData.contactInfo.address.city }}, 
              {{ formData.contactInfo.address.country }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="form-actions">
        <button v-if="currentStep > 0" @click="prevStep" class="btn-prev">Previous</button>
        <button v-if="currentStep < steps.length - 1" @click="nextStep" class="btn-next">Next</button>
        <button v-if="currentStep === steps.length - 1" @click="submitForm" class="btn-submit">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Initialize form data structure
const formData = reactive({
  companyInfo: {
    name: '',
    about: '',
    logo: '',
    banner: ''
  },
  contactInfo: {
    email: '',
    phone: '',
    countryCode: '+20',
    address: {
      street: '',
      city: '',
      country: ''
    }
  }
})

// Steps configuration
const steps = [
  { title: 'Basic Info' },
  { title: 'Company Details' },
  { title: 'Contact Info' },
  { title: 'Review' }
]

const currentStep = ref(0)
const logoInput = ref(null)
const bannerInput = ref(null)

// Fetch company data
const fetchCompanyData = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('http://localhost:8000/api/companies/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.data.success) {
      const data = response.data.data
      
      // Map the API data to our form structure
      formData.companyInfo = {
        name: data.company_name || '',
        about: data.about || '',
        logo: data.logo ? `/storage/images/${data.logo}` : '',
        banner: data.banner ? `/storage/images/${data.banner}` : ''
      }
      
      formData.contactInfo = {
        email: data.email || '',
        phone: data.phone ? data.phone.replace(data.country_code, '') : '',
        countryCode: data.country_code || '+20',
        address: {
          street: data.company_address || '',
          city: data.city || '',
          country: data.country || ''
        }
      }
    }
  } catch (error) {
    console.error('Error fetching company data:', error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
  }
}

// Handle file uploads
const triggerLogoUpload = () => logoInput.value.click()
const triggerBannerUpload = () => bannerInput.value.click()

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.companyInfo.logo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleBannerUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.companyInfo.banner = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Navigation functions
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const goToStep = (index) => {
  if (index <= currentStep.value) {
    currentStep.value = index
  }
}

// Submit form
const submitForm = async () => {
  try {
    const token = localStorage.getItem('authToken')
    
    // Prepare the data for submission
    const submissionData = {
      company_name: formData.companyInfo.name,
      about: formData.companyInfo.about,
      email: formData.contactInfo.email,
      phone: formData.contactInfo.countryCode + formData.contactInfo.phone,
      country_code: formData.contactInfo.countryCode,
      company_address: formData.contactInfo.address.street,
      city: formData.contactInfo.address.city,
      country: formData.contactInfo.address.country,
      // You'll need to handle file uploads separately
    }

    const response = await axios.put('http://localhost:8000/api/companies/profile', submissionData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.data.success) {
      alert('Profile updated successfully!')
      router.push('/employer/profile')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchCompanyData()
})
</script>

<style scoped>
.employer-profile-edit {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.header p {
  color: #7f8c8d;
}

.edit-form-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.stepper::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  color: white;
  font-weight: bold;
}

.step-title {
  font-size: 0.9rem;
  color: #777;
}

.step.active .step-number {
  background: #4a6baf;
}

.step.completed .step-number {
  background: #4CAF50;
}

.form-content {
  padding: 1rem 0;
}

.form-section {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 120px;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.phone-input {
  display: flex;
  gap: 0.5rem;
}

.phone-input select {
  width: 120px;
}

.upload-group {
  margin-bottom: 1.5rem;
}

.upload-box {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-box:hover {
  border-color: #4a6baf;
}

.upload-placeholder {
  color: #7f8c8d;
}

.file-input {
  display: none;
}

.logo-preview {
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
}

.banner-preview {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

.review-section {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.review-item {
  margin-bottom: 1.5rem;
}

.review-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.review-item p {
  margin: 0.5rem 0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-prev,
.btn-next,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-prev {
  background: white;
  border: 1px solid #ddd;
  color: #2c3e50;
}

.btn-prev:hover {
  border-color: #4a6baf;
  color: #4a6baf;
}

.btn-next,
.btn-submit {
  background: #4a6baf;
  color: white;
  border: none;
}

.btn-next:hover,
.btn-submit:hover {
  background: #3a5a9f;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .stepper {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .step {
    flex: 1;
    min-width: 100px;
  }
}
</style>