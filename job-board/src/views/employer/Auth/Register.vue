<template>
  <div class="register-container">
    <div class="col-md-6 form-section">
      <div class="register-card">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="MyJob Logo" width="24" />
          <span>MyJob</span>
        </div>
        <h1>Create account</h1>
        <p class="login-prompt">Already have account? <router-link to="/login">Log In</router-link></p>

        <!-- Profile Photo Upload -->
        <div class="profile-upload">
          <div class="upload-preview" @click="triggerFileInput">
            <img v-if="form.profilePhoto" :src="form.profilePhoto" alt="Profile Preview" class="preview-image" />
            <div v-else class="upload-placeholder">
              <i class="fas fa-user-circle upload-icon"></i>
              <span>Upload Photo</span>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput" 
            accept="image/*" 
            @change="handleFileUpload" 
            class="file-input"
          >
        </div>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.fullName" type="text" placeholder="Enter your full name" required>
          </div>
          
          <div class="form-group">
            <label>Email address</label>
            <input v-model="form.email" type="email" placeholder="Enter your email" required>
          </div>
          
          <div class="form-group password-group">
            <label>Password</label>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Create password" required>
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
          
          <div class="form-group password-group">
            <label>Confirm Password</label>
            <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm password" required>
            <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <i class="fas" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
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
          
          <!-- Conditional fields for employer -->
          <div v-if="form.role === 'employer'" class="form-group">
            <label>Company Name</label>
            <input v-model="form.companyName" type="text" placeholder="Enter company name" required>
          </div>
          
          <div class="terms-agreement">
            <input type="checkbox" id="terms" v-model="form.agreeTerms" required>
            <label for="terms">I've read and agree with your <router-link to="/terms">Terms of Services</router-link></label>
          </div>
          
          <button type="submit" class="btn-register" :disabled="!isFormValid || loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ loading ? 'Processing...' : 'Create Account' }}
          </button>
          
          <div class="divider">or</div>
          
          <button type="button" class="btn-google" @click="signInWithGoogle" :disabled="loading">
            <img src="@/assets/google-icon.svg" alt="Google">
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
    <div class="col-md-6 banner-section">
      <div class="register-banner">
        <div class="banner-content">
          <img src="@/assets/signin.svg" alt="Job illustration" class="banner-image">
          <h2>Find your perfect job or candidate</h2>
          <p>Join thousands of employers and candidates who found their perfect match</p>
          
          <div class="stats-container">
            <div class="stat-item">
              <i class="fas fa-briefcase stat-icon"></i>
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Live Jobs</div>
            </div>
            <div class="stat-item">
              <i class="fas fa-building stat-icon"></i>
              <div class="stat-number">5,000+</div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-item">
              <i class="fas fa-users stat-icon"></i>
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
import { useAuthStore } from '@/stores/employer/auth'
import { useUserStore } from '@/stores/employer/user'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'candidate',
  companyName: '',
  profilePhoto: null,
  agreeTerms: false
})

const fileInput = ref(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const isFormValid = computed(() => {
  const basicValidation = form.value.fullName && 
                        form.value.email && 
                        form.value.password && 
                        form.value.password === form.value.confirmPassword && 
                        form.value.agreeTerms
  
  if (form.value.role === 'employer') {
    return basicValidation && form.value.companyName
  }
  return basicValidation
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.profilePhoto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleRegister = async () => {
  if (!isFormValid.value) {
    alert('Please fill all required fields correctly')
    return
  }

  try {
    loading.value = true
    
    // 1. Register user
    const user = await authStore.register({
      email: form.value.email,
      password: form.value.password,
      role: form.value.role
    })
    
    // 2. Create profile
    await userStore.createProfile({
      userId: user.uid,
      fullName: form.value.fullName,
      email: form.value.email,
      role: form.value.role,
      profilePhoto: form.value.profilePhoto,
      ...(form.value.role === 'employer' && { 
        companyName: form.value.companyName 
      })
    })
    
    // 3. Redirect based on role
    const redirectPath = form.value.role === 'employer' 
      ? '/employer-dashboard' 
      : '/candidate-dashboard'
    
    router.push(redirectPath)
    
  } catch (error) {
    console.error('Registration error:', error)
    alert(authStore.error || userStore.error || 'Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = async () => {
  try {
    loading.value = true
    await authStore.signInWithGoogle()
    await router.push('/dashboard')
  } catch (error) {
    alert(error.message || 'Google sign-in failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

/* Form Section */
.form-section {
  flex: 1;
  display: flex;
  align-items: flex-start; /* Changed from center to start to ensure top is visible */
  justify-content: center;
  height: 100vh;
  background: white;
  overflow-y: auto;
  padding: 1rem; /* Reduced padding to give more space for content */
  box-sizing: border-box;
}

.register-card {
  width: 100%;
  max-width: 450px;
  padding: 1.5rem; /* Reduced padding to prevent content from being pushed down */
  margin-top: 1rem; /* Small margin to avoid sticking to top edge */
}

/* Banner Section */
.banner-section {
  flex: 1;
  height: 100vh;
  position: relative;
}

.register-banner {
  height: 100%;
  background: linear-gradient(rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.8)), url('@/assets/signin-bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
}

.banner-content {
  max-width: 400px;
  text-align: center;
}

.banner-image {
  width: 100%;
  max-width: 280px;
  margin-bottom: 2rem;
  object-fit: contain;
}

/* Form Elements */
.form-group {
  margin-bottom: 1.25rem; /* Slightly reduced to save vertical space */
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.role-selector {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.role-btn {
  flex: 1;
  padding: 0.75rem;
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
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
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
  margin: 1.25rem 0; /* Reduced margin */
  font-size: 0.9rem;
}

.terms-agreement input {
  margin-right: 0.75rem;
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
  padding: 0.875rem;
  background: #0A65CC;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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
  margin: 1.25rem 0; /* Reduced margin */
  color: #999;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eee;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

.btn-google {
  width: 100%;
  padding: 0.875rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 500;
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
  width: 18px;
  height: 18px;
}

/* Profile Upload */
.profile-upload {
  margin-bottom: 1.25rem; /* Reduced margin */
  display: flex;
  justify-content: center;
}

.upload-preview {
  width: 120px;
  height: 120px;
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
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
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

/* Stats Container */
.stats-container {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.stat-item

 {
  text-align: center;
  flex: 1;
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem; /* Reduced margin */
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
  margin-bottom: 1rem; /* Reduced margin */
  text-align: center;
}

.login-prompt a {
  color: #0A65CC;
  text-decoration: none;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 992px) {
  .register-container {
    flex-direction: column;
  }
  
  .form-section, 
  .banner-section {
    flex: none;
    width: 100%;
    height: auto;
    min-height: 50vh;
  }
  
  .form-section {
    padding: 1rem;
    align-items: flex-start;
  }
  
  .register-card {
    padding: 1.5rem;
    margin-top: 0.5rem;
  }
  
  .banner-content {
    padding: 2rem 0;
  }
}

@media (max-width: 768px) {
  .banner-section {
    display: none;
  }
  
  .form-section {
    height: 100vh;
    padding: 1rem;
    align-items: flex-start;
  }
  
  .register-card {
    max-width: 100%;
    padding: 1rem;
    margin-top: 0.5rem;
  }
  
  .role-selector {
    flex-direction: column;
  }
}
</style>