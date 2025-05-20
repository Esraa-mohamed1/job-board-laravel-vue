<template>
  <div class="employer-dashboard">
    <div class="job-posting-container">
      <div class="job-posting-header bg-primary text-white">
        <h1><i class="fas fa-briefcase me-2"></i>Post a New Job</h1>
        <p class="subtitle mb-0">Fill in the details below to create your job listing</p>
      </div>

      <form @submit.prevent="submitJob" class="job-posting-form needs-validation" novalidate :class="{'was-validated': formSubmitted}">
        <!-- Basic Information Section -->
        <div class="form-section">
          <h2 class="section-title text-primary"><i class="fas fa-info-circle me-2"></i>Basic Information</h2>
          <div class="row g-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="job-title" class="form-label">Job Title*</label>
                <input type="text" id="job-title" v-model="job.title" 
                       class="form-control form-control-sm" 
                       placeholder="e.g. Senior Frontend Developer" 
                       required
                       @input="validateField('title')">
                <div class="invalid-feedback">
                  {{ errors.title || 'Please provide a job title.' }}
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="form-group">
                <label for="job-type" class="form-label">Job Type*</label>
                <select id="job-type" v-model="job.type" 
                        class="form-select form-select-sm" 
                        required
                        @change="validateField('type')">
                  <option value="">Select job type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
                <div class="invalid-feedback">
                  {{ errors.type || 'Please select a job type.' }}
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="form-group">
                <label for="job-category" class="form-label">Category*</label>
                <select id="job-category" v-model="job.category" 
                        class="form-select form-select-sm" 
                        required
                        @change="validateField('category')">
                  <option value="">Select category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                </select>
                <div class="invalid-feedback">
                  {{ errors.category || 'Please select a category.' }}
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="form-group">
                <label for="job-location" class="form-label">Location*</label>
                <input type="text" id="job-location" v-model="job.location" 
                       class="form-control form-control-sm" 
                       placeholder="e.g. New York, NY or Remote" 
                       required
                       @input="validateField('location')">
                <div class="invalid-feedback">
                  {{ errors.location || 'Please provide a location.' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Salary Information Section -->
        <div class="form-section">
          <h2 class="section-title text-primary"><i class="fas fa-dollar-sign me-2"></i>Salary Information</h2>
          <div class="row g-2">
            <div class="col-md-4">
              <div class="form-group">
                <label for="salary-type" class="form-label">Salary Type</label>
                <select id="salary-type" v-model="job.salaryType" class="form-select form-select-sm" @change="validateSalary">
                  <option value="range">Salary Range</option>
                  <option value="fixed">Fixed Salary</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
            </div>
            
            <template v-if="job.salaryType === 'range'">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="min-salary" class="form-label">Minimum Salary</label>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">$</span>
                    <input type="number" id="min-salary" v-model.number="job.minSalary" 
                           class="form-control" 
                           placeholder="e.g. 50000"
                           @input="validateSalary">
                  </div>
                  <div class="invalid-feedback">
                    {{ errors.minSalary || 'Please provide a valid minimum salary.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="form-group">
                  <label for="max-salary" class="form-label">Maximum Salary</label>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">$</span>
                    <input type="number" id="max-salary" v-model.number="job.maxSalary" 
                           class="form-control" 
                           placeholder="e.g. 80000"
                           @input="validateSalary">
                  </div>
                  <div class="invalid-feedback">
                    {{ errors.maxSalary || 'Please provide a valid maximum salary.' }}
                  </div>
                </div>
              </div>
            </template>
            
            <div class="col-md-4" v-if="job.salaryType === 'fixed'">
              <div class="form-group">
                <label for="fixed-salary" class="form-label">Fixed Salary</label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">$</span>
                  <input type="number" id="fixed-salary" v-model.number="job.fixedSalary" 
                         class="form-control" 
                         placeholder="e.g. 70000"
                         @input="validateSalary">
                </div>
                <div class="invalid-feedback">
                  {{ errors.fixedSalary || 'Please provide a valid fixed salary.' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Information Section -->
        <div class="form-section">
          <h2 class="section-title text-primary"><i class="fas fa-chart-line me-2"></i>Requirements</h2>
          <div class="row g-2">
            <div class="col-md-4">
              <div class="form-group">
                <label for="education" class="form-label">Education Level</label>
                <select id="education" v-model="job.education" class="form-select form-select-sm">
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="form-group">
                <label for="experience" class="form-label">Experience Level</label>
                <select id="experience" v-model="job.experience" class="form-select form-select-sm">
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="form-group">
                <label for="job-level" class="form-label">Job Level</label>
                <select id="job-level" v-model="job.level" class="form-select form-select-sm">
                  <option value="">Select job level</option>
                  <option value="intern">Intern</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid-level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Description & Responsibilities Section -->
        <div class="form-section">
          <h2 class="section-title text-primary"><i class="fas fa-align-left me-2"></i>Job Details</h2>
          <div class="row g-2">
            <div class="col-12">
              <div class="form-group">
                <label for="job-description" class="form-label">Job Description*</label>
                <textarea id="job-description" v-model="job.description" 
                          class="form-control form-control-sm" rows="3"
                          placeholder="Add detailed job description..." 
                          required
                          @input="validateField('description')"></textarea>
                <div class="invalid-feedback">
                  {{ errors.description || 'Please provide a job description.' }}
                </div>
              </div>
            </div>
            
            <div class="col-12">
              <div class="form-group">
                <label for="responsibilities" class="form-label">Responsibilities*</label>
                <textarea id="responsibilities" v-model="job.responsibilities" 
                          class="form-control form-control-sm" rows="3"
                          placeholder="Add key responsibilities..." 
                          required
                          @input="validateField('responsibilities')"></textarea>
                <div class="invalid-feedback">
                  {{ errors.responsibilities || 'Please provide job responsibilities.' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills & Keywords Section -->
        <div class="form-section">
          <h2 class="section-title text-primary"><i class="fas fa-tags me-2"></i>Skills & Keywords</h2>
          <div class="row g-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="job-keywords" class="form-label">Job Keywords</label>
                <input type="text" id="job-keywords" v-model="keywordInput" 
                       @keydown.enter.prevent="addKeywords"
                       @blur="addKeywords"
                       class="form-control form-control-sm"
                       placeholder="Add keywords (comma separated)">
                <small class="text-muted">Press Enter or click outside to add keywords</small>
                <div v-if="job.keywords" class="mt-2 p-2 bg-light rounded">
                  <strong>Keywords:</strong> {{ job.keywords }}
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Required Skills</label>
                <div class="skills-container p-2 border rounded">
                  <span v-for="(skill, index) in job.skills" :key="index" 
                        class="badge bg-primary me-1 mb-1">
                    {{ skill }} 
                    <button type="button" class="btn-close btn-close-white ms-1" 
                            @click="removeSkill(index)" aria-label="Remove"></button>
                  </span>
                  <input type="text" class="form-control form-control-sm border-0 mt-1" 
                         v-model="skillInput" 
                         @keydown.enter.prevent="addSkill"
                         placeholder="Add skill and press Enter...">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions mt-3 pt-2 border-top">
         
          <button type="submit" class="btn btn-primary btn-sm" :disabled="isLoading || hasErrors">
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

<script>
export default {
  data() {
    return {
      job: {
        title: '',
        type: '',
        category: '',
        location: '',
        salaryType: 'range',
        minSalary: '',
        maxSalary: '',
        fixedSalary: '',
        salaryTax: '',
        education: '',
        experience: '',
        level: '',
        description: '',
        responsibilities: '',
        skills: [],
        keywords: ''
      },
      skillInput: '',
      keywordInput: '',
      isLoading: false,
      formSubmitted: false,
      errors: {
        title: '',
        type: '',
        category: '',
        location: '',
        description: '',
        responsibilities: '',
        minSalary: '',
        maxSalary: '',
        fixedSalary: ''
      }
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    }
  },
  methods: {
    validateField(field) {
      const value = this.job[field];
      if (['title', 'location', 'description', 'responsibilities'].includes(field)) {
        this.errors[field] = value.trim() ? '' : `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (['type', 'category'].includes(field)) {
        this.errors[field] = value ? '' : `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    },
    validateSalary() {
      if (this.job.salaryType === 'range') {
        this.errors.minSalary = this.job.minSalary === '' || this.job.minSalary < 0 ? 'Minimum salary must be a positive number' : '';
        this.errors.maxSalary = this.job.maxSalary === '' || this.job.maxSalary < 0 ? 'Maximum salary must be a positive number' : 
                               this.job.minSalary && this.job.maxSalary && this.job.minSalary > this.job.maxSalary ? 
                               'Minimum salary cannot exceed maximum salary' : '';
      } else if (this.job.salaryType === 'fixed') {
        this.errors.fixedSalary = this.job.fixedSalary === '' || this.job.fixedSalary < 0 ? 'Fixed salary must be a positive number' : '';
      } else {
        this.errors.minSalary = '';
        this.errors.maxSalary = '';
        this.errors.fixedSalary = '';
      }
    },
    validateForm() {
      this.validateField('title');
      this.validateField('type');
      this.validateField('category');
      this.validateField('location');
      this.validateField('description');
      this.validateField('responsibilities');
      this.validateSalary();
    },
    addSkill() {
      const skill = this.skillInput.trim();
      if (skill && !this.job.skills.includes(skill)) {
        this.job.skills.push(skill);
        this.skillInput = '';
      }
    },
    removeSkill(index) {
      this.job.skills.splice(index, 1);
    },
    addKeywords() {
      if (this.keywordInput) {
        const newKeywords = this.keywordInput.split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0);
        
        const existingKeywords = this.job.keywords ? this.job.keywords.split(', ') : [];
        const allKeywords = [...new Set([...existingKeywords, ...newKeywords])];
        
        this.job.keywords = allKeywords.join(', ');
        this.keywordInput = '';
      }
    },
    
   async submitJob() {
  this.formSubmitted = true;
  this.validateForm();

  if (this.hasErrors) {
    this.showAlert('Please fix the validation errors before submitting.', 'error');
    return;
  }

  try {
    this.isLoading = true;
    
    // Prepare the data to match your Laravel Job model
    const jobData = {
      title: this.job.title,
      job_type: this.job.type,
      category: this.job.category,
      location: this.job.location,
      salary_type: this.job.salaryType,
      min_salary: this.job.salaryType === 'range' ? this.job.minSalary : null,
      max_salary: this.job.salaryType === 'range' ? this.job.maxSalary : null,
      salary: this.job.salaryType === 'fixed' ? this.job.fixedSalary : null,
      education_level: this.job.education,
      experience_level: this.job.experience,
      job_level: this.job.level,
      description: this.job.description,
      responsibilities: this.job.responsibilities,
      skills: this.job.skills.join(','),
      keywords: this.job.keywords
    };

    // Get auth token from localStorage
    const token = localStorage.getItem('token');

    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Job submission failed');
    }
    
    this.showAlert('Job posted successfully!', 'success');
    this.resetForm();
    this.formSubmitted = false;
    
    // Redirect to employer jobs list
    this.$router.push('/employer/dashboard/myjobs');
    
  } catch (error) {
    this.showAlert(error.message || 'Failed to post job. Please try again.', 'error');
    console.error('Submission error:', error);
  } finally {
    this.isLoading = false;
  }
}
    resetForm() {
      this.job = {
        title: '',
        type: '',
        category: '',
        location: '',
        salaryType: 'range',
        minSalary: '',
        maxSalary: '',
        fixedSalary: '',
        salaryTax: '',
        education: '',
        experience: '',
        level: '',
        description: '',
        responsibilities: '',
        skills: [],
        keywords: ''
      };
      this.skillInput = '';
      this.keywordInput = '';
      this.errors = {
        title: '',
        type: '',
        category: '',
        location: '',
        description: '',
        responsibilities: '',
        minSalary: '',
        maxSalary: '',
        fixedSalary: ''
      };
    },
    showAlert(message, type) {
      // Replace with your preferred alert/notification system
      alert(`${type.toUpperCase()}: ${message}`);
    }
  },
  mounted() {
    this.loadDraft();
  }
};
</script>

<style scoped>
.employer-dashboard {
  max-width: 800px;
  margin: 1rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.job-posting-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.job-posting-header {
  padding: 1rem;
  background: linear-gradient(135deg, #0d6efd 0%, #3a7bd5 100%);
}

.job-posting-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.job-posting-header .subtitle {
  opacity: 0.9;
  font-size: 0.8rem;
}

.job-posting-form {
  padding: 1rem;
}

.form-section {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.375rem;
  border: 1px solid #dee2e6;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #d1e3ff;
}

.skills-container {
  min-height: 80px;
  background: #f8f9fa;
}

.badge {
  font-weight: 500;
  padding: 0.25em 0.5em;
  font-size: 0.75em;
}

.btn-close {
  font-size: 0.5em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Make form controls more compact */
.form-control-sm, .form-select-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .employer-dashboard {
    padding: 0;
  }
  
  .job-posting-header {
    padding: 0.75rem;
  }
  
  .job-posting-form {
    padding: 0.75rem;
  }
  
  .form-section {
    padding: 0.5rem;
  }
  
  .section-title {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .job-posting-header h1 {
    font-size: 1.1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
    margin-bottom: 0.25rem;
  }
}
</style>

<!-- Add these in your main HTML file -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">