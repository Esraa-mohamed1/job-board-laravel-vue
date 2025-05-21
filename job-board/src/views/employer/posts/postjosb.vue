<template>
  <div class="employer-dashboard">
    <div class="job-posting-container">
      <div class="job-posting-header">
        <div class="header-content">
          <h1><i class="fas fa-briefcase me-2"></i>Post a New Job</h1>
          <p class="subtitle">Fill in the details below to create your job listing</p>
          <div class="progress-steps">
            <div class="step active" v-for="step in 5" :key="step"></div>
          </div>
        </div>
        <div class="header-decoration">
          <i class="fas fa-file-alt"></i>
        </div>
      </div>

      <form @submit.prevent="submitJob" class="job-posting-form needs-validation" :class="{ 'was-validated': formSubmitted }">
        <!-- Basic Information Section -->
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('basic')">
            <h2 class="section-title"><i class="fas fa-info-circle me-2"></i>Basic Information</h2>
            <i class="fas" :class="{ 'fa-chevron-down': !expandedSections.basic, 'fa-chevron-up': expandedSections.basic }"></i>
          </div>
          <div class="section-content" v-show="expandedSections.basic">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-title" v-model="job.title" class="form-control" placeholder=" " required @input="validateField('title')">
                  <label for="job-title">Job Title*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.title || 'Please provide a job title.' }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <select id="job-type" v-model="job.job_type" class="form-select" required @change="validateField('job_type')">
                    <option value="" disabled selected></option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                  <label for="job-type">Job Type*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.job_type || 'Please select a job type.' }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <select id="job-category" v-model="job.category_id" class="form-select" required @change="validateField('category_id')">
                    <option value="" disabled selected></option>
                    <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                  </select>
                  <label for="job-category">Category*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.category_id || 'Please select a category.' }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-location" v-model="job.location" class="form-control" placeholder=" " required @input="validateField('location')">
                  <label for="job-location">Location*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.location || 'Please provide a location.' }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="company" v-model="job.company" class="form-control" placeholder=" " required @input="validateField('company')">
                  <label for="company">Company*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.company || 'Please provide a company name.' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Salary Information Section -->
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('salary')">
            <h2 class="section-title"><i class="fas fa-dollar-sign me-2"></i>Salary Information</h2>
            <i class="fas" :class="{ 'fa-chevron-down': !expandedSections.salary, 'fa-chevron-up': expandedSections.salary }"></i>
          </div>
          <div class="section-content" v-show="expandedSections.salary">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="salary-type" v-model="job.salary_type" class="form-select" @change="validateSalary">
                    <option value="range">Salary Range</option>
                    <option value="fixed">Fixed Salary</option>
                  </select>
                  <label for="salary-type">Salary Type</label>
                </div>
              </div>
              <template v-if="job.salary_type === 'range'">
                <div class="col-md-4">
                  <div class="form-group floating-label">
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" id="min-salary" v-model.number="job.min_salary" class="form-control" placeholder=" " @input="validateSalary">
                      <label for="min-salary">Minimum Salary</label>
                    </div>
                    <div class="invalid-feedback animated-feedback">{{ errors.min_salary || 'Please provide a valid minimum salary.' }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group floating-label">
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" id="max-salary" v-model.number="job.max_salary" class="form-control" placeholder=" " @input="validateSalary">
                      <label for="max-salary">Maximum Salary</label>
                    </div>
                    <div class="invalid-feedback animated-feedback">{{ errors.max_salary || 'Please provide a valid maximum salary.' }}</div>
                  </div>
                </div>
              </template>
              <div class="col-md-4" v-if="job.salary_type === 'fixed'">
                <div class="form-group floating-label">
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" id="salary" v-model.number="job.salary" class="form-control" placeholder=" " @input="validateSalary">
                    <label for="salary">Fixed Salary</label>
                  </div>
                  <div class="invalid-feedback animated-feedback">{{ errors.salary || 'Please provide a valid fixed salary.' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Information Section -->
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('requirements')">
            <h2 class="section-title"><i class="fas fa-chart-line me-2"></i>Requirements</h2>
            <i class="fas" :class="{ 'fa-chevron-down': !expandedSections.requirements, 'fa-chevron-up': expandedSections.requirements }"></i>
          </div>
          <div class="section-content" v-show="expandedSections.requirements">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="education" v-model="job.education_level" class="form-select" required @change="validateField('education_level')">
                    <option value="" disabled selected></option>
                    <option value="high_school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                  <label for="education">Education Level*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.education_level || 'Please select an education level.' }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="experience" v-model="job.experience_level" class="form-select" required @change="validateField('experience_level')">
                    <option value="" disabled selected></option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                  </select>
                  <label for="experience">Experience Level*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.experience_level || 'Please select an experience level.' }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="job-level" v-model="job.job_level" class="form-select" required @change="validateField('job_level')">
                    <option value="" disabled selected></option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                  </select>
                  <label for="job-level">Job Level*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.job_level || 'Please select a job level.' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description & Responsibilities Section -->
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('details')">
            <h2 class="section-title"><i class="fas fa-align-left me-2"></i>Job Details</h2>
            <i class="fas" :class="{ 'fa-chevron-down': !expandedSections.details, 'fa-chevron-up': expandedSections.details }"></i>
          </div>
          <div class="section-content" v-show="expandedSections.details">
            <div class="row g-3">
              <div class="col-12">
                <div class="form-group floating-label">
                  <textarea id="job-description" v-model="job.description" class="form-control" rows="4" placeholder=" " required @input="validateField('description')"></textarea>
                  <label for="job-description">Job Description*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.description || 'Please provide a job description.' }}</div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group floating-label">
                  <textarea id="responsibilities" v-model="job.responsibilities" class="form-control" rows="4" placeholder=" " required @input="validateField('responsibilities')"></textarea>
                  <label for="responsibilities">Responsibilities*</label>
                  <div class="invalid-feedback animated-feedback">{{ errors.responsibilities || 'Please provide job responsibilities.' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills & Tags Section -->
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('skills')">
            <h2 class="section-title"><i class="fas fa-tags me-2"></i>Skills & Tags</h2>
            <i class="fas" :class="{ 'fa-chevron-down': !expandedSections.skills, 'fa-chevron-up': expandedSections.skills }"></i>
          </div>
          <div class="section-content" v-show="expandedSections.skills">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-tags" v-model="tagInput" @keydown.enter.prevent="addTags" @blur="addTags" class="form-control" placeholder=" ">
                  <label for="job-tags">Job Tags</label>
                  <small class="text-hint">Press Enter or click outside to add tags</small>
                  <div v-if="job.tags.length" class="keywords-preview">
                    <strong>Tags:</strong> {{ job.tags.join(', ') }}
                  </div>
                  <div class="invalid-feedback animated-feedback">{{ errors.tags || 'Please provide at least one tag.' }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Required Skills*</label>
                  <div class="skills-container">
                    <span v-for="(skill, index) in job.skills" :key="index" class="skill-badge">
                      {{ skill }}
                      <button type="button" class="skill-remove" @click="removeSkill(index)" aria-label="Remove">
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                    <input type="text" class="skill-input" v-model="skillInput" @keydown.enter.prevent="addSkill" placeholder="Add skill and press Enter...">
                  </div>
                  <div class="invalid-feedback animated-feedback" v-if="errors.skills">{{ errors.skills }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn btn-outline-secondary" @click="resetForm">
            <i class="fas fa-eraser me-1"></i> Reset
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isLoading || hasErrors">
            <span v-if="!isLoading">
              <i class="fas fa-paper-plane me-1"></i> Post Job
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin me-1"></i> Posting...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Reactive state
const job = ref({
  title: '',
  job_type: '',
  category_id: '',
  location: '',
  company: '',
  salary_type: 'range',
  min_salary: '',
  max_salary: '',
  salary: '',
  education_level: '',
  experience_level: '',
  job_level: '',
  description: '',
  responsibilities: '',
  skills: [],
  tags: [],
});

const skillInput = ref('');
const tagInput = ref('');
const isLoading = ref(false);
const formSubmitted = ref(false);
const categories = ref([]);
const expandedSections = ref({
  basic: true,
  salary: true,
  requirements: true,
  details: true,
  skills: true,
});

const errors = ref({
  title: '',
  job_type: '',
  category_id: '',
  location: '',
  company: '',
  description: '',
  responsibilities: '',
  min_salary: '',
  max_salary: '',
  salary: '',
  education_level: '',
  experience_level: '',
  job_level: '',
  skills: '',
  tags: '',
});

const hasErrors = computed(() => Object.values(errors.value).some((error) => error !== ''));

const setupAxios = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories');
    categories.value = response.data;
  } catch (error) {
    showAlert('Failed to fetch categories.', 'error');
  }
};

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// Validate individual field
const validateField = (field) => {
  const value = job.value[field];
  if (['title', 'location', 'company', 'description', 'responsibilities'].includes(field)) {
    errors.value[field] = value.trim() ? '' : `${field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} is required`;
  } else if (['job_type', 'category_id', 'education_level', 'experience_level', 'job_level'].includes(field)) {
    errors.value[field] = value ? '' : `${field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} is required`;
  } else if (field === 'skills') {
    errors.value.skills = job.value.skills.length >= 3 ? '' : 'At least 3 skills are required';
  } else if (field === 'tags') {
    errors.value.tags = job.value.tags.length > 0 ? '' : 'At least one tag is required';
  }
};

// Validate salary fields
const validateSalary = () => {
  if (job.value.salary_type === 'range') {
    errors.value.min_salary = job.value.min_salary === '' || job.value.min_salary < 0 ? 'Minimum salary must be a positive number' : '';
    errors.value.max_salary =
      job.value.max_salary === '' || job.value.max_salary < 0
        ? 'Maximum salary must be a positive number'
        : job.value.min_salary && job.value.max_salary && job.value.min_salary > job.value.max_salary
        ? 'Minimum salary cannot exceed maximum salary'
        : '';
    errors.value.salary = '';
  } else if (job.value.salary_type === 'fixed') {
    errors.value.salary = job.value.salary === '' || job.value.salary < 0 ? 'Fixed salary must be a positive number' : '';
    errors.value.min_salary = '';
    errors.value.max_salary = '';
  }
};

// Validate entire form
const validateForm = () => {
  ['title', 'job_type', 'category_id', 'location', 'company', 'description', 'responsibilities', 'education_level', 'experience_level', 'job_level', 'skills', 'tags'].forEach(validateField);
  validateSalary();
};

// Add skill
const addSkill = () => {
  const skill = skillInput.value.trim();
  if (skill && !job.value.skills.includes(skill)) {
    job.value.skills.push(skill);
    skillInput.value = '';
    validateField('skills');
  }
};

// Remove skill
const removeSkill = (index) => {
  job.value.skills.splice(index, 1);
  validateField('skills');
};

// Add tags
const addTags = () => {
  if (tagInput.value) {
    const newTags = tagInput.value
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0 && !job.value.tags.includes(k));
    job.value.tags = [...new Set([...job.value.tags, ...newTags])];
    tagInput.value = '';
    validateField('tags');
  }
};

// Submit job
const submitJob = async () => {
  formSubmitted.value = true;
  validateForm();

  if (hasErrors.value) {
    showAlert('Please fix the validation errors before submitting.', 'error');
    return;
  }

  try {
    isLoading.value = true;
    await setupAxios();
    const response = await axios.post('http://localhost:8000/api/jobs', job.value);
    showAlert('Job posted successfully!', 'success');
    resetForm();
    formSubmitted.value = false;
  } catch (error) {
    if (error.response?.status === 422) {
      const backendErrors = error.response.data.errors;
      Object.keys(backendErrors).forEach((key) => {
        errors.value[key] = backendErrors[key][0];
      });
      showAlert('Please fix the validation errors.', error);
    } else if (error.response?.status === 401) {
      showAlert('Unauthorized. Please log in.', error);
    } else {
      showAlert(error.message || 'Job submission failed',error);
    }
    console.error('Submission error:', error);
  } finally {
    isLoading.value = false;
  }
};

// Reset form
const resetForm = () => {
  job.value = {
    title: '',
    job_type: '',
    category_id: '',
    location: '',
    company: '',
    salary_type: 'range',
    min_salary: '',
    max_salary: '',
    salary: '',
    education_level: '',
    experience_level: '',
    job_level: '',
    description: '',
    responsibilities: '',
    skills: [],
    tags: [],
  };
  skillInput.value = '';
  tagInput.value = '';
  errors.value = {
    title: '',
    job_type: '',
    category_id: '',
    location: '',
    company: '',
    description: '',
    responsibilities: '',
    min_salary: '',
    max_salary: '',
    salary: '',
    education_level: '',
    experience_level: '',
    job_level: '',
    skills: '',
    tags: '',
  };
  formSubmitted.value = false;
};

// Show alert
const showAlert = (message, type) => {
  alert(`${type.toUpperCase()}: ${message}`); // Replace with your preferred notification system (e.g., Vue Toastification)
};

// Initialize
onMounted(async () => {
  await setupAxios();
  await fetchCategories();
});
</script>

<style scoped>
/* Keep your existing CSS unchanged */
.employer-dashboard {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.job-posting-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.employer-dashboard {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.job-posting-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.job-posting-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.job-posting-header .header-content {
  position: relative;
  z-index: 2;
}

.job-posting-header .header-decoration {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 5rem;
  opacity: 0.1;
  z-index: 1;
}

.job-posting-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.job-posting-header .subtitle {
  opacity: 0.9;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.progress-steps {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.progress-steps .step {
  height: 4px;
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.progress-steps .step.active {
  background: white;
}

.job-posting-form {
  padding: 1.5rem;
}

.form-section {
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.card-style {
  background: white;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-header {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.section-header:hover {
  background: #f8f9fa;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #212529;
}

.section-content {
  padding: 1rem 1.25rem;
  border-top: 1px solid #f1f3f5;
}

.form-group {
  margin-bottom: 1.25rem;
  position: relative;
}

.floating-label {
  position: relative;
}

.floating-label label {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #6c757d;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  pointer-events: none;
  background: white;
  padding: 0 5px;
  transform-origin: left center;
}

.floating-label input:focus ~ label,
.floating-label input:not(:placeholder-shown) ~ label,
.floating-label select:focus ~ label,
.floating-label select:not([value=""]) ~ label,
.floating-label textarea:focus ~ label,
.floating-label textarea:not(:placeholder-shown) ~ label {
  transform: translateY(-22px) scale(0.85);
  color: #4361ee;
}

.form-control, .form-select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
}

.input-group-text {
  background: #f8f9fa;
  border-radius: 8px 0 0 8px !important;
}

.invalid-feedback {
  font-size: 0.8rem;
}

.animated-feedback {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.skills-container {
  min-height: 100px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.skill-badge {
  background: #4361ee;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.skill-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 0.7rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.skill-remove:hover {
  opacity: 1;
}

.skill-input {
  flex: 1;
  min-width: 150px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0.5rem;
}

.keywords-preview {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f1f3f5;
  border-radius: 8px;
  font-size: 0.85rem;
}

.text-hint {
  font-size: 0.75rem;
  color: #6c757d;
  display: block;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #4361ee;
  border-color: #4361ee;
}

.btn-primary:hover {
  background: #3a56d4;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}

.btn-outline-secondary {
  border-color: #dee2e6;
}

.btn-outline-secondary:hover {
  background: #f8f9fa;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .employer-dashboard {
    padding: 0;
  }
  
  .job-posting-header {
    padding: 1.25rem;
  }
  
  .job-posting-form {
    padding: 1.25rem;
  }
  
  .section-header {
    padding: 0.75rem 1rem;
  }
  
  .section-content {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 576px) {
  .job-posting-header h1 {
    font-size: 1.3rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .form-actions .btn {
    width: 100%;
  }
  
  .header-decoration {
    display: none;
  }
}
</style>