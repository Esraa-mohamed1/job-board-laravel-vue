<template>
    <div class="dashboard-container bg-white">
      <navbar />
      <searchbar/>
  
      <div class="container-fluid px-0">
        <div class="row g-0">
       
            <div class="col-md-10 offset-md-1 p-4 bg-white">
        <RouterView />
        </div>

      </div>
      </div>
      
      <footer class="bg-light border-top py-2 mt-auto">
        <div class="container-fluid">
          <div class="d-flex justify-content-center align-items-center">
            <small class="text-muted fs-11">© 2024 MyJob - Job Portal. All Rights Reserved</small>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  
  import navbar from '../../components/shared/navbar.vue'
  import searchbar from '../../components/shared/searchbar.vue'
  
  </script>
  
  <style scoped>
  .enhanced-search-container {
    max-width: 500px;
    margin-left: 0;
  }
  
  .search-box-enhanced {
    width: 100%;
  }
  
  .search-box-enhanced .input-group {
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    border-radius: 6px;
    overflow: hidden;
  }
  
  .search-box-enhanced .input-group-text {
    border-radius: 6px 0 0 6px;
    padding: 0.5rem 0.75rem;
    border-color: #e9ecef;
  }
  
  .search-box-enhanced .form-control {
    border-color: #e9ecef;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
  
  .search-box-enhanced .form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
  }
  
  .sidebar-menu-item a {
    transition: all 0.2s ease;
  }
  
  .sidebar-menu-item a:hover {
    background-color: rgba(13, 110, 253, 0.05);
  }
  
  .sidebar-menu-item a.text-primary {
    font-weight: 500;
  }
  
  .dashed-border {
    border: 1px dashed #ddd !important;
    transition: all 0.3s ease;
  }
  
  .dashed-border:hover {
    border-color: #0d6efd !important;
  }
  
  .profile-upload .upload-preview {
    transition: all 0.3s ease;
  }
  
  .profile-upload .upload-preview:hover {
    border-color: #0d6efd;
    cursor: pointer;
  }
  
  .fs-11 {
    font-size: 11px;
  }
  
  .object-fit-cover {
    object-fit: cover;
  }
  
  .col-md-2-5 {
    flex: 0 0 auto;
    width: 20%; 
  }
  
  .col-md-9-5 {
    flex: 0 0 auto;
    width: 80%; 
  }
  
  .dashboard-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar {
    background-color: #ffffff;
    min-height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
  }
  
  .nav-link {
    color: #6c757d;
    border-radius: 0.25rem;
  }
  
  .nav-link:hover {
    background-color: rgba(13, 110, 253, 0.05);
  }
  
  .nav-link.active {
    color: #0d6efd;
    background-color: rgba(13, 110, 253, 0.05);
    font-weight: 500;
  }
  
  .card {
    border-radius: 0.375rem;
  }
  
  .nav-tabs .nav-link {
    color: #6c757d;
    border: none;
  }
  
  .nav-tabs .nav-link.active {
    color: #0d6efd;
    border-bottom: 2px solid #0d6efd;
    background-color: transparent;
  }
  
  .profile-upload .upload-preview:hover {
    border-color: #0d6efd;
    cursor: pointer;
  }
  
  .fs-11 {
    font-size: 11px;
  }
  
  .object-fit-cover {
    object-fit: cover;
  }
  
  .search-box {
    width: 100%;
    margin-top: 10px;
  }
  
  .search-input-group {
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    border-radius: 6px;
    overflow: hidden;
  }
  
  .search-input-group .input-group-text {
    border-radius: 6px 0 0 6px;
    padding: 0.5rem 0.75rem;
    border-color: #e9ecef;
  }
  
  .search-input-group .form-control {
    border-color: #e9ecef;
    font-size: 0.875rem;
  }
  
  .search-input-group .form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
  }
  
  .search-input-group .btn {
    border-radius: 0 6px 6px 0;
  }
  
  @media (max-width: 768px) {
    .col-md-2-5, .col-md-9-5 {
      width: 100%;
    }
    
    .sidebar {
      position: fixed;
      top: 56px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      overflow-y: auto;
    }
  }
  
  .dropdown-menu {
    min-width: 8rem;
    padding: 0.25rem 0;
    font-size: 0.875rem;
  }
  
  .dropdown-item {
    padding: 0.4rem 1rem;
  }
  
  .dropdown-item.text-danger:hover {
    background-color: rgba(220, 53, 69, 0.05);
  }
  
  .dropdown-divider {
    margin: 0.25rem 0;
  }
  </style>
  
  
  
  
  