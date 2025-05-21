<template>
  <nav class="navbar navbar-expand-lg navbar-darkar py-3">
    <div class="container ">
      <router-link class="navbar-brand me-4 text-dark fw-bold fs-4" to="/">
        <i class="fas fa-briefcase me-2 text-primary fs-3"></i> MyJob
      </router-link>
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: navbarOpen }">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-dark">
          <li class="nav-item text-dark">
            <router-link to="/" class="nav-link" active-class="active" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/browsejobs" class="nav-link" active-class="active">Jobs</router-link>
          </li>
        
        
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">Dashboard</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
            <router-link to="/register" class="btn btn-primary">Register</router-link>
          </template>
          <template v-else>
            <button class="btn btn-danger" @click="logout">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/employer/auth';

const router = useRouter();
const authStore = useAuthStore();

const navbarOpen = ref(false);
const isAuthenticated = computed(() => !!localStorage.getItem('authToken'));

const toggleNavbar = () => {
  navbarOpen.value = !navbarOpen.value;
};

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');

    await axios.post('/api/logout', null, {
      baseURL: 'http://127.0.0.1:8000',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    clearAuthData();
    await router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
    clearAuthData();
    await router.push('/login');
  }
};

const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('userRole');
  delete axios.defaults.headers.common['Authorization'];
};
</script>

<style scoped>

</style>