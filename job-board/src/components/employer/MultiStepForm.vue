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
        @next="goToNextStep"
        @prev="goToPrevStep"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import CompanyInfo from './steps/CompanyInfo.vue'
  import FoundingInfo from './steps/FoundingInfo.vue'
  import SocialMedia from './steps/SocialMedia.vue'
  import ContactInfo from './steps/ContactInfo.vue'
  import CompletedProgress from './steps/CompletedProgress.vue'
  
  const route = useRoute()
  const emit = defineEmits(['complete'])
  const currentStep = ref(0)
  const formData = reactive({
    companyInfo: {},
    foundingInfo: {},
    socialMedia: {},
    contactInfo: {}
  })
  const employerId = ref(Number(route.params.id) || 2)
  
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
  
  const initializeEmployer = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employers/${employerId.value}`)
      if (response.ok) {
        const data = await response.json()
        Object.assign(formData, data)
      }
    } catch (error) {
      console.error('Error fetching employer:', error)
    }
  }
  
  const goToStep = (index) => {
    if (index < currentStep.value || index === steps.length - 1) {
      currentStep.value = index
    }
  }
  
  const goToNextStep = async (stepData) => {
    try {
      let sectionName
      switch(currentStep.value) {
        case 0: sectionName = 'companyInfo'; break
        case 1: sectionName = 'foundingInfo'; break
        case 2: sectionName = 'socialMedia'; break
        case 3: sectionName = 'contactInfo'; break
      }
      
      if (sectionName) {
        formData[sectionName] = { ...formData[sectionName], ...stepData }
      }
  
      const response = await fetch(`http://localhost:3000/employers/${employerId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [sectionName]: stepData })
      })
  
      if (!response.ok) throw new Error('Failed to save')
  
      if (stepData.isComplete) {
        currentStep.value = steps.length - 1
      } else if (currentStep.value < steps.length - 2) {
        currentStep.value++
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save data. Please try again.')
    }
  }
  
  const goToPrevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }
  
  onMounted(initializeEmployer)
  </script>
  
  <style scoped>
  .multi-step-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
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