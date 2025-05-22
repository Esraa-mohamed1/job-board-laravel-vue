<template>
  <div class="contact-info-container needs-validation">
    <div class="progress-header">
      <h2 class="section-title">Contact Information</h2>
    </div>

    <div class="contact-form">
      <div class="form-group full-width">
        <label for="companyAddress">Company Address</label>
        <input
          v-model="localData.company_address"
          type="text"
          placeholder="Enter full company address"
          required
          :class="{'is-invalid': errors.company_address}"
          class="form-control"
          id="companyAddress"
          @blur="validateField('company_address')" >
        <div v-if="errors.company_address" class="invalid-feedback">{{ errors.company_address }}</div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city">City</label>
          <input
            v-model="localData.city"
            type="text"
            placeholder="City"
            required
            :class="{'is-invalid': errors.city}"
            class="form-control"
            id="city"
            @blur="validateField('city')" >
          <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
        </div>

        <div class="form-group">
          <label for="country">Country</label>
          <input
            v-model="localData.country"
            type="text"
            placeholder="Country"
            required
            :class="{'is-invalid': errors.country}"
            class="form-control"
            id="country"
            @blur="validateField('country')" >
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
              id="countryCode"
              @input="formatCountryCode"
              @blur="validateField('country_code')" >
            <input
              v-model="localData.phone"
              type="tel"
              placeholder="Phone number..."
              required
              :class="{'is-invalid': errors.phone}"
              class="form-control"
              id="phoneNumber"
              @blur="validateField('phone')" >
          </div>
          <div class="hint">Example: +20 for Egypt, +1 for USA</div>
          <div v-if="errors.country_code" class="invalid-feedback">{{ errors.country_code }}</div>
          <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="localData.email"
            type="email"
            placeholder="Email address"
            required
            :class="{'is-invalid': errors.email}"
            class="form-control"
            id="email"
            @blur="validateField('email')" >
          <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="btn-prev" @click="goToPreviousStep">Previous</button>
      <button class="btn-next" :disabled="!isFormValid" @click="submitContactInfo">Next</button>
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

// Track which fields have been touched by the user
const touchedFields = ref({
  company_address: false,
  city: false,
  country: false,
  country_code: false,
  phone: false,
  email: false
})

// Modified validateField to only show errors after field is touched
const validateField = (fieldName) => {
  touchedFields.value[fieldName] = true
  errors.value[fieldName] = '' // Clear previous error for this field

  const value = localData.value[fieldName].trim()
  
  switch (fieldName) {
    case 'company_address':
      if (value === '') {
        errors.value.company_address = 'Company address is required'
      }
      break
    case 'city':
      if (value === '') {
        errors.value.city = 'City is required'
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors.value.city = 'City should only contain letters'
      }
      break
    case 'country':
      if (value === '') {
        errors.value.country = 'Country is required'
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors.value.country = 'Country should only contain letters'
      }
      break
    case 'country_code':
      if (value === '') {
        errors.value.country_code = 'Country code is required'
      } else if (!/^\+[0-9]{1,4}$/.test(value)) {
        errors.value.country_code = 'Please enter a valid country code (e.g. +20, +1)'
      }
      break
    case 'phone':
      if (value === '') {
        errors.value.phone = 'Phone number is required'
      } else if (!/^[0-9]+$/.test(value)) {
        errors.value.phone = 'Phone number should only contain numbers'
      } else if (value.length < 7) {
        errors.value.phone = 'Phone number should be at least 7 digits'
      }
      break
    case 'email':
      if (value === '') {
        errors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.value.email = 'Please enter a valid email address'
      }
      break
  }
}

// Only validate fields that have been touched
const isFormValid = computed(() => {
  // Check required fields
  if (!localData.value.company_address.trim()) return false
  if (!localData.value.city.trim()) return false
  if (!localData.value.country.trim()) return false
  if (!localData.value.country_code.trim()) return false
  if (!localData.value.phone.trim()) return false
  if (!localData.value.email.trim()) return false

  // Check if any error exists in the errors object for touched fields
  for (const key in touchedFields.value) {
    if (touchedFields.value[key] && errors.value[key]) {
      return false
    }
  }
  return true
})

const formatCountryCode = () => {
  if (!localData.value.country_code.startsWith('+')) {
    localData.value.country_code = '+' + localData.value.country_code.replace(/[^0-9]/g, '')
  } else {
    localData.value.country_code = '+' + localData.value.country_code.slice(1).replace(/[^0-9]/g, '')
  }
  validateField('country_code')
}

const goToPreviousStep = () => {
  emit('prev')
}

const submitContactInfo = () => {
  // Validate all fields on submit
  Object.keys(touchedFields.value).forEach(field => {
    touchedFields.value[field] = true
    validateField(field)
  })

  if (!isFormValid.value) {
    return
  }

  const contactData = {
    company_address: localData.value.company_address,
    city: localData.value.city,
    country: localData.value.country,
    phone: `${localData.value.country_code}${localData.value.phone}`,
    email: localData.value.email
  }

  emit('next', contactData);
    emit('complete');
}
</script>

<style scoped>
/* Your existing styles remain largely the same, they already support Bootstrap's classes */
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
.btn-next {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #0A65CC;
  color: white;
  border: none;
}

.btn-next:hover {
  background-color: #084b99;
}

.btn-next:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
.contact-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.full-width {
  /* No change, still handles layout */
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

/* Bootstrap's .form-control will override some of this, but it's good as a base */
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