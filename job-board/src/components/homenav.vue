<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-3 sticky-top">
    <div class="container">
      <router-link class="navbar-brand me-4 fw-bold fs-4" to="/">
        <i class="fas fa-briefcase me-2 text-primary fs-3"></i> 
        <span class="brand-text">MyJob</span>
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
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" exact>
              <span class="nav-link-content">Home</span>
              <span class="nav-link-hover"></span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/browsejobs" class="nav-link" active-class="active">
              <span class="nav-link-content">Jobs</span>
              <span class="nav-link-hover"></span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">
              <span class="nav-link-content">Dashboard</span>
              <span class="nav-link-hover"></span>
            </router-link>
          </li>
        </ul>
        
        <div class="d-flex auth-buttons">
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="btn btn-outline-primary me-2 login-btn">
              <span>Login</span>
              <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
            <router-link to="/register" class="btn btn-primary register-btn">
              <span>Register</span>
              <i class="fas fa-user-plus ms-2"></i>
            </router-link>
          </template>
          <template v-else>
            <button class="btn btn-danger logout-btn" @click="logout">
              <span>Logout</span>
              <i class="fas fa-sign-out-alt ms-2"></i>
            </button>
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
/* Base Navbar Styles */
.navbar {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar-brand {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.brand-text {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: translateY(-2px);
}

.navbar-brand:hover .brand-text {
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
}

/* Nav Links with Advanced Hover Effects */
.nav-link {
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: #0538c5;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  transition: all 0.3s ease;
  border-radius: 6px;
  overflow: hidden;
  z-index: 1;
}

.nav-link-content {
  position: relative;
  z-index: 2;
}

.nav-link-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 1;
  border-radius: 4px;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-link:hover .nav-link-hover {
  transform: scaleX(1);
  transform-origin: left;
}

/* Active Link Styles */
.nav-link.active {
  color: #ffffff !important;
  background-color: #004fce;
  font-weight: 600;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  border-radius: 3px;
  animation: underlineGrow 0.3s ease-out forwards;
}

@keyframes underlineGrow {
  from { width: 0; opacity: 0; }
  to { width: 60%; opacity: 1; }
}

/* Auth Buttons Styles */
.auth-buttons {
  gap: 0.75rem;
}

.btn {
  position: relative;
  overflow: hidden;
  border: none;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn span {
  position: relative;
  z-index: 2;
}

.btn i {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  z-index: 1;
  transition: all 0.3s ease;
}

.btn:hover::before {
  transform: scale(1.05);
  opacity: 0.9;
}

.btn:hover i {
  transform: translateX(3px);
}

.btn-outline-primary {
  background: transparent;
  border: 2px solid #3b82f6;
  color: #3b82f6;
}

.btn-outline-primary:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.btn-primary {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 6px 8px rgba(37, 99, 235, 0.3);
  transform: translateY(-2px);
}

.btn-danger {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
}

.btn-danger:hover {
  background: linear-gradient(90deg, #dc2626 0%, #b91c1c 100%);
  box-shadow: 0 6px 8px rgba(220, 38, 38, 0.3);
  transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 1rem;
    background: white;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
  }
  
  .nav-link {
    padding: 0.75rem 1.25rem;
    margin: 0.25rem 0;
  }
  
  .nav-link.active::before {
    bottom: 0;
    left: 0;
    transform: none;
    width: 3px;
    height: 100%;
    animation: underlineGrowVertical 0.3s ease-out forwards;
  }
  
  @keyframes underlineGrowVertical {
    from { height: 0; opacity: 0; }
    to { height: 100%; opacity: 1; }
  }
  
  .auth-buttons {
    margin-top: 1rem;
    justify-content: center;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media (min-width: 992px) {
  .nav-link {
    text-align: left;
  }
}
</style>