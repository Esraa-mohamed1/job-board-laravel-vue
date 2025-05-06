```vue
<template>
  <div class="dashboard-container">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom py-2">
      <div class="container-fluid px-4">
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleSidebar"
          aria-label="Toggle navigation"
          aria-controls="sidebar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex align-items-center">
          <a class="navbar-brand me-4" href="#">
            <img src="@/assets/logo.svg" alt="MyJob Logo" width="20" class="d-inline-block align-text-top" />
            <span class="fw-bold text-primary ms-1 fs-6">MyJob</span>
          </a>
          <div class="navbar-nav me-auto d-flex flex-row gap-3">
            <a class="nav-link small px-2" href="#">Home</a>
            <a class="nav-link small px-2" href="#">Post Job</a>
            <a class="nav-link small px-2" href="#">Find Candidates</a>
            <a class="nav-link small px-2 active" href="#">Dashboard</a>
            <a class="nav-link small px-2" href="#">Company Profile</a>
            <a class="nav-link small px-2" href="#">Employer Support</a>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-3 small"><i class="fas fa-phone-alt me-1"></i> +1 202-555-0156</span>
          <div class="dropdown">
            <button
              class="btn btn-sm dropdown-toggle d-flex align-items-center py-1"
              type="button"
              id="languageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img src="https://flagcdn.com/w20/us.png" width="16" alt="English" class="me-1" />
              <span class="small">English</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li><a class="dropdown-item small" href="#" @click="changeLanguage('en')">English</a></li>
              <li><a class="dropdown-item small" href="#" @click="changeLanguage('es')">Spanish</a></li>
              <li><a class="dropdown-item small" href="#" @click="changeLanguage('fr')">French</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="container-fluid px-0">
      <div class="row g-0">
        <!-- Sidebar -->
        <div class="col-md-3 sidebar py-3 border-end" :class="{ active: sidebarActive }">
          <div class="d-flex align-items-center px-3 mb-3">
            <img src="@/assets/logo.svg" alt="MyJob Logo" width="18" class="me-2" />
            <span class="fw-bold text-primary small">MyJob</span>
            <span class="ms-auto badge bg-primary rounded-pill small py-1 px-2">Employer</span>
          </div>
          
          <div class="sidebar-menu px-3">
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-home me-2 text-muted"></i>
                <span class="small">Dashboard</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-primary py-2 px-2 rounded bg-light">
                <i class="fas fa-file-alt me-2"></i>
                <span class="small">Applications</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-briefcase me-2 text-muted"></i>
                <span class="small">Posted Jobs</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-building me-2 text-muted"></i>
                <span class="small">Company Profile</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-users me-2 text-muted"></i>
                <span class="small">Candidates</span>
              </a>
            </div>
            <div class="sidebar-menu-item mb-2">
              <a href="#" class="d-flex align-items-center text-decoration-none text-dark py-2 px-2 rounded">
                <i class="fas fa-chart-line me-2 text-muted"></i>
                <span class="small">Analytics</span>
              </a>
            </div>
          </div>
          
          <!-- Logout Button -->
          <div class="mt-auto px-3 pt-5">
            <button class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2" @click="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9 p-4 bg-light">
          <!-- Applications Header with Stats -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 class="mb-0">Candidate Applications</h6>
              <small class="text-muted">Manage all job applications from candidates</small>
            </div>
            <div class="d-flex">
              <div class="me-3 text-center">
                <h6 class="mb-0 text-success">{{ stats.approved }}</h6>
                <small class="text-muted">Approved</small>
              </div>
              <div class="me-3 text-center">
                <h6 class="mb-0 text-warning">{{ stats.pending }}</h6>
                <small class="text-muted">Pending</small>
              </div>
              <div class="text-center">
                <h6 class="mb-0 text-danger">{{ stats.rejected }}</h6>
                <small class="text-muted">Rejected</small>
              </div>
            </div>
          </div>
          
          <!-- Filter and Search Bar -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body p-3">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small">Job Title</label>
                  <select class="form-select form-select-sm" v-model="filters.jobTitle">
                    <option value="">All Jobs</option>
                    <option v-for="job in jobTitles" :value="job.id" :key="job.id">{{ job.title }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small">Status</label>
                  <select class="form-select form-select-sm" v-model="filters.status">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small">Date Applied</label>
                  <select class="form-select form-select-sm" v-model="filters.dateRange">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small">Search</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Candidate name..."
                      v-model="searchInput"
                      @input="updateSearch"
                    />
                    <button class="btn btn-primary btn-sm" @click="applyFilters">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Applications List -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body p-0">
              <div class="table-responsive">
                <table
                  class="table table-hover mb-0"
                  role="grid"
                  aria-describedby="applicationsTableDesc"
                >
                  <caption id="applicationsTableDesc" class="visually-hidden">
                    List of candidate applications
                  </caption>
                  <thead class="bg-light">
                    <tr>
                      <th class="small text-muted fw-normal py-3 px-4">Candidate</th>
                      <th class="small text-muted fw-normal py-3">Job Title</th>
                      <th class="small text-muted fw-normal py-3">Applied On</th>
                      <th class="small text-muted fw-normal py-3">Status</th>
                      <th class="small text-muted fw-normal py-3 text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="application in filteredApplications" :key="application.id">
                      <td class="py-3 px-4">
                        <div class="d-flex align-items-center">
                          <img
                            :src="
                              application.candidate.photo ||
                              `${defaultAvatarUrl}?name=${application.candidate.name}`
                            "
                            alt="Candidate"
                            class="rounded-circle me-3"
                            width="36"
                            height="36"
                          />
                          <div>
                            <h6 class="mb-0 small">{{ application.candidate.name }}</h6>
                            <small class="text-muted">{{ application.candidate.email }}</small>
                          </div>
                        </div>
                      </td>
                      <td class="py-3">
                        <span class="small">{{ application.job.title }}</span>
                      </td>
                      <td class="py-3">
                        <span class="small">{{ formatDate(application.appliedOn) }}</span>
                      </td>
                      <td class="py-3">
                        <span
                          :class="{
                            'badge bg-warning bg-opacity-10 text-warning': application.status === 'pending',
                            'badge bg-success bg-opacity-10 text-success': application.status === 'approved',
                            'badge bg-danger bg-opacity-10 text-danger': application.status === 'rejected',
                          }"
                          class="small"
                        >
                          {{ application.status }}
                        </span>
                      </td>
                      <td class="py-3 text-end pe-4">
                        <div class="dropdown d-inline-block">
                          <button
                            class="btn btn-sm p-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <i class="fas fa-ellipsis-v text-muted"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                              <a
                                class="dropdown-item small"
                                href="#"
                                @click.prevent="viewApplication(application)"
                              >
                                <i class="fas fa-eye me-2"></i> View
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item small"
                                href="#"
                                @click.prevent="approveApplication(application.id)"
                              >
                                <i class="fas fa-check-circle me-2 text-success"></i> Approve
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item small"
                                href="#"
                                @click.prevent="rejectApplication(application.id)"
                              >
                                <i class="fas fa-times-circle me-2 text-danger"></i> Reject
                              </a>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                              <a
                                class="dropdown-item small text-danger"
                                href="#"
                                @click.prevent="deleteApplication(application.id)"
                              >
                                <i class="fas fa-trash-alt me-2"></i> Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredApplications.length === 0">
                      <td colspan="5" class="text-center py-4 text-muted">
                        No applications found matching your criteria
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm justify-content-end">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Application Detail Modal -->
    <div class="modal fade" id="applicationModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Application Details</h6>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedApplication">
              <div class="row mb-4">
                <div class="col-md-2">
                  <img
                    :src="
                      selectedApplication.candidate.photo ||
                      `${defaultAvatarUrl}?name=${selectedApplication.candidate.name}`
                    "
                    alt="Candidate"
                    class="rounded-circle w-100"
                  />
                </div>
                <div class="col-md-10">
                  <h5>{{ selectedApplication.candidate.name }}</h5>
                  <p class="text-muted mb-1">{{ selectedApplication.candidate.email }}</p>
                  <p class="text-muted">{{ selectedApplication.candidate.phone }}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-6">
                  <div class="card border-0 shadow-sm mb-3">
                    <div class="card-body">
                      <h6 class="card-title mb-3">Job Information</h6>
                      <div class="mb-2">
                        <small class="text-muted d-block">Job Title</small>
                        <span>{{ selectedApplication.job.title }}</span>
                      </div>
                      <div class="mb-2">
                        <small class="text-muted d-block">Department</small>
                        <span>{{ selectedApplication.job.department }}</span>
                      </div>
                      <div class="mb-2">
                        <small class="text-muted d-block">Location</small>
                        <span>{{ selectedApplication.job.location }}</span>
                      </div>
                      <div>
                        <small class="text-muted d-block">Salary</small>
                        <span>{{ selectedApplication.job.salary }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="card border-0 shadow-sm mb-3">
                    <div class="card-body">
                      <h6 class="card-title mb-3">Application Details</h6>
                      <div class="mb-2">
                        <small class="text-muted d-block">Applied On</small>
                        <span>{{ formatDate(selectedApplication.appliedOn) }}</span>
                      </div>
                      <div class="mb-2">
                        <small class="text-muted d-block">Status</small>
                        <span
                          :class="{
                            'badge bg-warning bg-opacity-10 text-warning':
                              selectedApplication.status === 'pending',
                            'badge bg-success bg-opacity-10 text-success':
                              selectedApplication.status === 'approved',
                            'badge bg-danger bg-opacity-10 text-danger':
                              selectedApplication.status === 'rejected',
                          }"
                        >
                          {{ selectedApplication.status }}
                        </span>
                      </div>
                      <div class="mb-2">
                        <small class="text-muted d-block">Cover Letter</small>
                        <a href="#" @click.prevent="viewCoverLetter = true">View Cover Letter</a>
                      </div>
                      <div>
                        <small class="text-muted d-block">Resume</small>
                        <a href="#" @click.prevent="downloadResume(selectedApplication.resume)"
                          >Download Resume</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Cover Letter Modal -->
              <div
                class="modal fade"
                id="coverLetterModal"
                tabindex="-1"
                aria-hidden="true"
                v-if="viewCoverLetter"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h6 class="modal-title">Cover Letter</h6>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="viewCoverLetter = false"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>{{ selectedApplication.coverLetter }}</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-sm btn-secondary"
                        data-bs-dismiss="modal"
                        @click="viewCoverLetter = false"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="approveApplication(selectedApplication.id)"
              v-if="selectedApplication && selectedApplication.status !== 'approved'"
            >
              Approve
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger ms-2"
              @click="rejectApplication(selectedApplication.id)"
              v-if="selectedApplication && selectedApplication.status !== 'rejected'"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Modal } from 'bootstrap';
import { debounce } from 'lodash';
import { useAuthStore } from '@/stores/employer/auth';

// State
const authStore = useAuthStore();
const isLoading = ref(false);
const sidebarActive = ref(false);
const applications = ref([]);
const jobTitles = ref([]);
const searchInput = ref('');
const filters = ref({
  jobTitle: '',
  status: '',
  dateRange: '',
  search: '',
});
const currentPage = ref(1);
const itemsPerPage = 5;
const selectedApplication = ref(null);
const viewCoverLetter = ref(false);
let applicationModal = null;

// Constants
const defaultAvatarUrl = import.meta.env.VITE_DEFAULT_AVATAR_URL || 'https://ui-avatars.com/api/';

// Computed Properties
const stats = computed(() => ({
  approved: applications.value.filter((app) => app.status === 'approved').length,
  pending: applications.value.filter((app) => app.status === 'pending').length,
  rejected: applications.value.filter((app) => app.status === 'rejected').length,
}));

const filteredApplications = computed(() => {
  let filtered = [...applications.value];

  if (filters.value.jobTitle) {
    filtered = filtered.filter((app) => app.job.id === filters.value.jobTitle);
  }

  if (filters.value.status) {
    filtered = filtered.filter((app) => app.status === filters.value.status);
  }

  if (filters.value.dateRange) {
    const today = new Date();
    filtered = filtered.filter((app) => {
      const appDate = new Date(app.appliedOn);
      switch (filters.value.dateRange) {
        case 'today':
          return appDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return appDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return appDate >= monthAgo;
        default:
          return true;
      }
    });
  }

  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (app) =>
        app.candidate.name.toLowerCase().includes(searchTerm) ||
        app.candidate.email.toLowerCase().includes(searchTerm)
    );
  }

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  let filtered = [...applications.value];
  if (filters.value.jobTitle) {
    filtered = filtered.filter((app) => app.job.id === filters.value.jobTitle);
  }
  if (filters.value.status) {
    filtered = filtered.filter((app) => app.status === filters.value.status);
  }
  if (filters.value.dateRange) {
    const today = new Date();
    filtered = filtered.filter((app) => {
      const appDate = new Date(app.appliedOn);
      switch (filters.value.dateRange) {
        case 'today':
          return appDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return appDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return appDate >= monthAgo;
        default:
          return true;
      }
    });
  }
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (app) =>
        app.candidate.name.toLowerCase().includes(searchTerm) ||
        app.candidate.email.toLowerCase().includes(searchTerm)
    );
  }
  return Math.ceil(filtered.length / itemsPerPage);
});

// Methods
const toggleSidebar = () => {
  sidebarActive.value = !sidebarActive.value;
};

const fetchApplications = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('/api/applications', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch applications');
    applications.value = await response.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    alert('Failed to load applications. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const fetchJobTitles = async () => {
  try {
    const response = await fetch('/api/jobs', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch job titles');
    jobTitles.value = await response.json();
  } catch (error) {
    console.error('Error fetching job titles:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const updateSearch = debounce(() => {
  filters.value.search = searchInput.value;
}, 300);

const applyFilters = () => {
  currentPage.value = 1;
};

const viewApplication = (application) => {
  selectedApplication.value = application;
  applicationModal.show();
};

const approveApplication = async (id) => {
  try {
    const app = applications.value.find((a) => a.id === id);
    if (!app) throw new Error('Application not found');
    isLoading.value = true;
    // Simulate API call
    const response = await fetch(`/api/applications/${id}/approve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to approve application');
    app.status = 'approved';
    applicationModal.hide();
    console.log('Application approved');
  } catch (error) {
    console.error('Error approving application:', error);
    alert('Failed to approve application. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const rejectApplication = async (id) => {
  try {
    const app = applications.value.find((a) => a.id === id);
    if (!app) throw new Error('Application not found');
    isLoading.value = true;
    const response = await fetch(`/api/applications/${id}/reject`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to reject application');
    app.status = 'rejected';
    applicationModal.hide();
    console.log('Application rejected');
  } catch (error) {
    console.error('Error rejecting application:', error);
    alert('Failed to reject application. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const deleteApplication = async (id) => {
  if (!confirm('Are you sure you want to delete this application?')) return;
  try {
    isLoading.value = true;
    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to delete application');
    applications.value = applications.value.filter((a) => a.id !== id);
    console.log('Application deleted');
  } catch (error) {
    console.error('Error deleting application:', error);
    alert('Failed to delete application. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const downloadResume = async (filename) => {
  try {
    isLoading.value = true;
    const response = await fetch(`/api/resumes/${filename}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    if (!response.ok) throw new Error('Failed to download resume');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Failed to download resume. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const changeLanguage = (lang) => {
  // Placeholder for vue-i18n or similar
  console.log(`Changing language to: ${lang}`);
};

const goToPage = (page) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const logout = async () => {
  try {
    await authStore.logout();
    console.log('Logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Failed to log out. Please try again.');
  }
};

// Lifecycle Hooks
onMounted(() => {
  applicationModal = new Modal(document.getElementById('applicationModal'), {
    backdrop: 'static',
  });
  fetchApplications();
  fetchJobTitles();
});

onUnmounted(() => {
  if (applicationModal) applicationModal.dispose();
});
</script>

<style scoped>
:root {
  --primary: #0d6efd;
  --primary-rgb: 13, 110, 253;
  --light-bg: #f8f9fa;
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
  transition: transform 0.3s ease;
}

.nav-link {
  color: #6c757d;
  border-radius: 0.25rem;
}

.nav-link:hover {
  background-color: rgba(var(--primary-rgb), 0.05);
}

.nav-link.active {
  color: var(--primary);
  background-color: rgba(var(--primary-rgb), 0.05);
  font-weight: 500;
}

.card {
  border-radius: 0.375rem;
}

.sidebar-menu-item a {
  transition: all 0.2s ease;
}

.sidebar-menu-item a:hover {
  background-color: rgba(var(--primary-rgb), 0.05);
}

.sidebar-menu-item a.text-primary {
  font-weight: 500;
}

.table th {
  border-top: none;
  border-bottom: 1px solid #dee2e6;
}

.table td {
  vertical-align: middle;
}

.table th:nth-child(1),
.table td:nth-child(1) {
  width: 30%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 25%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 20%;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 15%;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 10%;
}

.page-item.active .page-link {
  background-color: var(--primary);
  border-color: var(--primary);
}

.page-link {
  color: var(--primary);
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

.badge {
  padding: 0.35em 0.65em;
  font-weight: 500;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    width: 250px;
    transform: translateX(-100%);
    z-index: 1000;
    overflow-y: auto;
  }
  .sidebar.active {
    transform: translateX(0);
  }
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
