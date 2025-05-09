<template>
    <div class="job-card bg-white p-3 rounded shadow-sm d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 border">
      <img src="../assets/google-icon.svg" class="company-logo rounded" />
  
      <div class="flex-grow-1">
        <div class="d-flex">   
        <h5 class="mb-1 fw-bold text-dark px-3 ">{{ title }}
        </h5>
        <div class="badge bg-outline-primary text-primary border rounded-pill px-3 py-2">{{ type }}</div>
    </div>
        
        <p class="mb-1 text-muted small">{{ company }}</p>
        <div class="d-flex flex-wrap gap-2 align-items-center text-muted small">
          <i class="bi bi-geo-alt-fill"></i> <span>{{ location }}</span>
          <span class="mx-2">|</span>
          <i class="bi bi-currency-dollar"></i> <span>{{ salary }}</span>
          <span class="mx-2">|</span>
          <i class="bi bi-calendar"></i> <span>{{ time }}</span>
        </div>
      </div>
  
      <div class="text-end">
        <div class="mt-2 d-flex align-items-center gap-2">
          <i class="bi bi-bookmark fs-5 text-secondary"></i>
          <button class="btn btn-primary btn-md d-flex align-items-center gap-1">
            Apply Now <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    companyLogo: String,
    title: String,
    company: String,
    location: String,
    salary: String,
    type: String,
    time: String
  });
  </script>
  
  <style scoped>
  .job-card {
    border: 1px solid #e9ecef;
    transition: box-shadow 0.3s ease;
  }
  
  .job-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .company-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  
  .bg-outline-primary {
    background-color: transparent;
    border: 1px solid #0d6efd;
  }
  
  .btn-primary {
    background-color: #0d6efd;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .text-secondary {
    color: #6c757d;
  }
  </style>