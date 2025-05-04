<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Reset Password</h2>
      <p class="subtitle">Enter your new password below</p>
      
      <form @submit.prevent="handleReset">
        <div class="form-group">
          <label>New Password</label>
          <input v-model="form.newPassword" type="password" required>
        </div>
        
        <div class="form-group">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" required>
        </div>
        
        <button type="submit" class="btn-primary">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/employer/auth'


const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  newPassword: '',
  confirmPassword: '',
  token: route.query.token
})

const handleReset = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert("Passwords don't match")
    return
  }
  
  try {
    await authStore.resetPassword(form.value)
    router.push('/login')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
/* Same styles as Register.vue */
</style>