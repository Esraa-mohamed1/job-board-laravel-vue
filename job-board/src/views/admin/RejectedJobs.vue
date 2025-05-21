<template>
  <div class="admin-dashboard">
    <div v-if="!jobStore" class="alert alert-danger mx-3 mt-3">
      Error: Job store not initialized
      <button
        @click="initializeStore"
        class="btn btn-sm btn-outline-danger ms-2"
      >
        Retry
      </button>
    </div>
    <div v-else>
      <div v-if="jobStore.loading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="jobStore.error" class="alert alert-danger" role="alert">
        {{ jobStore.error }}
        <button
          @click="jobStore.fetchDashboardData"
          class="btn btn-sm btn-outline-danger ms-2"
        >
          Retry
        </button>
      </div>
      <div v-else class="row g-0">
        <AdminSidebar />
        <div class="col-md-9 col-lg-10 ms-auto admin-content">
          <div class="container-fluid py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3>Rejected Jobs</h3>
              <p class="mb-0 text-secondary">
                {{ jobStore.rejectedCount || 0 }} rejected jobs
              </p>
            </div>
            <div class="card">
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
                        <th>Date Rejected</th>
                        <th>Status</th>
                        <th>Rejection Reason</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="job in jobStore.rejectedJobs" :key="job.id">
                        <td>
                          <div class="d-flex align-items-center">
                            <div
                              class="company-logo me-3"
                              :style="{
                                backgroundColor: getLogoBackground(job.title),
                              }"
                            >
                              <span>{{ getInitial(job.title) }}</span>
                            </div>
                            <div>{{ job.title }}</div>
                          </div>
                        </td>
                        <td>{{ job.company }}</td>
                        <td>
                          <i
                            class="fas fa-map-marker-alt me-1 text-secondary"
                          ></i>
                          {{ job.location }}
                        </td>
                        <td>{{ job.salary }}</td>
                        <td>{{ job.datePosted }}</td>
                        <td>{{ job.dateRejected }}</td>
                        <td>
                          <span class="badge bg-danger">Rejected</span>
                        </td>
                        <td>{{ job.rejection_reason }}</td>
                        <td>
                          
                        </td>
                      </tr>
                      <tr v-if="jobStore.rejectedJobs.length === 0">
                        <td colspan="9" class="text-center py-4 text-muted">
                          No rejected jobs yet
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

      <!-- Job Details Modal -->
      <div
        class="modal fade"
        id="jobDetailsModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Job Details</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" v-if="jobStore.currentJob">
              <h4>{{ jobStore.currentJob.title }}</h4>
              <div class="d-flex align-items-center mb-3">
                <span class="badge bg-danger me-2">Rejected</span>
                <span class="text-muted"
                  >Date Rejected: {{ jobStore.currentJob.dateRejected }}</span
                >
              </div>
              <div class="mb-3">
                <strong>Company:</strong> {{ jobStore.currentJob.company }}
              </div>
              <div class="mb-3">
                <strong>Location:</strong> {{ jobStore.currentJob.location }}
              </div>
              <div class="mb-3">
                <strong>Salary:</strong> {{ jobStore.currentJob.salary }}
              </div>
              <div class="mb-3">
                <strong>Date Posted:</strong>
                {{ jobStore.currentJob.datePosted }}
              </div>
              <div class="mb-3">
                <strong>Rejection Reason:</strong>
                {{
                  jobStore.currentJob.rejection_reason || "No reason provided"
                }}
              </div>
              <div class="mb-4">
                <strong>Description:</strong>
                <div class="job-description mt-2">
                  {{ jobStore.currentJob.description }}
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  class="btn btn-success me-2"
                  @click="approveRejectedJob"
                  :disabled="jobStore.loading"
                >
                  Approve Job
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { useToast } from "vue-toast-notification";
import { useJobStore } from "../../stores/admin/jobStore";
import AdminSidebar from "./AdminSidebar.vue"; // Verify this path

const jobStore = useJobStore();
const toast = useToast();
const jobDetailsModal = ref(null);

onMounted(async () => {
  console.log("RejectedJobs component mounted");
  console.log("jobStore:", jobStore); // Debug store initialization
  try {
    await jobStore.fetchDashboardData();
    console.log("Rejected jobs:", jobStore.rejectedJobs);
    console.log("Rejected count:", jobStore.rejectedCount);
    jobDetailsModal.value = new Modal(
      document.getElementById("jobDetailsModal")
    );
  } catch (error) {
    console.error("Error in onMounted:", error);
    toast.error("Failed to load dashboard data");
  }
});

watch(
  () => jobStore.rejectedJobs,
  (newValue) => {
    console.log("Rejected jobs updated:", newValue);
  },
  { deep: true }
);

const viewJobDetails = async (jobId) => {
  console.log("Viewing job details for:", jobId);
  try {
    await jobStore.fetchJobDetails(jobId);
    if (jobStore.currentJob) {
      console.log("Job details fetched:", jobStore.currentJob);
      jobDetailsModal.value.show();
    } else {
      toast.error("No job data available");
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    toast.error("Failed to load job details");
  }
};

const approveRejectedJob = async () => {
  if (jobStore.currentJob) {
    try {
      await jobStore.approveJob(jobStore.currentJob.id);
      jobDetailsModal.value.hide();
      toast.success("Job approved successfully");
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error("Failed to approve job");
    }
  }
};

const initializeStore = async () => {
  try {
    await jobStore.fetchDashboardData();
    toast.success("Store initialized successfully");
  } catch (error) {
    console.error("Error initializing store:", error);
    toast.error("Failed to initialize store");
  }
};

const getInitial = (title) => title?.charAt(0)?.toUpperCase() || "?";
const getLogoBackground = (title) => {
  const colors = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6"];
  const index = title ? Math.floor(title.charCodeAt(0) % colors.length) : 0;
  return colors[index];
};
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.job-description {
  white-space: pre-line;
}
</style>
