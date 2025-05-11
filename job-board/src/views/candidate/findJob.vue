<template>
  <div class="job-board container py-1">
    <div class="row">
      <aside class="col-lg-3 mb-4">
        <div class="border rounded p-4 bg-white shadow-sm">
          <h5 class="fw-bold mb-4 d-flex align-items-center">
            <i class="fas fa-filter me-2 text-primary"></i> Filter Jobs
          </h5>

          <div class="mb-4">
            <label for="category" class="form-label fw-semibold d-flex align-items-center">
              <i class="fas fa-list-alt me-2 text-primary"></i> Job Category
            </label>
            <select id="category" class="form-select" aria-label="Select Job Category">
              <option selected>All Categories</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Development</option>
            </select>
          </div>

          <div>
            <label class="form-label fw-semibold d-flex align-items-center">
              <i class="fas fa-briefcase me-2 text-primary"></i> Job Type
            </label>
            <div
              class="form-check mb-2"
              v-for="type in jobTypes"
              :key="type.label"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="type.label"
                v-model="type.checked"
              />
              <label class="form-check-label" :for="type.label">
                {{ type.label }}
              </label>
            </div>
          </div>
        </div>
      </aside>

      <section class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="text-muted fw-bold ">{{ filteredJobs.length.toLocaleString() }} Jobs found</div>
          <div class="d-flex align-items-center">
            <label for="sort" class="me-2 text-muted">Sort by</label>
            <select id="sort" class="form-select w-auto" v-model="sortOption" @change="sortJobs">
              <option value="none">None</option>
              <option value="latest">Latest</option>
              <option value="salaryHigh">Salary High</option>
            </select>
          </div>
        </div>

        <div class="job-list">
          <JobCard
            v-for="(job, index) in paginatedJobs"
            :key="index"
            v-bind="job"
          />
        </div>
      </section>
    </div>

    <button
      class="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <i class="bi bi-arrow-up"></i>
    </button>

    <nav aria-label="Job pagination" class="mt-5">
      <ul class="pagination justify-content-center gap-2">
        <li class="page-item">
          <button class="page-link rounded shadow-sm" @click="currentPage--" :disabled="currentPage === 1">
            
          </button>
        </li>

        <li v-for="page in totalPages" :key="page" class="page-item">
          <button 
            class="page-link rounded shadow-sm" 
            :class="{ 'active bg-primary text-white': page === currentPage }"
            @click="currentPage = page"
          >
            {{ page.toString().padStart(2, '0') }}
          </button>
        </li>

        <li class="page-item">
          <button class="page-link rounded shadow-sm" @click="currentPage++" :disabled="currentPage === totalPages">
            >>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import JobCard from '@/components/JobCard.vue';


const jobs = ref([]);
const jobTypes = ref([
  { label: 'Full Time', checked: false },
  { label: 'Part Time', checked: false },
  { label: 'Remote', checked: false },
  { label: 'Contract', checked: false }
]);
const currentPage = ref(1);
const itemsPerPage = 5;
const sortOption = ref('none');


const fetchJobs = async () => {
  try {
    const response = await fetch('http://localhost:3000/jobs');
    if (!response.ok) throw new Error('Failed to fetch jobs');
    jobs.value = await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
  }
};

const filteredJobs = computed(() => {
  const selectedTypes = jobTypes.value.filter((type) => type.checked).map((type) => type.label);
  if (selectedTypes.length === 0) return jobs.value;
  return jobs.value.filter((job) => selectedTypes.includes(job.type));
});

const sortedJobs = computed(() => {
  if (sortOption.value === 'latest') {
    return [...filteredJobs.value].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }
  if (sortOption.value === 'salaryHigh') {
    return [...filteredJobs.value].sort((a, b) => parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, '')));
  }
  return filteredJobs.value;
});

const totalPages = computed(() => Math.ceil(sortedJobs.value.length / itemsPerPage));

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedJobs.value.slice(start, end);
});

const sortJobs = () => {
  currentPage.value = 1;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchJobs();
});
</script>

<style scoped>
.page-link {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  color: #64748b;
  transition: all 0.2s ease;
}

.page-link:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

.page-link.active {
  border-color: #0d6efd;
}

.page-link:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.job-board {
  background-color: #ffffff;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

select.form-select:focus,
input.form-check-input:focus {
  box-shadow: none;
}
</style>