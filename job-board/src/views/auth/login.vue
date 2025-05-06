<template>
        <div class="row">
            <div class="col-6 d-flex align-items-center">

      <div class="register-card">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="MyJob Logo" width="24" />
          <span>MyJob</span>
        </div>
        
        <h1> Sign in</h1>
        <p class="login-link">Don’t have account? <a href="/register"> Create Account</a></p>  
        <form @submit.prevent="handleRegister">
              <div class="form-group">
            <label>Email address</label>
            <input v-model="form.email" type="email" placeholder="Enter your email" required>
          </div>
          
          <div class="form-group password-group">
            <label>Password</label>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Create password" required>
            <button type="button" class="toggle-password d-flex" @click="showPassword = !showPassword">
              <i class="fas pb" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
<div><p class="forgot-password-link">
    <router-link to="/forgot-password">Forgot your password?</router-link>
  </p></div>
          <button type="submit" class="btn-register">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ loading ? 'Processing...' : 'Sign in' }}
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 12H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 5L19.5 12L12.5 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        
          <div class="divider">or</div>
          
          <button type="button" class="btn-google" @click="signInWithGoogle" :disabled="loading">
            <img src="@/assets/google-icon.svg" alt="Google">
            Sign up with Google
          </button>
         
        </form>
      </div>
    </div>
          
    <div class="col-6">
      <div class="register-banner">
        <div class="banner-content">
            <img class="banner-content"  src="@/assets/signin.svg" alt="my job ">

          <h2>Find your perfect job or candidate</h2>
          <p>Join thousands of employers and candidates who found their perfect match</p>
          
          <div class="stats-container">
            <div class="stat-item">
              <i class="fas fa-briefcase stat-icon  py-3"></i>
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Live Jobs</div>
            </div>
            <div class="stat-item">
              <i class="fas fa-building stat-icon  py-3"></i>
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
  import { useAuthStore } from '@/stores/employer/auth'
  import { useUserStore } from '@/stores/employer/user'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  
  const form = ref({
    email: '',
    password: '',
  
  })
  
  const showPassword = ref(false)
  const loading = ref(false)
  
  const isFormValid = computed(() => {
    const basicValidation = 
                          form.value.email && 
                          form.value.password 
                         
    return basicValidation
  })
  

  const handleRegister = async () => {
   
      router.push('/candidate/dashboard')
      
 
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
    background: linear-gradient(rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.8));
               
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