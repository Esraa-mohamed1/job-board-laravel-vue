<template>
    <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand me-4 text-dark fw-bold fs-4 d-flex align-items-center" to="/">
          <i class="fas fa-briefcase me-2 text-primary fs-3"></i> MyJob
        </router-link>
  
        <div class="input-group">
            <div class="dropdown me-3">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="countryDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Egypt
            </button>
            <ul class="dropdown-menu" aria-labelledby="countryDropdown">
              <li><a class="dropdown-item" href="#">USA</a></li>
              <li><a class="dropdown-item" href="#">UK</a></li>
            </ul>
          </div>
        <span class="input-group-text bg-light text-dark border-0">
        <i class="fas fa-search text-primary"></i>
        </span>
        <input
        type="text"
        class="form-control"
        placeholder="Search for jobs"
        aria-label="Search"
            />
            </div>
            
          <div class="d-flex align-items-center ms-auto">
          <button class="btn btn-light position-relative me-3">
            <i class="fas fa-bell text-primary fs-4"></i>
            <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
            1
            <span class="visually-hidden">unread notifications</span>
            </span>
            </button>

           <img
            src="../../assets/candidate2.jpg"
            alt="User"
            class="rounded-circle"
            width="50"
            height="50"
            />
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