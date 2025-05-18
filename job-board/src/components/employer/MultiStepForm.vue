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
  const employerId = ref(null)
  const profileData = JSON.parse(localStorage.getItem('EditEmployerProfile'))

  onMounted(() => {
  const storedUser = localStorage.getItem('userData')
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    employerId.value = parsedUser.id

    const localData = localStorage.getItem('editProfileData')
    if (localData) {
      const parsedProfile = JSON.parse(localData)
      Object.assign(formData, parsedProfile)  
    } else {
      initializeEmployer() 
    }
  } else {
    alert('User not logged in.')
  }
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
  
  const initializeEmployer = async () => {
  try {
    const response = await employerApi.get('/');
    const companies = response.data;
    const userCompany = companies.find(c => c.user_id === employerId.value);
    if (userCompany) {
      Object.assign(formData, {
        companyInfo: {
          name: userCompany.company_name,
          about: userCompany.about,
          logo: userCompany.logo ? `http://127.0.1.8:8000/storage/images/${userCompany.logo}` : '',
          banner: userCompany.banner ? `http://127.0.1.8:8000/storage/images/${userCompany.banner}` : ''
        },
        foundingInfo: {
          organizationType: userCompany.organization_type,
          establishmentYear: userCompany.establishment_year,
          companyVision: userCompany.company_vision,
          industryType: userCompany.industry_type,
          teamSize: userCompany.team_size,
          companyWebsite: userCompany.company_website
        },
        contactInfo: {
          email: userCompany.email,
          phone: userCompany.phone,
          address: {
            street: userCompany.company_address,
            city: userCompany.city,
            country: userCompany.country
          }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching company data:', error);
  }
};
  const goToStep = (index) => {
    if (index < currentStep.value || index === steps.length - 1) {
      currentStep.value = index
    }
  }
  
  const goToNextStep = async (stepData) => {
  try {
    let apiData = {};
    
    switch(currentStep.value) {
      case 0: 
        apiData = {
          company_name: stepData.name,
          about: stepData.about,
          logo: stepData.logoFile,
          banner: stepData.bannerFile
        };
        break;
      case 1: 
        apiData = {
          organization_type: stepData.organizationType,
          establishment_year: stepData.establishmentYear,
          company_vision: stepData.companyVision,
          industry_type: stepData.industryType,
          team_size: stepData.teamSize,
          company_website: stepData.companyWebsite
        };
        break;
      case 3: 
        apiData = {
          company_address: stepData.address.street,
          city: stepData.address.city,
          country: stepData.address.country,
          phone: stepData.phone,
          email: stepData.email
        };
        break;
    
      }
      const response = await employerApi.post('/', apiData);
    
      if (stepData.isComplete) {
        currentStep.value = steps.length - 1;
      } else if (currentStep.value < steps.length - 2) {
        currentStep.value++;
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save data. Please try again.');
    }
  }
  const goToPrevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
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