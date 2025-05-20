<template>
  <div class="admin-dashboard">
    <div class="row g-0">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Main Content -->
      <div class="col-md-9 col-lg-10 ms-auto admin-content">
        <div class="container-fluid py-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3>Pending Jobs</h3>
            <p class="mb-0 text-secondary">
              {{ jobStore.pendingCount }} jobs awaiting approval
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
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="job in jobStore?.pendingJobs &&
                      Array.isArray(jobStore.pendingJobs)
                        ? jobStore.pendingJobs.slice(0, 5)
                        : []"
                      :key="job?.id || job?.title || Math.random()"
                    >
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
                      <td>
                        <span class="badge bg-warning">Pending</span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <button
                            class="btn btn-sm btn-outline-secondary"
                            @click="viewJobDetails(job.id)"
                          >
                            View
                          </button>
                          <button
                            class="btn btn-sm btn-success"
                            @click="jobStore.approveJob(job.id)"
                          >
                            <i class="fas fa-check"></i>
                          </button>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="jobStore.rejectJob(job.id)"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="jobStore.pendingJobs.length === 0">
                      <td colspan="7" class="text-center py-4 text-muted">
                        No pending jobs to review
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Main Content -->
    </div>
    <!-- End row -->
  </div>
</template>

<script setup>
import { useJobStore } from "../../stores/admin/jobStore";
import { onMounted } from "vue";
import { Modal } from "bootstrap";
import AdminSidebar from "./AdminSidebar.vue";

const jobStore = useJobStore();
let jobDetailsModal = null;

onMounted(async () => {
  await jobStore.fetchDashboardData();
  jobDetailsModal = new Modal(document.getElementById("jobDetailsModal"));
});

const viewJobDetails = async (jobId) => {
  await jobStore.fetchJobDetails(jobId);
  jobDetailsModal.show();
};

const getInitial = (title) => title?.charAt(0)?.toUpperCase() || "?";
const getLogoBackground = (title) => {
  const colors = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6"];
  const index = title ? Math.floor(title.charCodeAt(0) % colors.length) : 0;
  return colors[index];
};
</script>
