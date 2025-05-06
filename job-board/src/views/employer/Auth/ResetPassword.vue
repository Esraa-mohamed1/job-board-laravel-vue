<template>
  <div class="auth-container">
    <!-- Email Verification Component -->
    <div v-if="showVerification" class="auth-card verification-card">
      <div class="verification-header">
        <h2>Email Verification</h2>
        <div class="verification-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0A65CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
      </div>
      
      <p class="verification-text">
        We've sent a verification to <strong>enabledevelop@mail.com</strong> to verify your email address and activate your account.
      </p>
      
      <div class="verification-code">
        <h3>Verification Code</h3>
        <div class="code-inputs">
          <input v-for="n in 6" :key="n" 
                 v-model="verificationCode[n-1]" 
                 @input="focusNext($event, n)"
                 @keydown.delete="focusPrev($event, n)"
                 maxlength="1"
                 type="text"
                 class="code-input">
        </div>
      </div>
      
      <button class="btn-primary" @click="verifyEmail">Verify My Account</button>
      
      <p class="resend-text">
        Didn't receive any code? <a href="#" @click.prevent="resendCode">Resend</a>
      </p>
    </div>

    <!-- Reset Password Component -->
    <div v-else class="auth-card">
      <div class="auth-header">
        <h2>Reset Password</h2>
        <p class="subtitle">Enter your new password below</p>
      </div>
      
      <form @submit.prevent="handleReset">
        <div class="form-group">
          <label>New Password</label>
          <div class="password-input">
            <input v-model="form.newPassword" 
                   :type="showNewPassword ? 'text' : 'password'" 
                   required
                   placeholder="Enter new password">
            <button type="button" class="toggle-password" @click="showNewPassword = !showNewPassword">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path v-if="showNewPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <circle v-if="showNewPassword" cx="12" cy="12" r="3"></circle>
                <path v-else d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle v-else cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          <div class="password-strength" :class="passwordStrengthClass">
            Password strength: {{ passwordStrength }}
          </div>
        </div>
        
        <div class="form-group">
          <label>Confirm Password</label>
          <div class="password-input">
            <input v-model="form.confirmPassword" 
                   :type="showConfirmPassword ? 'text' : 'password'" 
                   required
                   placeholder="Confirm new password">
            <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path v-if="showConfirmPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <circle v-if="showConfirmPassword" cx="12" cy="12" r="3"></circle>
                <path v-else d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle v-else cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>
        
        <button type="submit" class="btn-primary">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/employer/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Verification state
const showVerification = ref(false)
const verificationCode = ref(Array(6).fill(''))

// Password reset state
const form = ref({
  newPassword: '',
  confirmPassword: '',
  token: route.query.token
})

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  if (!form.value.newPassword) return 'None'
  if (form.value.newPassword.length < 6) return 'Weak'
  if (form.value.newPassword.length < 10) return 'Medium'
  if (/[A-Z]/.test(form.value.newPassword) && 
      /[0-9]/.test(form.value.newPassword) && 
      /[^A-Za-z0-9]/.test(form.value.newPassword)) {
    return 'Strong'
  }
  return 'Good'
})

const passwordStrengthClass = computed(() => {
  return {
    'strength-weak': passwordStrength.value === 'Weak',
    'strength-medium': passwordStrength.value === 'Medium',
    'strength-good': passwordStrength.value === 'Good',
    'strength-strong': passwordStrength.value === 'Strong'
  }
})

const handleReset = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert("Passwords don't match")
    return
  }
  
  try {
    await authStore.resetPassword(form.value)
    showVerification.value = true // Show verification after reset
  } catch (error) {
    alert(error.message)
  }
}

const verifyEmail = () => {
  const code = verificationCode.value.join('')
  if (code.length === 6) {
    router.push('/login')
  } else {
    alert('Please enter the full verification code')
  }
}

const resendCode = () => {
  alert('Verification code resent to your email')
  verificationCode.value = Array(6).fill('')
}

const focusNext = (event, index) => {
  if (event.target.value && index < 6) {
    document.querySelectorAll('.code-input')[index].focus()
  }
}

const focusPrev = (event, index) => {
  if (event.key === 'Backspace' && !event.target.value && index > 1) {
    document.querySelectorAll('.code-input')[index-2].focus()
  }
}


const handleForgotPassword = async () => {
  try {
    const result = await authStore.sendPasswordResetEmail(email.value)
    console.log('Reset token:', authStore.resetToken) // Should show the token
    console.log('Returned token:', result.token) // Should match
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.verification-card {
  text-align: center;
}

.verification-header {
  margin-bottom: 1.5rem;
}

.verification-icon {
  margin: 1rem 0;
}

.verification-text {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.verification-code {
  margin-bottom: 2rem;
}

.verification-code h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  font-weight: 500;
}

.code-inputs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.code-input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.2s;
}

.code-input:focus {
  border-color: #0A65CC;
  outline: none;
  box-shadow: 0 0 0 2px rgba(10, 101, 204, 0.1);
}

.resend-text {
  color: #666;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.resend-text a {
  color: #0A65CC;
  text-decoration: none;
  font-weight: 500;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.password-input input:focus {
  border-color: #0A65CC;
  outline: none;
  box-shadow: 0 0 0 2px rgba(10, 101, 204, 0.1);
}

.password-input input::placeholder {
  color: #aaa;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  background-color: #f0f0f0;
}

.password-strength {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.strength-weak {
  color: #d32f2f;
  background-color: #ffebee;
}

.strength-medium {
  color: #ff9800;
  background-color: #fff3e0;
}

.strength-good {
  color: #2196f3;
  background-color: #e3f2fd;
}

.strength-strong {
  color: #4caf50;
  background-color: #e8f5e9;
}

.btn-primary {
  width: 100%;
  padding: 0.875rem;
  background: #0A65CC;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background: #084b99;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
  
  .code-input {
    width: 35px;
    height: 45px;
  }
}
</style>