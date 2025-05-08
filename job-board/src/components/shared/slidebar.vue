<template>
    <div class="col-md-2-5 sidebar py-3 border-end">
      <div class="d-flex align-items-center px-3 mb-3">
        <img src="@/assets/logo.svg" alt="MyJob Logo" width="18" class="me-2" />
        <span class="fw-bold text-primary small">MyJob</span>
        <span class="ms-auto badge bg-primary rounded-pill small py-1 px-2">Jobs</span>
      </div>
  
      <div class="sidebar-menu px-3">
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" exact-active-class="bg-light text-primary">
            <i class="fas fa-home me-2 text-muted"></i>
            <span class="small">{{ $t('sidebar.dashboard') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard/applications" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-briefcase me-2 text-muted"></i>
            <span class="small">{{ $t('sidebar.applications') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard/profile" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-user-circle me-2"></i>
            <span class="small">{{ $t('sidebar.profile') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard/alerts" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-bell me-2 text-muted"></i>
            <span class="small">{{ $t('sidebar.alerts') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard/saved" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-heart me-2 text-muted"></i>
            <span class="small">{{ $t('sidebar.saved') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/dashboard/resume" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-file-alt me-2 text-muted"></i>
            <span class="small">{{ $t('sidebar.resume') }}</span>
          </RouterLink>
        </div>
      </div>
  
      <!-- Logout Button -->
      <div class="mt-auto px-3 pt-5">
        <button class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2" @click="logout">
          <i class="fas fa-sign-out-alt me-2"></i> {{ $t('sidebar.logout') }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  function logout() {

    localStorage.removeItem('token')
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .sidebar-menu-item a:hover {
    background-color: #f0f0f0;
    color: #0d6efd !important;
  }
  </style>
  
