<template>
    <div class="col-md-2-5 sidebar py-3 border-end bg-light">
      <div class="d-flex align-items-center px-3 mb-3">
        <img src="@/assets/logo.svg" alt="MyJob Logo" width="18" class="me-2" />
        <span class="fw-bold text-primary small">MyJob</span>
        <span class="ms-auto badge bg-primary rounded-pill small py-1 px-2">Jobs</span>
      </div>
  
      <div class="sidebar-menu px-3">
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/candidate/dashboard/overview" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-briefcase me-2 text"></i>
            <span class="small">{{ $t('Overview') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/candidate/dashboard/applications" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-briefcase me-2 text"></i>
            <span class="small">{{ $t('sidebar.applications') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/candidate/dashboard/profile" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-user-circle me-2"></i>
            <span class="small">{{ $t('sidebar.settings') }}</span>
          </RouterLink>
        </div>
        <div class="sidebar-menu-item mb-2">
          <RouterLink to="/candidate/dashboard/alerts" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded" active-class="bg-light text-primary">
            <i class="fas fa-bell me-2 text"></i>
            <span class="small">{{ $t('sidebar.alerts') }}</span>
          </RouterLink>
        </div>
     
      
      </div>
  
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .sidebar-menu-item a:hover {
    background-color: #ffffff;
    color: #0d6efd !important;
  }
  </style>
  
