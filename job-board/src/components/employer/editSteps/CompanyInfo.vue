<template>
    <div class="company-info-step">
      <h2>Company Information</h2>
      
      <div class="form-section">
        <div class="upload-group">
          <label>Company Logo</label>
          <div class="upload-box" @click="triggerLogoUpload">
            <div v-if="!localData.logo" class="upload-placeholder">
              <span>Click to upload logo</span>
              <span class="hint">Recommended size: 400x400px</span>
            </div>
            <img v-else :src="localData.logo" class="logo-preview" alt="Company Logo">
            <input 
              ref="logoInput"
              type="file" 
              accept="image/*"
              @change="handleLogoUpload"
              class="file-input"
            >
          </div>
        </div>
        
        <div class="upload-group">
          <label>Banner Image</label>
          <div class="upload-box" @click="triggerBannerUpload">
            <div v-if="!localData.banner" class="upload-placeholder">
              <span>Click to upload banner</span>
              <span class="hint">Recommended size: 1520x405px</span>
            </div>
            <img v-else :src="localData.banner" class="banner-preview" alt="Company Banner">
            <input 
              ref="bannerInput"
              type="file" 
              accept="image/*"
              @change="handleBannerUpload"
              class="file-input"
            >
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input
          id="companyName"
          v-model="localData.name"
          type="text"
          placeholder="Enter your company name"
          required
          :class="{'is-invalid': errors.name}"
          class="form-control"
        >
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <label for="aboutUs">About Us</label>
        <textarea
          id="aboutUs"
          v-model="localData.about"
          rows="5"
          placeholder="Tell candidates about your company..."
          required
          :class="{'is-invalid': errors.about}"
          class="form-control"
        ></textarea>
        <div v-if="errors.about" class="invalid-feedback">{{ errors.about }}</div>
      </div>
      
      <div class="form-actions">
        <button 
          type="button" 
          class="btn-next"
          :disabled="!isFormValid"
          @click="submitForm"
        >
          Save & Continue
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, watch } from 'vue'
import { useEmployerStore } from '../../../stores/employer/employer.store'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['next', 'prev'])

const store = useEmployerStore()

const localData = ref({
  logo: props.formData.logo || '',
  banner: props.formData.banner || '',
  name: props.formData.name || '',
  about: props.formData.about || ''
})

const logoFile = ref(null)
const bannerFile = ref(null)
const errors = ref({ name: '', about: '' })
const logoInput = ref(null)
const bannerInput = ref(null)

watch(() => props.formData, (newData) => {
  localData.value = {
    logo: newData.logo || '',
    banner: newData.banner || '',
    name: newData.name || '',
    about: newData.about || ''
  }
}, { deep: true })

const isFormValid = computed(() => {
  return localData.value.name.trim() !== '' && 
         localData.value.about.trim() !== ''
})

const validateForm = () => {
  let valid = true
  errors.value = { name: '', about: '' }

  if (localData.value.name.trim() === '') {
    errors.value.name = 'Company name is required'
    valid = false
  } else if (!/^[a-zA-Z\s\-.,&']+$/.test(localData.value.name)) {
    errors.value.name = 'Company name should only contain letters and basic punctuation'
    valid = false
  }

  if (localData.value.about.trim() === '') {
    errors.value.about = 'About us information is required'
    valid = false
  }

  return valid
}


const triggerLogoUpload = () => {
  logoInput.value.click()
}

const triggerBannerUpload = () => {
  bannerInput.value.click()
}

const handleLogoUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    logoFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      localData.value.logo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleBannerUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    bannerFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      localData.value.banner = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  if (!validateForm()) return

  try {
    if (logoFile.value) {
      const logoUrl = await store.uploadImage(logoFile.value)
      localData.value.logo = logoUrl
    }
    
    if (bannerFile.value) {
      const bannerUrl = await store.uploadImage(bannerFile.value)
      localData.value.banner = bannerUrl
    }

    emit('next', localData.value)
  } catch (error) {
    console.error('Error uploading images:', error)
    alert('Failed to upload images. Please try again.')
  }
}
</script>
  

  <style scoped>
  /* Previous styles remain unchanged */
  .company-info-step {
    padding: 1rem;
  }
  
  .form-section {
    margin-bottom: 1.5rem;
  }
  
  .upload-group {
    margin-bottom: 1.5rem;
  }
  
  .upload-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .upload-box {
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s;
    position: relative;
    overflow: hidden;
  }
  
  .upload-box:hover {
    border-color: #0A65CC;
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hint {
    font-size: 0.8rem;
    color: #6c757d;
  }
  
  .file-input {
    display: none;
  }
  
  .logo-preview {
    max-width: 150px;
    max-height: 150px;
    border-radius: 4px;
  }
  
  .banner-preview {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
  
  .btn-next {
    background: #0A65CC;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-next:hover {
    background: #0A65CC;
  }
  
  .btn-next:disabled {
    background: #a7a7a7;
    cursor: not-allowed;
  }
  </style>