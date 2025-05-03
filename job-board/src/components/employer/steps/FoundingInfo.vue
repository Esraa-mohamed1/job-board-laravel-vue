<template>
    <div class="founding-info-container">
      <h2>Founding Info</h2>
      
      <div class="form-grid">
        <div class="form-group">
          <label>Organization Type</label>
          <select v-model="organizationType" required :class="{'is-invalid': errors.organizationType}" class="form-control">
            <option value="" disabled selected>Select...</option>
            <option value="llc">LLC</option>
            <option value="corporation">Corporation</option>
            <option value="nonprofit">Nonprofit</option>
            <option value="partnership">Partnership</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
          </select>
          <div v-if="errors.organizationType" class="invalid-feedback">{{ errors.organizationType }}</div>
        </div>
        
        <div class="form-group">
          <label>Year of Establishment</label>
          <input v-model="establishmentYear" type="text" placeholder="dd/mm/yyyy" required :class="{'is-invalid': errors.establishmentYear}" class="form-control">
          <div v-if="errors.establishmentYear" class="invalid-feedback">{{ errors.establishmentYear }}</div>
        </div>
        
        <div class="form-group full-width">
          <label>Company Vision</label>
          <textarea v-model="companyVision" placeholder="Tell us about your company vision..." required :class="{'is-invalid': errors.companyVision}" class="form-control"></textarea>
          <div v-if="errors.companyVision" class="invalid-feedback">{{ errors.companyVision }}</div>
        </div>
        
        <div class="form-group">
          <label>Industry Types</label>
          <select v-model="industryType" required :class="{'is-invalid': errors.industryType}" class="form-control">
            <option value="" disabled selected>Select...</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
          <div v-if="errors.industryType" class="invalid-feedback">{{ errors.industryType }}</div>
        </div>
        
        <div class="form-group">
          <label>Team Size</label>
          <select v-model="teamSize" required :class="{'is-invalid': errors.teamSize}" class="form-control">
            <option value="" disabled selected>Select...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
          <div v-if="errors.teamSize" class="invalid-feedback">{{ errors.teamSize }}</div>
        </div>
        
        <div class="form-group full-width">
          <label>Company Website</label>
          <input v-model="companyWebsite" type="url" placeholder="Website url..." required :class="{'is-invalid': errors.companyWebsite}" class="form-control">
          <div v-if="errors.companyWebsite" class="invalid-feedback">{{ errors.companyWebsite }}</div>
        </div>
      </div>
      
      <div class="navigation-buttons">
        <button class="btn-prev" @click="goToPrevious">Previous</button>
        <button class="btn-next" :disabled="!isFormValid" @click="saveAndContinue">Save & Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const organizationType = ref('')
  const establishmentYear = ref('')
  const companyVision = ref('')
  const industryType = ref('')
  const teamSize = ref('')
  const companyWebsite = ref('')
  const errors = ref({
    organizationType: '',
    establishmentYear: '',
    companyVision: '',
    industryType: '',
    teamSize: '',
    companyWebsite: ''
  })
  
  const emit = defineEmits(['prev', 'next'])
  
  const isFormValid = computed(() => {
    return organizationType.value !== '' &&
           establishmentYear.value !== '' &&
           companyVision.value !== '' &&
           industryType.value !== '' &&
           teamSize.value !== '' &&
           companyWebsite.value !== ''
  })
  
  const validateForm = () => {
  let valid = true
  errors.value = {
    organizationType: '',
    establishmentYear: '',
    companyVision: '',
    industryType: '',
    teamSize: '',
    companyWebsite: ''
  }

  // Organization Type validation
  if (organizationType.value === '') {
    errors.value.organizationType = 'Organization type is required'
    valid = false
  }

  // Year validation (basic format check)
  if (establishmentYear.value === '') {
    errors.value.establishmentYear = 'Year of establishment is required'
    valid = false
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(establishmentYear.value)) {
    errors.value.establishmentYear = 'Please use dd/mm/yyyy format'
    valid = false
  }

  // Company Vision validation
  if (companyVision.value === '') {
    errors.value.companyVision = 'Company vision is required'
    valid = false
  }

  // Industry Type validation
  if (industryType.value === '') {
    errors.value.industryType = 'Industry type is required'
    valid = false
  }

  // Team Size validation
  if (teamSize.value === '') {
    errors.value.teamSize = 'Team size is required'
    valid = false
  }

  // Website URL validation
  if (companyWebsite.value === '') {
    errors.value.companyWebsite = 'Company website is required'
    valid = false
  } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(companyWebsite.value)) {
    errors.value.companyWebsite = 'Please enter a valid website URL'
    valid = false
  }

  return valid
}
  
  const goToPrevious = () => {
    emit('prev')
  }
  
  const saveAndContinue = () => {
    if (!validateForm()) return
    
    emit('next', {
      organizationType: organizationType.value,
      establishmentYear: establishmentYear.value,
      companyVision: companyVision.value,
      industryType: industryType.value,
      teamSize: teamSize.value,
      companyWebsite: companyWebsite.value
    })
  }
  </script>
  
  <style scoped>
  .founding-info-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 25px;
    font-size: 24px;
    color: #333;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group.full-width {
    grid-column: span 2;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }
  
  select, input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background-color: white;
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .btn-prev, .btn-next {
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  .btn-prev {
    background: white;
    border: 1px solid #ddd;
    color: #555;
  }
  
  .btn-prev:hover {
    border-color: #a4a5a5;
    color: #adadad;
  }
  
  .btn-next {
    background: #0A65CC;
    color: white;
    border: none;
  }
  
  .btn-next:hover {
    background: #4386d3;
  }
  </style>