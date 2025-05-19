<template>
    <div class="step-form">
      <h2>Review Your Information</h2>
      
      <div class="review-section">
        <h3>Basic Information</h3>
        <div class="review-item">
          <strong>Company Name:</strong> {{ formData.companyInfo.name }}
        </div>
        <div class="review-item">
          <strong>About:</strong> {{ formData.companyInfo.about || 'Not provided' }}
        </div>
      </div>
      
      <div class="review-section">
        <h3>Company Details</h3>
        <div class="review-item">
          <strong>Industry:</strong> {{ formData.foundingInfo.industryType }}
        </div>
        <div class="review-item">
          <strong>Team Size:</strong> {{ formData.foundingInfo.teamSize }}
        </div>
        <div class="review-item">
          <strong>Website:</strong> {{ formData.foundingInfo.website || 'Not provided' }}
        </div>
        <div class="review-item">
          <strong>Social Media:</strong>
          <ul>
            <li v-if="formData.socialMedia.linkedin">LinkedIn: {{ formData.socialMedia.linkedin }}</li>
            <li v-if="formData.socialMedia.facebook">Facebook: {{ formData.socialMedia.facebook }}</li>
            <li v-if="formData.socialMedia.twitter">Twitter: {{ formData.socialMedia.twitter }}</li>
          </ul>
        </div>
        <!-- Add more review items for each section -->
      </div>
      
      <div class="form-actions">
        <button @click="$emit('prev')" class="prev-btn">Back</button>
        <button @click="submit" class="submit-btn">Submit Changes</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['formData'])
  const emit = defineEmits(['prev', 'submit'])
  
  const submit = () => {
    emit('submit')
  }
  </script>
  
  <style scoped>
  .review-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .review-item {
    margin: 10px 0;
  }
  
  .submit-btn {
    background: #4CAF50;
    color: white;
  }
  </style>