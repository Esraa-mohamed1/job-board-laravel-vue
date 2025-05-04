<template>
  <div class="register-container">
    <div class="register-form-container">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="MyJob Logo" width="24" />
        <span>MyJob</span>
      </div>
      
      <h2>Create account.</h2>
      <p class="login-link">Already have account? <a href="#">Log in</a></p>
      
      <!-- Profile Photo Upload -->
      <div class="profile-upload">
        <div class="upload-preview" @click="triggerFileInput">
          <img v-if="profilePreview" :src="profilePreview" alt="Profile Preview" class="preview-image" />
          <div v-else class="upload-placeholder">
            <i class="upload-icon">📷</i>
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
      
      <div class="form-group">
        <input type="text" placeholder="Full Name" v-model="fullName">
      </div>
      
      <div class="form-group">
        <input type="text" placeholder="Username" v-model="username">
      </div>
      
      <div class="form-group">
        <input type="email" placeholder="Email address" v-model="email">
      </div>
      
      <div class="form-group password-group">
        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="password">
        <button class="toggle-password" @click="showPassword = !showPassword">
          <i class="eye-icon">👁️</i>
        </button>
      </div>
      
      <div class="form-group password-group">
        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password" v-model="confirmPassword">
        <button class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
          <i class="eye-icon">👁️</i>
        </button>
      </div>
      
      <div class="form-group checkbox-group">
        <input type="checkbox" id="terms" v-model="agreeTerms">
        <label for="terms">I've read and agree with your <a href="#">Terms of Services</a></label>
      </div>
      
      <button class="create-account-btn" :disabled="!isFormValid">
        Create Account <span class="arrow">→</span>
      </button>
      
      <div class="social-login">
        <button class="social-btn facebook">
          <i class="facebook-icon">f</i> Sign up with Facebook
        </button>
        <button class="social-btn google">
          <i class="google-icon">G</i> Sign up with Google
        </button>
      </div>
    </div>
    
    <div class="register-banner">
      <div class="banner-content">
        <h2>Over 175,324 candidates waiting for good employees.</h2>
        
        <div class="stats-container">
          <div class="stat-item">
            <i class="stat-icon">📋</i>
            <div class="stat-number">175,324</div>
            <div class="stat-label">Live Jobs</div>
          </div>
          
          <div class="stat-item">
            <i class="stat-icon">🏢</i>
            <div class="stat-number">97,354</div>
            <div class="stat-label">Companies</div>
          </div>
          
          <div class="stat-item">
            <i class="stat-icon">📝</i>
            <div class="stat-number">7,532</div>
            <div class="stat-label">New Jobs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form data
const fullName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const profilePreview = ref(null)
const fileInput = ref(null)

// Password visibility
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Form validation
const isFormValid = computed(() => {
  return fullName.value && 
         username.value && 
         email.value && 
         password.value && 
         confirmPassword.value && 
         password.value === confirmPassword.value && 
         agreeTerms.value
})

// File upload methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>
.register-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.register-form-container {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.logo span {
  font-weight: bold;
  margin-left: 0.5rem;
  color: #0066cc;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.login-link {
  margin-bottom: 1.5rem;
  color: #666;
}

.login-link a {
  color: #0066cc;
  text-decoration: none;
}

/* Profile upload styles */
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
  border-color: #0066cc;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
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
  margin-bottom: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group label {
  font-size: 0.9rem;
  color: #666;
}

.checkbox-group a {
  color: #0066cc;
  text-decoration: none;
}

.create-account-btn {
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-account-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.arrow {
  margin-left: 0.5rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.facebook-icon, .google-icon {
  margin-right: 0.5rem;
  font-style: normal;
}

.register-banner {
  flex: 1;
  background: linear-gradient(rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.8)), 
              url('https://images.unsplash.com/photo-1497215842964-222b430dc094') center/cover;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-content {
  max-width: 500px;
}

.banner-content h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.stats-container {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  text-align: center;
}

.stat-icon {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 auto 1rem;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
  }
  
  .register-banner {
    display: none;
  }
}
</style>
