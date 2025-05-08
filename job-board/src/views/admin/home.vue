<template>
  <div class="admin-dashboard">
    <div class="row g-0">
     
      <div class="col-md-3 col-lg-2 sidebar">
        <div class="p-3 text-center border-bottom">
          <h5 class="fw-bold">ADMIN DASHBOARD</h5>
        </div>
        <ul class="nav flex-column mt-2">
          <li class="nav-item">
            <a href="#" class="nav-link active">
              <i class="fas fa-tachometer-alt me-2"></i> Overview
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-clipboard-list me-2"></i> Pending Jobs
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-check-circle me-2"></i> Approved Jobs
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-times-circle me-2"></i> Rejected Jobs
            </a>
          </li>
        
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-cog me-2"></i> Settings
            </a>
          </li>
        </ul>
        <div class="mt-auto p-3 border-top log-out-section">
          <a href="#" class="nav-link text-secondary">
            <i class="fas fa-sign-out-alt me-2"></i> Log-out
          </a>
        </div>
      </div>

      
      <div class="col-md-9 col-lg-10 ms-auto main-content">
        <div class="container-fluid py-4">
          <h3 class="mb-3">Hello, Admin User</h3>
          <p class="text-secondary mb-4">Here is your job moderation dashboard</p>

          
          <div class="row mb-4">
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ pendingCount }}</h2>
                    <div class="text-secondary">Pending Jobs</div>
                  </div>
                  <div class="stat-icon pending-icon">
                    <i class="fas fa-hourglass-half"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ approvedCount }}</h2>
                    <div class="text-secondary">Approved Jobs</div>
                  </div>
                  <div class="stat-icon approved-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 class="mb-0">{{ rejectedCount }}</h2>
                    <div class="text-secondary">Rejected Jobs</div>
                  </div>
                  <div class="stat-icon rejected-icon">
                    <i class="fas fa-times-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div class="card mb-4">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Jobs Pending Review</h5>
              <div class="view-all">
                <a href="#" class="text-primary">View all <i class="fas fa-arrow-right ms-1"></i></a>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Date Posted</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="job in pendingJobs" :key="job.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="company-logo me-3" :style="{ backgroundColor: job.logoBackground }">
                            <img :src="job.logo" alt="Company Logo" v-if="job.logo">
                            <span v-else>{{ job.companyInitial }}</span>
                          </div>
                          <div>{{ job.title }}</div>
                        </div>
                      </td>
                      <td>{{ job.company }}</td>
                      <td>
                        <i class="fas fa-map-marker-alt me-1 text-secondary"></i>
                        {{ job.location }}
                      </td>
                      <td>
                        <i class="fas fa-dollar-sign me-1 text-secondary"></i>
                        {{ job.salary }}
                      </td>
                      <td>{{ job.datePosted }}</td>
                      <td>
                        <span class="badge bg-warning">Pending</span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <button class="btn btn-sm btn-outline-secondary" @click="viewJobDetails(job.id)">
                            View
                          </button>
                          <button class="btn btn-sm btn-success" @click="approveJob(job.id)">
                            <i class="fas fa-check"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="rejectJob(job.id)">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
          <div class="card">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Recently Approved Jobs</h5>
              <div class="view-all">
                <a href="#" class="text-primary">View all <i class="fas fa-arrow-right ms-1"></i></a>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Date Approved</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="job in approvedJobs" :key="job.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="company-logo me-3" :style="{ backgroundColor: job.logoBackground }">
                            <img :src="job.logo" alt="Company Logo" v-if="job.logo">
                            <span v-else>{{ job.companyInitial }}</span>
                          </div>
                          <div>{{ job.title }}</div>
                        </div>
                      </td>
                      <td>{{ job.company }}</td>
                      <td>
                        <i class="fas fa-map-marker-alt me-1 text-secondary"></i>
                        {{ job.location }}
                      </td>
                      <td>
                        <i class="fas fa-dollar-sign me-1 text-secondary"></i>
                        {{ job.salary }}
                      </td>
                      <td>{{ job.dateApproved }}</td>
                      <td>
                        <span class="badge bg-success">Approved</span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline-secondary" @click="viewJobDetails(job.id)">
                          View Details
                        </button>
                      </td>
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
<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      pendingCount: 42,
      approvedCount: 235,
      rejectedCount: 18,
      pendingJobs: [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          companyInitial: 'T',
          logoBackground: '#3498db',
          location: 'San Francisco',
          salary: '$120-150k/year',
          datePosted: 'Feb 3, 2025 15:45'
        },
        {
          id: 2,
          title: 'UX Designer',
          company: 'Design Studio',
          companyInitial: 'D',
          logoBackground: '#e74c3c',
          location: 'Remote',
          salary: '$80-100k/year',
          datePosted: 'Feb 3, 2025 12:30'
        },
        {
          id: 3,
          title: 'DevOps Engineer',
          company: 'Cloud Systems',
          companyInitial: 'C',
          logoBackground: '#2ecc71',
          location: 'Seattle',
          salary: '$110-130k/year',
          datePosted: 'Feb 2, 2025 09:15'
        },
        {
          id: 4,
          title: 'Marketing Specialist',
          company: 'Growth Hackers',
          companyInitial: 'G',
          logoBackground: '#f39c12',
          location: 'New York',
          salary: '$70-90k/year',
          datePosted: 'Feb 1, 2025 14:20'
        }
      ],
      approvedJobs: [
        {
          id: 101,
          title: 'Backend Developer',
          company: 'ServerTech',
          companyInitial: 'S',
          logoBackground: '#9b59b6',
          location: 'Chicago',
          salary: '$100-120k/year',
          dateApproved: 'Feb 2, 2025 16:30'
        },
        {
          id: 102,
          title: 'Data Scientist',
          company: 'DataMind',
          companyInitial: 'D',
          logoBackground: '#1abc9c',
          location: 'Boston',
          salary: '$130-150k/year',
          dateApproved: 'Feb 2, 2025 14:45'
        },
        {
          id: 103,
          title: 'Product Manager',
          company: 'ProductLabs',
          companyInitial: 'P',
          logoBackground: '#f1c40f',
          location: 'Austin',
          salary: '$110-140k/year',
          dateApproved: 'Feb 1, 2025 17:20'
        }
      ]
    }
  },
  methods: {
    viewJobDetails(jobId) {
      console.log('Viewing job details for job ID:', jobId);
      
    },
    approveJob(jobId) {
      console.log('Approving job ID:', jobId);
     
      const jobIndex = this.pendingJobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        const approvedJob = {...this.pendingJobs[jobIndex]};
        approvedJob.dateApproved = new Date().toLocaleString();
        this.pendingJobs.splice(jobIndex, 1);
        this.approvedJobs.unshift(approvedJob);
        this.pendingCount--;
        this.approvedCount++;
      }
    },
    rejectJob(jobId) {
      console.log('Rejecting job ID:', jobId);
      
      const jobIndex = this.pendingJobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        this.pendingJobs.splice(jobIndex, 1);
        this.pendingCount--;
        this.rejectedCount++;
      }
    }
  }
}
</script>
<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  background-color: white;
  height: 100vh;
  position: fixed;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.nav-link {
  padding: 12px 16px;
  color: #555;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #3498db;
  border-left-color: #3498db;
}

.nav-link.active {
  background-color: #e6f2ff;
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 500;
}

.main-content {
  padding-left: 0;
  padding-right: 0;
}

.stat-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.pending-icon {
  background-color: #fff5e6;
  color: #f39c12;
}

.approved-icon {
  background-color: #e6ffee;
  color: #2ecc71;
}

.rejected-icon {
  background-color: #ffe6e6;
  color: #e74c3c;
}

.company-logo {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.table th {
  font-weight: 500;
  color: #555;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-weight: 500;
  padding: 6px 10px;
}

.card-header {
  border-bottom: 1px solid #f0f0f0;
}

.log-out-section {
  margin-top: auto;
}
</style>



