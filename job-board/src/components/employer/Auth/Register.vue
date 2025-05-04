<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Create account</h1>
      <p class="login-prompt">Already have account? <router-link to="/login">Log In</router-link></p>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="form.fullName" type="text" placeholder="Enter your full name" required>
        </div>
        
        <div class="form-group">
          <label>Email address</label>
          <input v-model="form.email" type="email" placeholder="Enter your email" required>
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="Create password" required>
        </div>
        
        <div class="form-group">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Confirm password" required>
        </div>

        <div class="form-group">
          <label>Register as</label>
          <select v-model="form.role" class="role-select" required>
            <option value="" disabled selected>Select your role</option>
            <option value="user">User</option>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        
        <div class="terms-agreement">
          <input type="checkbox" id="terms" v-model="form.agreeTerms" required>
          <label for="terms">I've read and agree with your Terms of Services</label>
        </div>
        
        <button type="submit" class="btn-register">Create Account</button>
        
        <div class="divider">or</div>
        
        <button type="button" class="btn-google" @click="signInWithGoogle">
          <img src="@/assets/google-icon.svg" alt="Google">
          Sign up with Google
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/employer/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  agreeTerms: false
})

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords don't match")
    return
  }
  
  if (!form.value.agreeTerms) {
    alert("You must agree to the Terms of Services")
    return
  }

  if (!form.value.role) {
    alert("Please select your role")
    return
  }
  
  try {
    await authStore.register(form.value)
    // Redirect based on role
    if (form.value.role === 'employer') {
      router.push('/employer/setup')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error.message)
  }
}

const signInWithGoogle = () => {
  // Implement Google OAuth logic here
  console.log("Signing up with Google")
  // authStore.signInWithGoogle()
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
}

.register-card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
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

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.role-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0A65CC;
  outline: none;
}

.terms-agreement {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.terms-agreement input {
  margin-right: 0.75rem;
}

.terms-agreement label {
  font-size: 0.9rem;
  color: #666;
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

.btn-register:hover {
  background: #084b99;
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

.btn-google:hover {
  border-color: #ccc;
  background: #f9f9f9;
}

.btn-google img {
  width: 18px;
  height: 18px;
}
</style>