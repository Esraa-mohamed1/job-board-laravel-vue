<template>
  <div class="founding-info-container">
    <h2>Founding Info</h2>
    
    <div class="form-grid">
      <div class="form-group">
        <label>Organization Type</label>
        <input
          v-model="organizationType"
          placeholder="e.g. LLC, Corporation, Nonprofit..."
          required
          :class="{'is-invalid': errors.organizationType}"
          class="form-control"
          list="orgTypes"
        >
        <datalist id="orgTypes">
          <option>LLC</option>
          <option>Corporation</option>
          <option>Nonprofit</option>
          <option>Partnership</option>
          <option>Sole Proprietorship</option>
        </datalist>
        <div v-if="errors.organizationType" class="invalid-feedback">{{ errors.organizationType }}</div>
      </div>
      
      <div class="form-group">
        <label>Year of Establishment</label>
        <input 
          v-model="establishmentYear" 
          type="text" 
          placeholder="dd/mm/yyyy" 
          required 
          :class="{'is-invalid': errors.establishmentYear}" 
          class="form-control"
        >
        <div v-if="errors.establishmentYear" class="invalid-feedback">{{ errors.establishmentYear }}</div>
      </div>
      
      <div class="form-group full-width">
        <label>Company Vision</label>
        <textarea 
          v-model="companyVision" 
          placeholder="Tell us about your company vision..." 
          required 
          :class="{'is-invalid': errors.companyVision}" 
          class="form-control"
        ></textarea>
        <div v-if="errors.companyVision" class="invalid-feedback">{{ errors.companyVision }}</div>
      </div>
      
      <div class="form-group">
        <label>Industry Types</label>
        <input
          v-model="industryType"
          placeholder="e.g. Technology, Finance, Healthcare..."
          required
          :class="{'is-invalid': errors.industryType}"
          class="form-control"
          list="industryTypes"
        >
        <datalist id="industryTypes">
          <option>Technology</option>
          <option>Finance</option>
          <option>Healthcare</option>
          <option>Education</option>
          <option>Manufacturing</option>
        </datalist>
        <div v-if="errors.industryType" class="invalid-feedback">{{ errors.industryType }}</div>
      </div>
      
      <div class="form-group">
        <label>Team Size</label>
        <input
          v-model="teamSize"
          placeholder="e.g. 1-10, 11-50, 51-200..."
          required
          :class="{'is-invalid': errors.teamSize}"
          class="form-control"
          list="teamSizes"
        >
        <datalist id="teamSizes">
          <option>1-10</option>
          <option>11-50</option>
          <option>51-200</option>
          <option>201-500</option>
          <option>500+</option>
        </datalist>
        <div v-if="errors.teamSize" class="invalid-feedback">{{ errors.teamSize }}</div>
      </div>
      
      <div class="form-group full-width">
        <label>Company Website</label>
        <input 
          v-model="companyWebsite" 
          type="url" 
          placeholder="Website url..." 
          required 
          :class="{'is-invalid': errors.companyWebsite}" 
          class="form-control"
        >
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
  return organizationType.value.trim() !== '' &&
         establishmentYear.value.trim() !== '' &&
         companyVision.value.trim() !== '' &&
         industryType.value.trim() !== '' &&
         teamSize.value.trim() !== '' &&
         companyWebsite.value.trim() !== ''
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
  if (organizationType.value.trim() === '') {
    errors.value.organizationType = 'Organization type is required'
    valid = false
  }

  // Year validation (basic format check)
  if (establishmentYear.value.trim() === '') {
    errors.value.establishmentYear = 'Year of establishment is required'
    valid = false
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(establishmentYear.value)) {
    errors.value.establishmentYear = 'Please use dd/mm/yyyy format'
    valid = false
  }

  // Company Vision validation
  if (companyVision.value.trim() === '') {
    errors.value.companyVision = 'Company vision is required'
    valid = false
  }

  // Industry Type validation
  if (industryType.value.trim() === '') {
    errors.value.industryType = 'Industry type is required'
    valid = false
  }

  // Team Size validation
  if (teamSize.value.trim() === '') {
    errors.value.teamSize = 'Team size is required'
    valid = false
  }

  // Website URL validation
  if (companyWebsite.value.trim() === '') {
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

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
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

.btn-next:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>