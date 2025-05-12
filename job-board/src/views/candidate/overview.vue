<template>
    <div class="dashboard-container">
      <!-- Main Content -->
      <div class="container-fluid px-0">
        <div class="row g-0">
          <!-- Main Content -->
          <div class="col-md-9-5 p-4 bg-light">
            <!-- Welcome Section -->
            <div class="welcome-section mb-4">
              <h4 class="mb-3">Hello, Esther Howard</h4>
              <p class="text-muted">Here is your daily activities and job alerts</p>
            </div>
  
            <!-- Stats Cards -->
            <div class="row mb-4">
              <div class="col-md-4">
                <div class="card stat-card">
                  <div class="card-body">
                    <h5 class="card-title">589</h5>
                    <p class="card-text">Applied jobs</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card stat-card">
                  <div class="card-body">
                    <h5 class="card-title">238</h5>
                    <p class="card-text">Favorite jobs</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card stat-card">
                  <div class="card-body">
                    <h5 class="card-title">574</h5>
                    <p class="card-text">Job Alerts</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Profile Completion Alert -->
            <div class="alert alert-warning mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Your profile editing is not completed.</strong>
                  <p class="mb-0">Complete your profile editing & build your custom Resume</p>
                </div>
                <button class="btn btn-outline-primary">Edit Profile →</button>
              </div>
            </div>
  
            <!-- Recently Applied Jobs -->
            <div class="card mb-4">
              <div class="card-header bg-white border-bottom">
                <h5 class="mb-0">Recently Applied</h5>
              </div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Job</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(job, index) in appliedJobs" :key="index">
                        <td>
                          <div class="d-flex flex-column">
                            <strong>{{ job.title }}</strong>
                            <small class="text-muted">{{ job.location }}</small>
                            <small class="text-muted">{{ job.salary }}</small>
                          </div>
                        </td>
                        <td>{{ job.dateApplied }}</td>
                        <td><span class="badge bg-success">{{ job.status }}</span></td>
                        <td><button class="btn btn-sm btn-outline-primary">View Details</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const appliedJobs = ref([
    {
      title: 'Networking Engineer | Remote',
      location: 'Washington',
      salary: '$50k-80k/month',
      dateApplied: 'Feb 2, 2019 19:28',
      status: 'Active'
    },
    {
      title: 'Product Designer | Full Time',
      location: 'Dhaka',
      salary: '$50k-80k/month',
      dateApplied: 'Dec 7, 2019 23:26',
      status: 'Active'
    },
    {
      title: 'Junior Graphic Designer | Temporary',
      location: 'Brazil',
      salary: '$50k-80k/month',
      dateApplied: 'Feb 2, 2019 19:28',
      status: 'Active'
    },
    {
      title: 'Visual Designer | Contract Base',
      location: 'Wisconsin',
      salary: '$50k-80k/month',
      dateApplied: 'Dec 7, 2019 23:26',
      status: 'Active'
    }
  ]);
  
  // Update profile data to match Esther Howard
  const profileName = ref('Esther Howard');
  const fullName = ref('Esther Howard');
  const email = ref('esther.howard@example.com');
  </script>
  
  <style scoped>
  .dashboard-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .welcome-section h4 {
    font-weight: 600;
    color: #2c3e50;
  }
  
  .stat-card {
    border-radius: 8px;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
  }
  
  .stat-card .card-title {
    font-size: 2rem;
    font-weight: 700;
    color: #3498db;
    margin-bottom: 0.5rem;
  }
  
  .stat-card .card-text {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .alert-warning {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
  }
  
  .table th {
    font-weight: 600;
    color: #7f8c8d;
    font-size: 0.85rem;
    text-transform: uppercase;
    border-top: none;
  }
  
  .table td {
    vertical-align: middle;
  }
  
  .badge {
    padding: 0.35em 0.65em;
    font-weight: 500;
  }
  
  /* Custom column widths */
  .col-md-9-5 {
    flex: 0 0 auto;
    width: 80%;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .col-md-9-5 {
      width: 100%;
    }
    
    .stat-card {
      margin-bottom: 15px;
    }
  }
  </style>