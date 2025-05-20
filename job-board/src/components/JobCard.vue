<template>
  <div
    class="job-card bg-white p-3 rounded shadow-sm d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 border"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <img :src="company.logo" alt="Company Logo" class="company-logo rounded" />

    <div class="flex-grow-1">
      <div class="d-flex">
        <h5 class="mb-1 fw-bold text-dark px-3" :class="{ 'hover-title': hover }">
          {{ title }}
        </h5>
        <div class="badge bg-outline-primary text-primary border rounded-pill px-3 py-2">
          {{  job_type }}
        </div>
      </div>

      <p class="mb-1 text-muted small">{{ company.name }}</p>
      <div class="d-flex flex-wrap gap-2 align-items-center text-muted small">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ location }}</span>
        <span class="mx-2">|</span>
        <i class="fas fa-dollar-sign"></i>
        <span>{{ salary }}</span>
        <span class="mx-2">|</span>
        <i class="fas fa-calendar-alt"></i>
        <span>{{ time }}</span>
      </div>
    </div>

    <div class="text-end">
      <div class="mt-2 d-flex align-items-center gap-2">
        <i class="fas fa-bookmark fs-5 text-secondary p-3" :class="{ 'hover-icon': hover }"></i>
        <RouterLink :to="`/candidate/jobs/${id}`">
          <button
            class="btn btn-primary btn-md d-flex align-items-center gap-1"
            @mousedown="buttonClick = true"
            @mouseup="buttonClick = false"
            :class="{ 'btn-clicked': buttonClick }"
          >
            Apply Now <i class="bi bi-arrow-right"></i>
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const hover = ref(false);
const buttonClick = ref(false);

defineProps({
  id: Number,
  title: String,
  description: String,
  location: String,
  salary: String,
  job_type: String,
  time: String,
  company: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.name === 'string' &&
        typeof value.logo === 'string'
      );
    }
  }
});
</script>

<style scoped>
.job-card {
  border: 1px solid #e9ecef;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.job-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.company-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.job-card:hover .company-logo {
  transform: scale(1.1);
}

.bg-outline-primary {
  background-color: transparent;
  border: 1px solid #0d6efd;
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  transition: transform 0.2s ease, background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-clicked {
  transform: scale(0.95);
}

.text-secondary {
  color: #6c757d;
  transition: color 0.3s ease;
}
.hover-icon {
  color: #0056b3;
}

.hover-title {
  color: #0056b3;
  transition: color 0.3s ease;
}
.hover-title:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
