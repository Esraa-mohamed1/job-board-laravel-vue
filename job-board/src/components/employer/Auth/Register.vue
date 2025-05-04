<template>
  <div class="register-container">
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
    
    <div class="register-banner">
      <div class="banner-content">
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
  role: 'candidate', // default to candidate
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
  if (!isFormValid.value) return
  
  loading.value = true
  
  try {
    // Register user
    const user = await authStore.register({
      email: form.value.email,
      password: form.value.password,
      role: form.value.role
    })
    
    // Create user profile
    await userStore.createProfile({
      userId: user.uid,
      fullName: form.value.fullName,
      email: form.value.email,
      role: form.value.role,
      profilePhoto: form.value.profilePhoto,
      ...(form.value.role === 'employer' && { companyName: form.value.companyName })
    })
    
    // Redirect based on role
    if (form.value.role === 'employer') {
      router.push('/employer/setup')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = async () => {
  try {
    loading.value = true
    await authStore.signInWithGoogle()
    router.push('/dashboard')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
  overflow-y: auto;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
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
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-prompt a {
  color: #0A65CC;
  text-decoration: none;
  font-weight: 500;
}

.profile-upload {
  margin-bottom: 1.5rem;
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

.form-group {
  margin-bottom: 1.25rem;
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
  transform: translateY(50%);
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
  margin: 1.5rem 0;
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
  margin: 1.5rem 0;
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

.register-banner {
  flex: 1;
  background: linear-gradient(rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.8)), 
              url('@/assets/auth-banner.jpg') center/cover;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-content {
  max-width: 500px;
  text-align: center;
}

.banner-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.banner-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.stat-item {
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

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
  }
  
  .register-banner {
    display: none;
  }
  
  .role-selector {
    flex-direction: column;
  }
}
</style>