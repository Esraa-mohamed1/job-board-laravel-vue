<template>
    <div class="step-container">
      <h2>Social Media Profile</h2>
      <p class="subtitle">Contact</p>
      
      <div class="social-links">
  <div class="social-link" v-for="(link, index) in links" :key="index">
    <div class="link-header">
      <span>Social Link {{ index + 1 }}</span>
      <select
        v-model="link.platform"
        required
        :class="{'is-invalid': linkErrors[index] && linkErrors[index].platform}"
        class="form-control"
        @change="clearError(index, 'platform')"
      >
        <option value="" disabled selected>Select platform...</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="instagram">Instagram</option>
        <option value="youtube">YouTube</option>
      </select>
    </div>
    <input
      v-model="link.url"
      placeholder="Profile link/url..."
      required
      :class="{'is-invalid': linkErrors[index] && linkErrors[index].url}"
      class="form-control"
      @input="clearError(index, 'url')"
    >
    <div v-if="linkErrors[index] && linkErrors[index].platform" class="invalid-feedback">
      {{ linkErrors[index].platform }}
    </div>
    <div v-if="linkErrors[index] && linkErrors[index].url" class="invalid-feedback">
      {{ linkErrors[index].url }}
    </div>
  </div>
</div>

<button class="add-link" @click="addLink">Add New Social Link</button>
      
      <div class="navigation">
        <button class="btn-prev" @click="prevStep">Previous</button>
        <button class="btn-next" :disabled="!isFormValid" @click="nextStep">Save & Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const emit = defineEmits(['prev', 'next'])
  
  const links = ref([
    { platform: '', url: '' },
    { platform: '', url: '' },
    { platform: '', url: '' }
  ])
  
  const linkErrors = ref([])
  
  const isFormValid = computed(() => {
    return links.value.every(link => link.platform && link.url)
  })
  
  const validateForm = () => {
    let valid = true
    linkErrors.value = []
    
    links.value.forEach((link, index) => {
      linkErrors.value[index] = { platform: '', url: '' }
      
      if (!link.platform) {
        linkErrors.value[index].platform = 'Platform is required'
        valid = false
      }
      
      if (!link.url) {
        linkErrors.value[index].url = 'URL is required'
        valid = false
      } else if (link.platform) {
        // Platform-specific URL validation
        const platformDomains = {
          facebook: 'facebook.com',
          twitter: 'twitter.com',
          instagram: 'instagram.com',
          youtube: 'youtube.com'
        }
        
        if (!link.url.includes(platformDomains[link.platform])) {
          linkErrors.value[index].url = `URL must contain ${platformDomains[link.platform]}`
          valid = false
        }
      }
    })
    
    return valid
  }
  
  const clearError = (index, field) => {
    if (linkErrors.value[index]) {
      linkErrors.value[index][field] = ''
    }
  }
  
  const addLink = () => {
    links.value.push({ platform: '', url: '' })
  }
  
  const prevStep = () => {
    emit('prev')
  }
  
  const nextStep = () => {
    if (!validateForm()) {
      console.log('Form validation failed') // Debugging
      return
    }
    
    emit('next', {
      socialLinks: links.value.filter(link => link.platform && link.url)
    })
  }
  </script>
  
  <style scoped>
  .step-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 30px;
  }
  
  .social-links {
    margin-bottom: 20px;
  }
  
  .social-link {
    margin-bottom: 20px;
  }
  
  .link-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .link-header span {
    margin-right: 10px;
  }
  
  select, input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }
  
  select {
    margin-right: 10px;
  }
  
  input {
    width: 100%;
  }
  
  .add-link {
    background: none;
    border: 1px dashed #ddd;
    padding: 12px;
    width: 100%;
    margin-bottom: 30px;
    cursor: pointer;
  }
  
  .add-link:hover {
    border-color: #0A65CC;
    color: #0A65CC;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-prev, .btn-next {
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn-prev {
    background: white;
    border: 1px solid #ddd;
  }
  
  .btn-next {
    background: #0A65CC;
    color: white;
    border: none;
  }
  
  .btn-next:hover {
    background: #3982d6;
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