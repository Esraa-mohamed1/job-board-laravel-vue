<template>
  <div class="multi-step-form">
    <div class="step-progress-container">
      <div class="progress-bar mt-4">
        <div class="progress-fill" :style="{ width: progressPercentage }"></div>
      </div>
      <div class="step-indicators">
        <div v-for="(step, index) in steps" :key="index" 
             :class="['step', { 'active': currentStep === index, 'completed': currentStep > index }]"
             @click="goToStep(index)">
          <div class="step-icon">
            <i :class="stepIcons[index]"></i>
          </div>
          <div class="step-label">{{ step.name }}</div>
        </div>
      </div>
    </div>

    <component
      :is="steps[currentStep].component"
      :form-data="formData"
      @next="handleNextStep"
      @prev="goToPrevStep"
      @complete="handleComplete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import CompanyInfo from './steps/CompanyInfo.vue'
import FoundingInfo from './steps/FoundingInfo.vue'
import SocialMedia from './steps/SocialMedia.vue'
import ContactInfo from './steps/ContactInfo.vue'
import CompletedProgress from './steps/CompletedProgress.vue'
import axios from 'axios'

const router = useRouter()
const authStore = localStorage.getItem('userData')
const authToken = localStorage.getItem('authToken');
const currentStep = ref(0)

const formData = reactive({
  company_name: '',
  about: '',
  logo: '',
  banner: '',
  logoFile: null,
  bannerFile: null,
  organization_type: '',
  establishment_year: '',
  company_vision: '',
  industry_type: '',
  team_size: '',
  company_website: '',
  linkedIn: '',
  facebook: '',
  twitter: '',
  company_address: '',
  city: '',
  country: '',
  phone: '',
  email: ''
})

const steps = [
  { name: 'Company Info', component: CompanyInfo },
  { name: 'Founding Info', component: FoundingInfo },
  { name: 'Social Media', component: SocialMedia },
  { name: 'Contact Info', component: ContactInfo },
  { name: 'Complete', component: CompletedProgress }
]

const stepIcons = [
  'fas fa-building',
  'fas fa-landmark',
  'fas fa-share-alt',
  'fas fa-address-book',
  'fas fa-check-circle'
]

const progressPercentage = computed(() => {
  return `${(currentStep.value + 1) / steps.length * 100}%`
})

const goToStep = (index) => {
  if (index < currentStep.value || index === steps.length - 1) {
    currentStep.value = index
  }
}

const handleNextStep = (stepData) => {
  Object.assign(formData, stepData)
  
  if (currentStep.value < steps.length - 2) {
    currentStep.value++
  } else if (currentStep.value === steps.length - 2) {
    currentStep.value = steps.length - 1
  }
}

const goToPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const handleComplete = async () => {
  try {
    const formPayload = new FormData()
    
    // Format date properly (ensure it's in YYYY-MM-DD format)
    const formattedDate = formData.establishment_year
      ? new Date(formData.establishment_year).toISOString().split('T')[0]
      : '';

    const fields = [
      'company_name', 'about', 'organization_type',
      'company_vision', 'industry_type', 'team_size',
      'company_website', 'company_address', 'city',
      'country', 'phone', 'email', 'linkedIn',
      'facebook', 'twitter'
    ]

    fields.forEach(field => {
      if (formData[field] !== undefined && formData[field] !== null) {
        formPayload.append(field, formData[field])
      }
    })

    if (formattedDate) {
      formPayload.append('establishment_year', formattedDate)
    }

    if (formData.logoFile) {
      formPayload.append('logo', formData.logoFile)
    }

    if (formData.bannerFile) {
      formPayload.append('banner', formData.bannerFile)
    }

    const userData = JSON.parse(authStore)
    if (userData?.id) {
      formPayload.append('user_id', userData.id)
    }

    const response = await axios.post('http://localhost:8000/api/companies', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      }
    })

    if (response.status === 201) {
      router.push('/employer/dashboard')
    } else {
      throw new Error('Unexpected response status: ' + response.status)
    }
  } catch (error) {
    console.error('Error submitting company data:', error)
    
    let errorMessage = 'Failed to save company data'
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage += ': ' + (error.response.data?.message || error.response.statusText)
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage += ': No response from server'
    } else {
      // Something happened in setting up the request
      errorMessage += ': ' + error.message
    }
    
    alert(errorMessage)
  }
}
</script>

<style scoped>
.multi-step-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.step-progress-container {
  margin-bottom: 2rem;
}

.step-indicators {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  flex: 1;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: #7f8c8d;
}

.step.active .step-icon {
  background-color: #0A65CC;
  color: white;
}

.step.completed .step-icon {
  background-color: #a1bfe0;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #7f8c8d;
  text-align: center;
}

.step.active .step-label,
.step.completed .step-label {
  color: #0A65CC;
  font-weight: 500;
}

.progress-bar {
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  margin: 0 20px;
  position: relative;
  top: -20px;
  z-index: 0;
}

.progress-fill {
  height: 100%;
  background-color: #0A65CC;
  border-radius: 3px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .step-label {
    font-size: 0.75rem;
  }
  
  .step-icon {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
}
</style>