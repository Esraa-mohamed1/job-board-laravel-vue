<template>
  <div class="founding-info-container needs-validation" :class="{'was-validated': formSubmitted}">    
      <h2>Founding Info</h2>
      
      <div class="form-grid">
        <div class="form-group">
          <label>Organization Type</label>
          <input
            v-model="localData.organization_type"
            placeholder="e.g. LLC, Corporation, Nonprofit..."
            required
            :class="{'is-invalid': errors.organization_type}"
            class="form-control"
            list="orgTypes"
            @blur="validateField('organization_type')"
          >
          <datalist id="orgTypes">
            <option>LLC</option>
            <option>Corporation</option>
            <option>Nonprofit</option>
            <option>Partnership</option>
            <option>Sole Proprietorship</option>
          </datalist>
          <div v-if="errors.organization_type" class="invalid-feedback">{{ errors.organization_type }}</div>
        </div>
        
        <div class="form-group">
          <label>Year of Establishment</label>
          <input 
            v-model="localData.establishment_year" 
            type="text" 
            placeholder="YYYY" 
            required 
            :class="{'is-invalid': errors.establishment_year}" 
            class="form-control"
            @blur="validateField('establishment_year')"
          >
          <div v-if="errors.establishment_year" class="invalid-feedback">{{ errors.establishment_year }}</div>
        </div>
        
        <div class="form-group full-width">
          <label>Company Vision</label>
          <textarea 
            v-model="localData.company_vision" 
            placeholder="Tell us about your company vision..." 
            required 
            :class="{'is-invalid': errors.company_vision}" 
            class="form-control"
            @blur="validateField('company_vision')"
          ></textarea>
          <div v-if="errors.company_vision" class="invalid-feedback">{{ errors.company_vision }}</div>
        </div>
        
        <div class="form-group">
          <label>Industry Types</label>
          <input
            v-model="localData.industry_type"
            placeholder="e.g. Technology, Finance, Healthcare..."
            required
            :class="{'is-invalid': errors.industry_type}"
            class="form-control"
            list="industryTypes"
            @blur="validateField('industry_type')"
          >
          <datalist id="industryTypes">
            <option>Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Manufacturing</option>
          </datalist>
          <div v-if="errors.industry_type" class="invalid-feedback">{{ errors.industry_type }}</div>
        </div>
        
        <div class="form-group">
          <label>Team Size</label>
          <input
            v-model="localData.team_size"
            placeholder="e.g. 1-10, 11-50, 51-200..."
            required
            :class="{'is-invalid': errors.team_size}"
            class="form-control"
            list="teamSizes"
            @blur="validateField('team_size')"
          >
          <datalist id="teamSizes">
            <option>1-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>201-500</option>
            <option>500+</option>
          </datalist>
          <div v-if="errors.team_size" class="invalid-feedback">{{ errors.team_size }}</div>
        </div>
        
        <div class="form-group full-width">
          <label>Company Website</label>
          <input 
            v-model="localData.company_website" 
            type="url" 
            placeholder="Website url..." 
            required 
            :class="{'is-invalid': errors.company_website}" 
            class="form-control"
            @blur="validateField('company_website')"
          >
          <div v-if="errors.company_website" class="invalid-feedback">{{ errors.company_website }}</div>
        </div>
      </div>
      
      <div class="navigation-buttons">
        <button class="btn-prev" @click="goToPrevious">Previous</button>
        <button class="btn-next" :disabled="!isFormValid" @click="saveAndContinue">Save & Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const formSubmitted = ref(false)
  
  const emit = defineEmits(['prev', 'next'])
  const props = defineProps({
    formData: {
      type: Object,
      default: () => ({})
    }
  })
  
  const localData = ref({
    organization_type: props.formData.organization_type || '',
    establishment_year: props.formData.establishment_year || '',
    company_vision: props.formData.company_vision || '',
    industry_type: props.formData.industry_type || '',
    team_size: props.formData.team_size || '',
    company_website: props.formData.company_website || ''
  })
  
  const errors = ref({
    organization_type: '',
    establishment_year: '',
    company_vision: '',
    industry_type: '',
    team_size: '',
    company_website: ''
  })
  
  const isFormValid = computed(() => {
    return Object.keys(errors.value).every(key => !errors.value[key]) &&
           Object.values(localData.value).every(value => value.trim() !== '')
  })
  
  const validateField = (field) => {
    if (field === 'organization_type') {
      errors.value.organization_type = localData.value.organization_type.trim() === '' ? 'Organization type is required' : ''
    } else if (field === 'establishment_year') {
      if (localData.value.establishment_year.trim() === '') {
        errors.value.establishment_year = 'Year of establishment is required'
      } else if (!/^\d{2}-\d{2}-\d{4}$/.test(localData.value.establishment_year)) {
        errors.value.establishment_year = 'Please use DD-MM-YYYY format'
      } else {
        errors.value.establishment_year = ''
      }
    } else if (field === 'company_vision') {
      errors.value.company_vision = localData.value.company_vision.trim() === '' ? 'Company vision is required' : ''
    } else if (field === 'industry_type') {
      errors.value.industry_type = localData.value.industry_type.trim() === '' ? 'Industry type is required' : ''
    } else if (field === 'team_size') {
      errors.value.team_size = localData.value.team_size.trim() === '' ? 'Team size is required' : ''
    } else if (field === 'company_website') {
      if (localData.value.company_website.trim() === '') {
        errors.value.company_website = 'Company website is required'
      } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(localData.value.company_website)) {
        errors.value.company_website = 'Please enter a valid website URL'
      } else {
        errors.value.company_website = ''
      }
    }
  }
  
  // Watch all fields and validate on change
  watch(() => localData.value.organization_type, () => validateField('organization_type'))
  watch(() => localData.value.establishment_year, () => validateField('establishment_year'))
  watch(() => localData.value.company_vision, () => validateField('company_vision'))
  watch(() => localData.value.industry_type, () => validateField('industry_type'))
  watch(() => localData.value.team_size, () => validateField('team_size'))
  watch(() => localData.value.company_website, () => validateField('company_website'))
  
  const validateForm = () => {
    let valid = true
    errors.value = {
      organization_type: '',
      establishment_year: '',
      company_vision: '',
      industry_type: '',
      team_size: '',
      company_website: ''
    }
  
    if (localData.value.organization_type.trim() === '') {
      errors.value.organization_type = 'Organization type is required'
      valid = false
    }
    if (localData.value.establishment_year.trim() === '') {
      errors.value.establishment_year = 'Year of establishment is required'
      valid = false
    }else if (!/^\d{2}-\d{2}-\d{4}$/.test(localData.value.establishment_year)) {
      errors.value.establishment_year = 'Please use DD-MM-YYYY format'
      valid = false
    }
    if (localData.value.company_vision.trim() === '') {
      errors.value.company_vision = 'Company vision is required'
      valid = false
    }
    if (localData.value.industry_type.trim() === '') {
      errors.value.industry_type = 'Industry type is required'
      valid = false
    }
    if (localData.value.team_size.trim() === '') {
      errors.value.team_size = 'Team size is required'
      valid = false
    }
    if (localData.value.company_website.trim() === '') {
      errors.value.company_website = 'Company website is required'
      valid = false
    } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(localData.value.company_website)) {
      errors.value.company_website = 'Please enter a valid website URL'
      valid = false
    }
  
    return valid
  }
  
  const goToPrevious = () => {
    emit('prev')
  }
  
  const saveAndContinue = () => {
    formSubmitted.value = true
    if (!validateForm()) return
    
    ElMessage.success('Information saved successfully')
    emit('next', localData.value)
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
    color: #333;
  }
  
  .btn-next {
    background: #0A65CC;
    color: white;
    border: none;
  }
  
  .btn-next:hover {
    background: #084b99;
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
  
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .form-group.full-width {
      grid-column: span 1;
    }
  }
  </style>