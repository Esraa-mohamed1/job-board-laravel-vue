<template>
  <div class="step-form">
    <h2>Basic Information</h2>
    
    <div class="form-group">
      <label>Company Name *</label>
      <input v-model="localData.companyInfo.name" type="text" required>
    </div>
    
    <div class="form-group">
      <label>About Company</label>
      <textarea v-model="localData.companyInfo.about" rows="4"></textarea>
    </div>
    
    <div class="form-group">
      <label>Company Logo</label>
      <input type="file" @change="handleLogoUpload" accept="image/*">
      <img v-if="localData.companyInfo.logo" :src="localData.companyInfo.logo" class="logo-preview">
    </div>
    
    <div class="form-group">
      <label>Banner Image</label>
      <input type="file" @change="handleBannerUpload" accept="image/*">
      <img v-if="localData.companyInfo.banner" :src="localData.companyInfo.banner" class="banner-preview">
    </div>
    
    <div class="form-actions">
      <button @click="$emit('next')" class="next-btn">Next: Company Details</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'next', 'prev'])

const localData = reactive(JSON.parse(JSON.stringify(props.formData)))

const handleLogoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localData.companyInfo.logo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleBannerUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localData.companyInfo.banner = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

watch(localData, (newVal) => {
  emit('update', newVal)
}, { deep: true })
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.logo-preview, .banner-preview {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  display: block;
}

.next-btn {
  background: #4a6baf;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
</style>