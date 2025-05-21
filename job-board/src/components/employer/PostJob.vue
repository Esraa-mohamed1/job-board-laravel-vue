<template>
  <div class="post-job-container">
    <h2>Post a New Job</h2>
    <form @submit.prevent="handleSubmit" class="job-form">
      <div class="form-group">
        <label for="title">Job Title</label>
        <input
          type="text"
          id="title"
          v-model="jobData.title"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Job Description</label>
        <textarea
          id="description"
          v-model="jobData.description"
          class="form-control"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="requirements">Requirements</label>
        <textarea
          id="requirements"
          v-model="jobData.requirements"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          id="location"
          v-model="jobData.location"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="type">Job Type</label>
        <select id="type" v-model="jobData.type" class="form-control" required>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div class="form-group">
        <label for="salary">Salary Range</label>
        <input
          type="text"
          id="salary"
          v-model="jobData.salary"
          class="form-control"
          placeholder="e.g., $50,000 - $70,000"
          required
        />
      </div>

      <div class="form-group">
        <label for="deadline">Application Deadline</label>
        <input
          type="date"
          id="deadline"
          v-model="jobData.deadline"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Posting...' : 'Post Job' }}
      </button>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useJobStore } from '@/stores/employer/job.store'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobStore = useJobStore()

const jobData = ref({
  title: '',
  description: '',
  requirements: '',
  location: '',
  type: 'full-time',
  salary: '',
  deadline: ''
})

const loading = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    // Get employer ID from your auth store or context
    const employerId = 1 // Replace with actual employer ID
    await jobStore.postJob(employerId, jobData.value)
    router.push('/employer/jobs') // Redirect to jobs list
  } catch (err) {
    error.value = err.message || 'Failed to post job'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.post-job-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.job-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea.form-control {
  resize: vertical;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.alert {
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}
</style> 