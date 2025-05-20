<template>
  <div class="social-media-step">
    <h2>Social Media Links</h2>
    <p class="subtitle">Add your company's social media profiles</p>
    
    <div class="social-links">
      <div class="social-link" v-for="(link, index) in localData.social_links" :key="index">
        <div class="link-header">
          <span>Social Link {{ index + 1 }}</span>
          <button v-if="localData.social_links.length > 1" class="remove-link" @click="removeLink(index)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <input
          v-model="link.platform"
          placeholder="Platform (e.g. Facebook, Twitter)"
          required
          :class="{'is-invalid': errors[index] && errors[index].platform}"
          class="form-control"
        >
        <input
          v-model="link.url"
          placeholder="Profile URL"
          required
          :class="{'is-invalid': errors[index] && errors[index].url}"
          class="form-control"
        >
        <div v-if="getPlatformError(index)" class="invalid-feedback">{{ getPlatformError(index) }}</div>
        <div v-if="getErrorUrl(index)" class="invalid-feedback">{{ getErrorUrl(index) }}</div>
      </div>
    </div>
    
    <button class="add-link" @click="addLink">
      <i class="fas fa-plus"></i> Add Another Link
    </button>
    
    <div class="navigation-buttons">
      <button class="btn-prev" @click="goToPrevious">Previous</button>
      <button class="btn-next" :disabled="!isFormValid" @click="submitForm">Save & Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['prev', 'next'])
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const localData = ref({
  social_links: props.formData.social_links?.length ? [...props.formData.social_links] : [
    { platform: '', url: '' }
  ]
})

const errors = ref([])

const isFormValid = computed(() => {
  return localData.value.social_links.every(link => 
    link.platform.trim() !== '' && 
    link.url.trim() !== '' && 
    isValidUrl(link.url)
  )
})
const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const getPlatformError = (index) => {
  return errors.value[index] && errors.value[index].platform;
};

const getErrorUrl = (index) => {
  return errors.value[index] && errors.value[index].url;
};

const validateForm = () => {
  let valid = true
  errors.value = []

  localData.value.social_links.forEach((link, index) => {
    errors.value[index] = { platform: '', url: '' }

    if (link.platform.trim() === '') {
      errors.value[index].platform = 'Platform is required'
      valid = false
    }

    if (link.url.trim() === '') {
      errors.value[index].url = 'URL is required'
      valid = false
    } else if (!isValidUrl(link.url)) {
      errors.value[index].url = 'Please enter a valid URL'
      valid = false
    }
  })

  return valid
}

const addLink = () => {
  localData.value.social_links.push({ platform: '', url: '' })
}

const removeLink = (index) => {
  localData.value.social_links.splice(index, 1)
}

const goToPrevious = () => {
  emit('prev')
}

const submitForm = () => {
  if (!validateForm()) return
  
  const socialData = {
    linkedIn: '',
    facebook: '',
    twitter: ''
  }
  
  localData.value.social_links.forEach(link => {
    const platform = link.platform.toLowerCase()
    if (platform.includes('linkedin')) {
      socialData.linkedIn = link.url
    } else if (platform.includes('facebook')) {
      socialData.facebook = link.url
    } else if (platform.includes('twitter')) {
      socialData.twitter = link.url
    }
  })
  
  emit('next', socialData)
}
</script>

<style scoped>
.social-media-step {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.social-links {
  margin-bottom: 20px;
}

.social-link {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.link-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.link-header span {
  font-weight: 500;
  color: #333;
}

.remove-link {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: -5px;
  margin-bottom: 10px;
}

.add-link {
  background: none;
  border: 1px dashed #ddd;
  color: #0A65CC;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
  transition: all 0.3s;
}

.add-link:hover {
  border-color: #0A65CC;
  background: rgba(10, 101, 204, 0.05);
}

.add-link i {
  margin-right: 5px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-prev, .btn-next {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-prev {
  background: white;
  border: 1px solid #ddd;
  color: #333;
}

.btn-prev:hover {
  border-color: #0A65CC;
  color: #0A65CC;
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
</style>