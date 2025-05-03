<template>
    <div class="employer-layout">
      <nav class="navbar navbar-expand-lg navbar-dark bg-light ">
        <div class="container">
        <span class="navbar-brand text-dark fw-bold fs-4">
          <i class="fas fa-briefcase me-2 text-primary fs-3"></i>MyJob
        </span>
        <div class="d-flex align-items-center ">
          <span class=" me-3 text-dark fw-bold fs-6">Welcome, Employer</span>
          <button class="btn btn-outline-primary">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </nav>
      <div class="container-fluid ">
          <div class="p-4 ">
            <router-view />
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isSidebarOpen = ref(true)
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  </script>
  
  <style scoped>
  .employer-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar {
    background-color: #343a40;
    transition: all 0.3s;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .nav-link.active {
    background-color: #0d6efd;
  }
  
  .navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 56px; /* Height of navbar */
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      overflow-y: auto;
    }
    
    .col-md-9 {
      margin-top: 56px;
    }
  }
  </style>