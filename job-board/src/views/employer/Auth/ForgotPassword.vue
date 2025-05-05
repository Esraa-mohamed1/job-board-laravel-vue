<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Forgot Password</h2>
      <p class="subtitle">Enter your email to receive a reset link</p>
      
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label>Email Address</label>
          <input v-model="email" type="email" required placeholder="your@email.com">
        </div>
        
        <button type="submit" class="btn-primary" :disabled="authStore.loading">
          {{ authStore.loading ? 'Sending...' : 'Send Reset Link' }}
        </button>
        
        <p class="login-link">
          Remember your password? <router-link to="/login">Log in</router-link>
        </p>
      </form>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/employer/auth'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const successMessage = ref('')

const handleForgotPassword = async () => {
  try {
    successMessage.value = ''
    await authStore.sendPasswordResetEmail(email.value)
    
    // Show success message
    successMessage.value = `Reset link sent to ${email.value}. Please check your email.`
    
    // Optional: Redirect to verification page
    // router.push('/verify-reset?email=' + encodeURIComponent(email.value))
    
  } catch (error) {
    console.error('Password reset error:', error)
  }
}
</script>

<style scoped>
/* Use the same styles as your ResetPassword component */
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

h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
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

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: #0A65CC;
  outline: none;
  box-shadow: 0 0 0 2px rgba(10, 101, 204, 0.1);
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

.btn-primary:hover:not(:disabled) {
  background: #084b99;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.login-link a {
  color: #0A65CC;
  text-decoration: none;
  font-weight: 500;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 8px;
  text-align: center;
}

.error-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 8px;
  text-align: center;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>