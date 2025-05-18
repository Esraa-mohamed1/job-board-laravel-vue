<template>
    <div class="edit-profile-container">
      <h1>Edit Company Profile</h1>
      
      <div class="stepper">
        <div v-for="(step, index) in steps" 
             :key="index"
             :class="['step', { 'active': currentStep === index, 'completed': currentStep > index }]"
             @click="goToStep(index)">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-title">{{ step.title }}</span>
        </div>
      </div>
      
      <div class="step-content">
        <component 
          :is="steps[currentStep].component" 
          :formData="formData"
          @update="updateFormData"
          @next="nextStep"
          @prev="prevStep"
          @submit="submitForm"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import FoundingInfo from '../../components/employer/editSteps/FoundingInfo.vue'
  import CompanyInfo from '../../components/employer/editSteps/CompanyInfo.vue'
  import ContactInfo from '../../components/employer/editSteps/ContactInfo.vue'
  import SocialMedia from '../../components/employer/editSteps/SocialMedia.vue'
  import ReviewStep from '../../components/employer/editSteps/ReviewStep.vue'
  
  const route = useRoute()
  const router = useRouter()
  
  // Initialize form data structure
  const formData = reactive({
    id: null,
    companyInfo: {
      name: '',
      about: '',
      logo: '',
      banner: ''
    },
    foundingInfo: {
      industryType: '',
      organizationType: '',
      teamSize: '',
      establishmentYear: '',
      companyVision: '',
      companyWebsite: ''
    },
    contactInfo: {
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        country: ''
      }
    },
    socialMedia: {
      socialLinks: []
    }
  })
  
  // Load existing data
  const loadProfileData = async () => {
    try {
      const employerId = route.params.id || JSON.parse(localStorage.getItem('userData')).id;
      const response = await employerApi.get(`/${employerId}`);
      
      if (!response.ok) throw new Error('Failed to fetch profile data')
      
      const data = await response.json()
      Object.assign(formData, data)
      
      // Format date for date input if needed
      if (formData.foundingInfo.establishmentYear) {
        formData.foundingInfo.establishmentYear = 
          new Date(formData.foundingInfo.establishmentYear).toISOString().split('T')[0]
      }
      
    } catch (error) {
      console.error('Error loading profile:', error)
      // Handle error (show notification, etc.)
    }
  }
  
  onMounted(async () => {
    // Check if we have data passed via router state
    if (route.state?.profileData) {
      Object.assign(formData, route.state.profileData)
    } else {
      // Otherwise load from API
      await loadProfileData()
    }
  })
  
  const steps = [
    { title: 'Basic Info', component: FoundingInfo },
    { title: 'Company Details', component: CompanyInfo },
    { title: 'Contact Info', component: ContactInfo },
    { title: 'Social Media', component: SocialMedia },
    { title: 'Review', component: ReviewStep }
  ]
  
  const currentStep = ref(0)
  
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
  
  const updateFormData = (newData) => {
    Object.assign(formData, newData)
  }
  
  const submitForm = async () => {
    try {
      // Prepare the data for submission
      const submissionData = {
        ...formData,
        // Convert date string back to proper format if needed
        foundingInfo: {
          ...formData.foundingInfo,
          establishmentYear: formData.foundingInfo.establishmentYear || null
        }
      }
  
      const response = await fetch(`http://localhost:3000/employers/${formData.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
        },
        body: JSON.stringify(submissionData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update profile')
      }
      
      // Show success message
      alert('Profile updated successfully!')
      
      // Redirect back to profile page
      router.push({ 
        name: 'EmployerProfile', 
        params: { id: formData.id, updated: true } 
      })
      
    } catch (error) {
      console.error('Error updating profile:', error)
      alert(`Error: ${error.message}`)
      // You might want to show a more sophisticated error message here
    }
  }
  </script>
  
  <style scoped>
  /* Your existing styles */
  .edit-profile-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 20px;
  }
  
  .stepper {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
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
  
  .step-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>