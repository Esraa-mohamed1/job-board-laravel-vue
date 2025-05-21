<template>
  <div class="row h-100">
    <div class="col-12 col-md-6 d-flex align-items-center">
      <div class="register-card">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="MyJob Logo" width="24" />
          <span>MyJob</span>
        </div>
        
        <h1>Create account</h1>
        <p class="login-prompt">Already have account? <router-link to="/login">Log In</router-link></p>
        

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.fullName" type="text" placeholder="Enter your full name" required>
            <p v-if="errors.fullName" class="text-danger small">{{ errors.fullName[0] }}</p>

          </div>

          <div class="form-group">
            <label>Email address</label>
            <input v-model="form.email" type="email" placeholder="Enter your email" required>
            <p v-if="errors.email" class="text-danger small">{{ errors.email[0] }}</p>
          </div>

          <div class="form-group password-group">
            <label>Password</label>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Create password" required>
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
             <p v-if="errors.password" class="text-danger small">{{ errors.password[0] }}</p>
            </button>
          </div>

          <div class="form-group password-group">
            <label>Confirm Password</label>
            <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm password" required>
            <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <i class="fas" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              <p v-if="errors.confirmPassword" class="text-danger small">{{ errors.confirmPassword[0] }}</p>
  
            </button>
          </div>

          <div class="form-group">
            <label>Register as</label>
            <div class="role-selector">
              <button 
                type="button" 
                class="role-btn" 
                :class="{ 'active': form.role === 'candidate' }"
                @click="form.role = 'candidate'"
              >
                <i class="fas fa-user-tie"></i>
                Candidate
              </button>
              <button 
                type="button" 
                class="role-btn" 
                :class="{ 'active': form.role === 'employer' }"
                @click="form.role = 'employer'"
              >
                <i class="fas fa-building"></i>
                Employer
              </button>
            </div>
          </div>
          <div class="terms-agreement">
            <input type="checkbox" id="terms" v-model="form.agreeTerms" required>
            <label for="terms">I've read and agree with your <router-link to="/terms">Terms of Services</router-link></label>
          </div>
      <button 
  type="submit" 
  class="btn-register" 
  :disabled="!isFormValid || loading"
  :class="{ 'loading-state': loading }"
>
  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span v-else>Create Account</span>
</button>
          
          <div class="divider">or</div>
          
          <button type="button" class="btn-google" @click="signInWithGoogle" :disabled="loading">
            <img src="@/assets/google-icon.svg" alt="Google">
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
    
    <div class="col-12 col-md-6">
      <div class="register-banner">
        <div class="banner-content">
          <img class="banner-img d-none d-md-block" src="@/assets/signin.svg" alt="my job">
          <h2>Find your perfect job or candidate</h2>
          <p>Join thousands of employers and candidates who found their perfect match</p>
          
          <div class="stats-container">
            <div class="stat-item">
              <i class="fas fa-briefcase stat-icon py-3"></i>
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Live Jobs</div>
            </div>
            <div class="stat-item">
              <i class="fas fa-building stat-icon py-3"></i>
              <div class="stat-number">5,000+</div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-item">
              <i class="fas fa-users stat-icon py-3"></i>
              <div class="stat-number">50,000+</div>
              <div class="stat-label">Candidates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2' 

const router = useRouter()

const form = ref({
  fullName: '',  
  email: '',
  password: '',
  confirmPassword: '',  
  role: 'candidate',
  agreeTerms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errors = ref({})
const successMessage = ref('')
const isFormValid = computed(() => {
  const basicValidation = form.value.fullName && 
                        form.value.email && 
                        form.value.password && 
                        form.value.password === form.value.confirmPassword && 
                        form.value.agreeTerms
  return basicValidation
})

const handleRegister = async () => {
  if (!isFormValid.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill all required fields correctly'
    })
    return
  }

  try {
    loading.value = true
    errors.value = {}

    const payload = {
      name: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
      role: form.value.role,
    }

    const response = await axios.post('http://localhost:8000/api/register', payload)
    successMessage.value = response.data.message

    if (response.status === 200) {
      await Swal.fire({ 
        icon: 'success',
        title: 'Success',
        text: successMessage.value,
        showConfirmButton: false
      })
      const redirectPath =  '/login'
      router.push(redirectPath)
    }

  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors
      Swal.fire({ 
        icon: 'error',
        title: 'Registration Failed',
        text: Object.values(errors.value).flat()[0] 
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again later.'
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.row {
  height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.logo img {
  margin-right: 0.5rem;
}

.logo span {
  font-weight: bold;
  color: #0A65CC;
  font-size: 1.2rem;
}

h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.login-prompt {
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
}

.login-prompt a {
  color: #0A65CC;
  text-decoration: none;
  font-weight: 500;
}

.profile-upload {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  text-align:center;
}

.upload-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s;
}

.upload-preview:hover {
  border-color: #0A65CC;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
  color: #ccc;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-input {
  display: none;
}

.form-group {
  margin-bottom: 0.75rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #333;
  font-size: 0.85rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group input:focus {
  border-color: #0A65CC;
  outline: none;
  box-shadow: 0 0 0 2px rgba(10, 101, 204, 0.1);
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(25%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.role-selector {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.role-btn {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s;
}

.role-btn i {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: #666;
}

.role-btn.active {
  border-color: #0A65CC;
  background-color: rgba(10, 101, 204, 0.05);
}

.role-btn.active i {
  color: #0A65CC;
}

.terms-agreement {
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  font-size: 0.85rem;
}

.terms-agreement input {
  margin-right: 0.5rem;
}

.terms-agreement label {
  color: #666;
}

.terms-agreement a {
  color: #0A65CC;
  text-decoration: none;
}

.btn-register {
  width: 100%;
  padding: 0.75rem;
  background: #0A65CC;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-register:hover:not(:disabled) {
  background: #084b99;
}

.btn-register:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  color: #999;
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eee;
}

.divider::before {
  margin-right: 0.75rem;
}

.divider::after {
  margin-left: 0.75rem;
}

.btn-google {
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-google:hover:not(:disabled) {
  border-color: #ccc;
  background: #f9f9f9;
}

.btn-google:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-google img {
  width: 16px;
  height: 16px;
}

.register-banner {
  background: linear-gradient(rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.8));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100%;
  min-height: 100vh;
}

.banner-content {
  max-width: 500px;
  text-align: center;
  padding: 1rem;
}

.banner-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.banner-content h2 {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.banner-content p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-size: 0.9rem;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  flex: 1;
  min-width: 100px;
  padding: 0.5rem;
}

.stat-icon {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.8;
}

@media (max-width: 767.98px) {
  .row {
    height: auto;
  }
  
  .register-card {
    padding: 1rem;
    min-height: auto;
  }
  
  .register-banner {
    min-height: auto;
    padding: 1.5rem 1rem;
  }
  
  .stats-container {
    justify-content: center;
  }
  
  .stat-item {
    flex: 0 0 33.333%;
  }
  
  .role-selector {
    flex-direction: column;
  }
}

@media (max-width: 575.98px) {
  .stat-item {
    flex: 0 0 50%;
  }
  
  .banner-content h2 {
    font-size: 1.5rem;
  }
  
  .banner-content p {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  
  .register-card {
    padding: 0.75rem;
  }
}
</style>