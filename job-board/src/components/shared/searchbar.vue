<template>
<header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div class="container">
    <div class="d-flex w-100 align-items-center">

      <router-link class="navbar-brand me-4 text-dark fw-bold fs-4" to="/">
        <i class="fas fa-briefcase me-2 text-primary fs-3"></i> MyJob
      </router-link>

      <div class="d-flex flex-grow-1 mx-4" style="max-width: 500px;">
        <div class="dropdown me-2">
          <button class="btn btn-outline-secondary dropdown-toggle py-2" type="button" 
                  id="countryDropdown" data-bs-toggle="dropdown">
            Egypt
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">USA</a></li>
            <li><a class="dropdown-item" href="#">UK</a></li>
          </ul>
        </div>
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0">
            <i class="fas fa-search text-primary"></i>
          </span>
          <input type="text" class="form-control border-start-0" 
                 placeholder="Search for jobs" aria-label="Search">
        </div>
      </div>

      <div class="d-flex align-items-center ms-auto">
        <button class="btn btn-light position-relative me-3">
          <i class="fas fa-bell text-primary fs-4"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            1
          </span>
        </button>   
        
        <div class="dropdown">
          <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="../../assets/candidate2.jpg" alt="User" 
                 class="rounded-circle" width="50" height="50">
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link class="dropdown-item" to="candidate/dashboard/profile">
                <i class="fas fa-user me-2"></i> My Profile
              </router-link>
            </li>
            
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                <i class="fas fa-sign-out-alt me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>
  </template>
  <script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken')
    
    await axios.post('/api/logout', null, {
      baseURL: 'http://127.0.0.1:8000',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    clearAuthData()
    
    await router.push('/login')
    
  } catch (error) {
    console.error('Logout error:', error)
    clearAuthData()
    await router.push('/login')
  }
}

const clearAuthData = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
   localStorage.removeItem('userRole')

  
  delete axios.defaults.headers.common['Authorization']
}
</script>
  
  
  <style scoped>
  .logout-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-btn:hover {
  text-decoration: underline;
}
  .dropdown-toggle {
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.dropdown-toggle::after {
  display: none; /* Hide default dropdown arrow */
}

.dropdown-menu {
  margin-top: 10px;
  border: none;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  min-width: 200px;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item i {
  width: 20px;
  text-align: center;
}
  header {
    border-bottom: 1px solid #e9ecef;
  }
  
  .input-group-text {
    padding: 0.5rem 1rem;
  }
  
  .form-control {
    padding: 0.5rem;
  }
  
  img {
    object-fit: cover;
  }
  </style>