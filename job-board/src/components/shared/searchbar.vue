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
        <img src="../../assets/candidate2.jpg" alt="User" 
             class="rounded-circle" width="50" height="50">
      </div>
    </div>
  </div>
</header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
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