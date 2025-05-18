<template>
  <div class="contact-info-container">
    <div class="progress-header">
      <h2 class="section-title">Contact Information</h2>
    </div>

    <div class="contact-form">
      <div class="form-group full-width">
        <label>Company Address</label>
        <input
          v-model="companyAddress"
          type="text"
          placeholder="Enter full company address"
          required
          :class="{'is-invalid': errors.companyAddress}"
          class="form-control"
        >
        <div v-if="errors.companyAddress" class="invalid-feedback">{{ errors.companyAddress }}</div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>City</label>
          <input
            v-model="city"
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
            v-model="country"
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
              v-model="countryCode"
              type="text"
              placeholder="+20"
              required
              :class="{'is-invalid': errors.countryCode}"
              class="form-control country-code-input"
              @input="formatCountryCode"
            >
            <input
              v-model="phoneNumber"
              type="tel"
              placeholder="Phone number..."
              required
              :class="{'is-invalid': errors.phoneNumber}"
              class="form-control"
            >
          </div>
          <div class="hint">Example: +20 for Egypt, +1 for USA</div>
          <div v-if="errors.countryCode" class="invalid-feedback">{{ errors.countryCode }}</div>
          <div v-if="errors.phoneNumber" class="invalid-feedback">{{ errors.phoneNumber }}</div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
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

const currentStepIndex = ref(3)
const countryCode = ref('+20')
const phoneNumber = ref('')
const email = ref('')
const companyAddress = ref('')
const city = ref('')
const country = ref('Egypt')
const errors = ref({
  companyAddress: '',
  city: '',
  country: '',
  countryCode: '',
  phoneNumber: '',
  email: ''
})

const emit = defineEmits(['prev', 'next'])

const isFormValid = computed(() => {
  return companyAddress.value.trim() !== '' &&
         city.value.trim() !== '' &&
         country.value.trim() !== '' &&
         countryCode.value.trim() !== '' &&
         phoneNumber.value.trim() !== '' &&
         email.value.trim() !== ''
})

const formatCountryCode = () => {
  // Ensure the country code starts with +
  if (!countryCode.value.startsWith('+')) {
    countryCode.value = '+' + countryCode.value.replace(/[^0-9]/g, '')
  } else {
    countryCode.value = '+' + countryCode.value.slice(1).replace(/[^0-9]/g, '')
  }
}

const validateForm = () => {
  let valid = true
  errors.value = {
    companyAddress: '',
    city: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    email: ''
  }

  // Address validation
  if (companyAddress.value.trim() === '') {
    errors.value.companyAddress = 'Company address is required'
    valid = false
  }

  // City validation (only letters and spaces)
  if (city.value.trim() === '') {
    errors.value.city = 'City is required'
    valid = false
  } else if (!/^[a-zA-Z\s]+$/.test(city.value)) {
    errors.value.city = 'City should only contain letters'
    valid = false
  }

  // Country validation (only letters and spaces)
  if (country.value.trim() === '') {
    errors.value.country = 'Country is required'
    valid = false
  } else if (!/^[a-zA-Z\s]+$/.test(country.value)) {
    errors.value.country = 'Country should only contain letters'
    valid = false
  }

  // Country code validation
  if (countryCode.value.trim() === '') {
    errors.value.countryCode = 'Country code is required'
    valid = false
  } else if (!/^\+[0-9]{1,4}$/.test(countryCode.value)) {
    errors.value.countryCode = 'Please enter a valid country code (e.g. +20, +1)'
    valid = false
  }

  // Phone number validation (only numbers)
  if (phoneNumber.value.trim() === '') {
    errors.value.phoneNumber = 'Phone number is required'
    valid = false
  } else if (!/^[0-9]+$/.test(phoneNumber.value)) {
    errors.value.phoneNumber = 'Phone number should only contain numbers'
    valid = false
  } else if (phoneNumber.value.length < 7) {
    errors.value.phoneNumber = 'Phone number should be at least 7 digits'
    valid = false
  }

  // Email validation
  if (email.value.trim() === '') {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }

  return valid
}

const goToPreviousStep = () => {
  emit('prev')
}

const submitContactInfo = async () => {
  if (!validateForm()) return
  
  try {
    const response = await employerApi.post('/', {
      company_address: companyAddress.value,
      city: city.value,
      country: country.value,
      phone: countryCode.value + phoneNumber.value,
      email: email.value
    });

    emit('next', {
      contactInfo: {
        phone: countryCode.value + phoneNumber.value,
        email: email.value,
        address: {
          street: companyAddress.value,
          city: city.value,
          country: country.value
        }
      },
      isComplete: true
    });
  } catch (error) {
    console.error('Error saving contact info:', error);
    alert('Failed to save data. Please try again.');
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