<template>
    <div class="employer-onboarding-container">
      <h1>Employer Profile Setup</h1>
  
           <MultiStepForm 
        :employer-id="employerId"
        @complete="handleProfileComplete"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import MultiStepForm from '../../components/employer/MultiStepForm.vue'
  
  const employerId = ref(1)
  
  const handleProfileComplete = () => {
    console.log(' Profile setup completed!')
  }
  </script>
  
  <style scoped>
  .employer-onboarding-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  </style>
  