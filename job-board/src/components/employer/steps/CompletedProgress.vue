<template>
  <div class="step-container">
    <div class="completion-message">
      <h2>Setup Progress</h2>
      <p class="completion-percentage">100% Completed</p>
      <p class="congrats">Congratulations, Your profile is 100% complete!</p>
      <p class="message">Your company profile has been successfully created and is now visible to potential candidates.</p>
    </div>
    
    <button class="btn-dashboard" @click="completeSetup">View Dashboard</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['complete'])

const completeSetup = () => {
  emit('complete')
  router.push('/employer/dashboard')
}
</script>

  
  <style scoped>
  .step-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }
  
  .completion-message {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  
  .completion-percentage {
    color: #0A65CC;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .congrats {
    font-size: 20px;
    color: #0A65CC;
    margin: 20px 0;
  }
  
  .message {
    color: #666;
    line-height: 1.6;
  }
  
  .btn-dashboard {
    background: #0A65CC;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
  }
  
  .btn-dashboard:hover {
    background: #3d81cf;
  }
  </style>