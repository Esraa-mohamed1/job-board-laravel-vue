<template>
  <div class="contact-info-container">
    <div class="progress-header">
      <h2 class="section-title">Contact Information</h2>
    </div>

    <div class="contact-form">
      <div class="form-group full-width">
        <label>Company Address</label>
        <input
          v-model="localData.company_address"
          type="text"
          placeholder="Enter full company address"
          required
          :class="{'is-invalid': errors.company_address}"
          class="form-control"
        >
        <div v-if="errors.company_address" class="invalid-feedback">{{ errors.company_address }}</div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>City</label>
          <input
            v-model="localData.city"
            type="text"
            placeholder="City"
            required
            :class="{'is-invalid': errors.city}"
            class="form-control"
          >
          <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
        </div>
        
        <div class="form-group">
          <label>Country</label>
          <input
            v-model="localData.country"
            type="text"
            placeholder="Country"
            required
            :class="{'is-invalid': errors.country}"
            class="form-control"
          >
          <div v-if="errors.country" class="invalid-feedback">{{ errors.country }}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Phone</label>
          <div class="phone-input">
            <input
              v-model="localData.country_code"
              type="text"
              placeholder="+20"
              required
              :class="{'is-invalid': errors.country_code}"
              class="form-control country-code-input"
              @input="formatCountryCode"
            >
            <input
              v-model="localData.phone"
              type="tel"
              placeholder="Phone number..."
              required
              :class="{'is-invalid': errors.phone}"
              class="form-control"
            >
          </div>
          <div class="hint">Example: +20 for Egypt, +1 for USA</div>
          <div v-if="errors.country_code" class="invalid-feedback">{{ errors.country_code }}</div>
          <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="localData.email"
            type="email"
            placeholder="Email address"
            required
            :class="{'is-invalid': errors.email}"
            class="form-control"
          >
          <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="btn-prev" @click="goToPreviousStep">Previous</button>
      <button class="btn-finish" :disabled="!isFormValid" @click="submitContactInfo">Save & Complete Profile</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['prev', 'next', 'complete'])
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const localData = ref({
  company_address: props.formData.company_address || '',
  city: props.formData.city || '',
  country: props.formData.country || 'Egypt',
  country_code: props.formData.country_code || '+20',
  phone: props.formData.phone || '',
  email: props.formData.email || ''
})

const errors = ref({
  company_address: '',
  city: '',
  country: '',
  country_code: '',
  phone: '',
  email: ''
})

const isFormValid = computed(() => {
  return localData.value.company_address.trim() !== '' &&
         localData.value.city.trim() !== '' &&
         localData.value.country.trim() !== '' &&
         localData.value.country_code.trim() !== '' &&
         localData.value.phone.trim() !== '' &&
         localData.value.email.trim() !== ''
})

const formatCountryCode = () => {
  if (!localData.value.country_code.startsWith('+')) {
    localData.value.country_code = '+' + localData.value.country_code.replace(/[^0-9]/g, '')
  } else {
    localData.value.country_code = '+' + localData.value.country_code.slice(1).replace(/[^0-9]/g, '')
  }
}

const validateForm = () => {
  let valid = true
  errors.value = {
    company_address: '',
    city: '',
    country: '',
    country_code: '',
    phone: '',
    email: ''
  }

  if (localData.value.company_address.trim() === '') {
    errors.value.company_address = 'Company address is required'
    valid = false
  }

  if (localData.value.city.trim() === '') {
    errors.value.city = 'City is required'
    valid = false
  } else if (!/^[a-zA-Z\s]+$/.test(localData.value.city)) {
    errors.value.city = 'City should only contain letters'
    valid = false
  }

  if (localData.value.country.trim() === '') {
    errors.value.country = 'Country is required'
    valid = false
  } else if (!/^[a-zA-Z\s]+$/.test(localData.value.country)) {
    errors.value.country = 'Country should only contain letters'
    valid = false
  }

  if (localData.value.country_code.trim() === '') {
    errors.value.country_code = 'Country code is required'
    valid = false
  } else if (!/^\+[0-9]{1,4}$/.test(localData.value.country_code)) {
    errors.value.country_code = 'Please enter a valid country code (e.g. +20, +1)'
    valid = false
  }

  if (localData.value.phone.trim() === '') {
    errors.value.phone = 'Phone number is required'
    valid = false
  } else if (!/^[0-9]+$/.test(localData.value.phone)) {
    errors.value.phone = 'Phone number should only contain numbers'
    valid = false
  } else if (localData.value.phone.length < 7) {
    errors.value.phone = 'Phone number should be at least 7 digits'
    valid = false
  }

  if (localData.value.email.trim() === '') {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }

  return valid
}

const goToPreviousStep = () => {
  emit('prev')
}

const submitContactInfo = async () => {
  if (!validateForm()) return;
  
  try {
    const contactData = {
      company_address: localData.value.company_address,
      city: localData.value.city,
      country: localData.value.country,
      phone: `${localData.value.country_code}${localData.value.phone}`,
      email: localData.value.email,
      isComplete: true
    };
    
    emit('next', contactData);
    emit('complete'); // إرسال حدث الإكتمال
  } catch (error) {
    console.error('Error submitting contact info:', error);
    alert('Failed to save contact information. Please try again.');
  }
}
</script>


<style scoped>
.contact-info-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.progress-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  color: #34495e;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.contact-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.phone-input {
  display: flex;
  gap: 0.5rem;
}

.country-code-input {
  width: 80px;
  flex-shrink: 0;
}

.hint {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-prev,
.btn-finish {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-prev {
  background-color: white;
  border: 1px solid #bdc3c7;
  color: #34495e;
}

.btn-prev:hover {
  border-color: #0A65CC;
  color: #0A65CC;
}

.btn-finish {
  background-color: #0A65CC;
  color: white;
  border: none;
}

.btn-finish:hover {
  background-color: #084b99;
}

.btn-finish:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .phone-input {
    flex-direction: column;
  }
  
  .country-code-input {
    width: 100%;
  }
}
</style>