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
import { ElMessage } from 'element-plus'

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
  'fas fa-check-circle' // Assuming this icon is for Review, you might want a distinct one for 'Complete'
]

const progressPercentage = computed(() => {
  // Calculates progress based on the current step's index
  return `${(currentStep.value + 1) / steps.length * 100}%`
})

const goToStep = (index) => {
  // Allow navigation to previous steps or the final 'Complete' step
  if (index < currentStep.value || index === steps.length - 1) {
    currentStep.value = index
  }
}

const handleNextStep = (stepData) => {
  // Merge the data received from the current step component into the main formData
  Object.assign(formData, stepData)

  // Determine the next step
  // If the current step is the one *before* Review (Contact Info, which is index 3),
  // move directly to the Review step (index 4).
  if (currentStep.value === 3) {
    currentStep.value = 4 // Move from Contact Info to Review
  }
  // If the current step is Review (index 4), the 'next' event here means
  // it's ready to complete, so move to the 'Complete' step (index 5).
  // Note: ReviewStep's "Submit" button should probably emit 'complete' directly,
  // but if it emits 'next', this handles it.
  else if (currentStep.value === 4) {
    currentStep.value = 5 // Move from Review to Complete
  }
  // For all other intermediate steps, just increment to the next step
  else if (currentStep.value < steps.length - 1) {
    currentStep.value++
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

  // Log form data before sending
  for (let [key, value] of formPayload) {
    console.log(key, value);
  }
    const response = await axios.post('http://localhost:8000/api/companies', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      }
    })

    if (response.status === 201) {
      ElMessage.success('Company profile created successfully!')
      router.push('/employer/dashboard')
    } else {
      throw new Error('Unexpected response status: ' + response.status)
    }
  } catch (error) {
    console.error('Error submitting company data:', error)

    let errorMessage = 'Failed to save company data'
    if (error.response) {
      errorMessage += ': ' + (error.response.data?.message || error.response.statusText)
    } else if (error.request) {
      errorMessage += ': No response from server'
    } else {
      errorMessage += ': ' + error.message
    }

    ElMessage.error(errorMessage)
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