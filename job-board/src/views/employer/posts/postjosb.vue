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

      <form @submit.prevent="submitJob" class="job-posting-form needs-validation" novalidate :class="{'was-validated': formSubmitted}">
        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('basic')">
            <h2 class="section-title"><i class="fas fa-info-circle me-2"></i>Basic Information</h2>
            <i class="fas" :class="{'fa-chevron-down': !expandedSections.basic, 'fa-chevron-up': expandedSections.basic}"></i>
          </div>
          <div class="section-content" v-show="expandedSections.basic">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-title" v-model="job.title" 
                         class="form-control" 
                         placeholder=" "
                         required
                         @input="validateField('title')">
                  <label for="job-title">Job Title*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.title || 'Please provide a job title.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <select id="job-type" v-model="job.type" 
                          class="form-select" 
                          required
                          @change="validateField('type')">
                    <option value="" disabled selected></option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                  <label for="job-type">Job Type*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.type || 'Please select a job type.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <select id="job-category" v-model="job.category_id" 
                          class="form-select" 
                          required
                          @change="validateField('category_id')">
                    <option value="" disabled selected></option>
                    <option v-for="category in categories" :value="category.id" :key="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <label for="job-category">Category*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.category_id || 'Please select a category.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-location" v-model="job.location" 
                         class="form-control" 
                         placeholder=" "
                         required
                         @input="validateField('location')">
                  <label for="job-location">Location*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.location || 'Please provide a location.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('salary')">
            <h2 class="section-title"><i class="fas fa-dollar-sign me-2"></i>Salary Information</h2>
            <i class="fas" :class="{'fa-chevron-down': !expandedSections.salary, 'fa-chevron-up': expandedSections.salary}"></i>
          </div>
          <div class="section-content" v-show="expandedSections.salary">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="salary-type" v-model="job.salary_type" class="form-select">
                    <option value="range">Salary Range</option>
                    <option value="fixed">Fixed Salary</option>
                  </select>
                  <label for="salary-type">Salary Type</label>
                </div>
              </div>
              
                <div class="col-md-4" v-if="job.salary_type === 'range'">
                <div class="form-group floating-label">
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" id="min-salary" v-model.number="job.min_salary" 
                          class="form-control" 
                          placeholder=" ">
                    <label for="min-salary">Minimum Salary</label>
                  </div>
                </div>
              </div>

                <div class="col-md-4" v-if="job.salary_type === 'range'">
                  <div class="form-group floating-label">
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" id="max-salary" v-model.number="job.max_salary" 
                            class="form-control" 
                            placeholder=" ">
                      <label for="max-salary">Maximum Salary</label>
                    </div>
                  </div>
                </div>

              <div class="col-md-4" v-if="job.salary_type === 'fixed'">
                <div class="form-group floating-label">
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" id="fixed-salary" v-model.number="job.fixed_salary" 
                          class="form-control" 
                          placeholder=" ">
                    <label for="fixed-salary">Fixed Salary</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('requirements')">
            <h2 class="section-title"><i class="fas fa-chart-line me-2"></i>Requirements</h2>
            <i class="fas" :class="{'fa-chevron-down': !expandedSections.requirements, 'fa-chevron-up': expandedSections.requirements}"></i>
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
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.education_level || 'Please select an education level.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="experience" v-model="job.experience_level" class="form-select" required @change="validateField('experience_level')">
                    <option value="" disabled selected></option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                    <option value="executive">Executive</option>
                  </select>
                  <label for="experience">Experience Level*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.experience_level || 'Please select an experience level.' }}
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="form-group floating-label">
                  <select id="job-level" v-model="job.job_level" class="form-select" required @change="validateField('job_level')">
                    <option value="" disabled selected></option>
                    <option value="intern">Intern</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                  </select>
                  <label for="job-level">Job Level*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.job_level || 'Please select a job level.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('details')">
            <h2 class="section-title"><i class="fas fa-align-left me-2"></i>Job Details</h2>
            <i class="fas" :class="{'fa-chevron-down': !expandedSections.details, 'fa-chevron-up': expandedSections.details}"></i>
          </div>
          <div class="section-content" v-show="expandedSections.details">
            <div class="row g-3">
              <div class="col-12">
                <div class="form-group floating-label">
                  <textarea id="job-description" v-model="job.description" 
                            class="form-control" rows="4"
                            placeholder=" "
                            required
                            @input="validateField('description')"></textarea>
                  <label for="job-description">Job Description*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.description || 'Please provide a job description (min 100 characters).' }}
                  </div>
                </div>
              </div>
              
              <div class="col-12">
                <div class="form-group floating-label">
                  <textarea id="responsibilities" v-model="job.responsibilities" 
                            class="form-control" rows="4"
                            placeholder=" "
                            required
                            @input="validateField('responsibilities')"></textarea>
                  <label for="responsibilities">Responsibilities*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.responsibilities || 'Please provide job responsibilities (min 50 characters).' }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group floating-label">
                  <input type="text" id="company" v-model="job.company" 
                         class="form-control" 
                         placeholder=" "
                         required
                         @input="validateField('company')">
                  <label for="company">Company Name*</label>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.company || 'Please provide a company name.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section card-style">
          <div class="section-header" @click="toggleSection('skills')">
            <h2 class="section-title"><i class="fas fa-tags me-2"></i>Skills & Keywords</h2>
            <i class="fas" :class="{'fa-chevron-down': !expandedSections.skills, 'fa-chevron-up': expandedSections.skills}"></i>
          </div>
          <div class="section-content" v-show="expandedSections.skills">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-group floating-label">
                  <input type="text" id="job-keywords" v-model="keywordInput" 
                         @keydown.enter.prevent="addKeywords"
                         @blur="addKeywords"
                         class="form-control"
                         placeholder=" ">
                  <label for="job-keywords">Job Tags</label>
                  <small class="text-hint">Press Enter or click outside to add tags</small>
                  <div v-if="job.tags && job.tags.length > 0" class="keywords-preview">
                    <strong>Tags:</strong> 
                    <span v-for="(tag, index) in job.tags" :key="index" class="tag-badge">
                      {{ tag }}
                      <button type="button" class="tag-remove" @click="removeTag(index)">
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Required Skills*</label>
                  <div class="skills-container">
                    <span v-for="(skill, index) in job.skills" :key="index" 
                          class="skill-badge">
                      {{ skill }} 
                      <button type="button" class="skill-remove" 
                              @click="removeSkill(index)" aria-label="Remove">
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                    <input type="text" class="skill-input" 
                           v-model="skillInput" 
                           @keydown.enter.prevent="addSkill"
                           placeholder="Add skill and press Enter..."
                           required>
                  </div>
                  <div class="invalid-feedback animated-feedback">
                    {{ errors.skills || 'Please add at least 3 skills.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

<script>
import axios from 'axios'

export default {
  data() {
    return {
      job: {
        title: '',
        type: '',
        category_id: '',
        location: '',
        salary_type: 'range',
        min_salary: null,
        max_salary: null,
        education_level: '',
        experience_level: '',
        job_level: '',
        description: '',
        responsibilities: '',
        company: '',
        skills: [],
        tags: []
      },
      categories: [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Mobile Development' },
        { id: 3, name: 'DevOps' },
        { id: 4, name: 'Data Science' },
        { id: 5, name: 'Artificial Intelligence' },
        { id: 6, name: 'Cybersecurity' },
        { id: 7, name: 'Cloud Computing' },
        { id: 8, name: 'Game Development' },
        { id: 9, name: 'Embedded Systems' },
        { id: 10, name: 'UI/UX Design' }
      ],
      skillInput: '',
      keywordInput: '',
      isLoading: false,
      formSubmitted: false,
      expandedSections: {
        basic: true,
        salary: true,
        requirements: true,
        details: true,
        skills: true
      },
      errors: {
        title: '',
        type: '',
        category_id: '',
        location: '',
        description: '',
        responsibilities: '',
        education_level: '',
        experience_level: '',
        job_level: '',
        company: '',
        skills: ''
      }
    }
  },
  computed: {
    hasErrors() {
      this.validateField('title')
      this.validateField('type')
      this.validateField('category_id')
      this.validateField('location')
      this.validateField('description')
      this.validateField('responsibilities')
      this.validateField('company')
      this.validateField('education_level')
      this.validateField('experience_level')
      this.validateField('job_level')
      
        
      if (this.job.skills.length < 3) {
    this.errors.skills = 'At least 3 skills are required'
  } else {
    this.errors.skills = ''
  }

  // Check if any errors exist
  const hasErrorMessages = Object.values(this.errors).some(error => error !== '')
  
  // Check required fields
  const requiredFieldsValid = this.job.title && 
    this.job.type && 
    this.job.category_id && 
    this.job.location && 
    this.job.description && 
    this.job.responsibilities && 
    this.job.company && 
    this.job.education_level && 
    this.job.experience_level && 
    this.job.job_level &&
    this.job.skills.length >= 3

  return hasErrorMessages || !requiredFieldsValid

    }
  },
  methods: {
    toggleSection(section) {
      this.expandedSections[section] = !this.expandedSections[section]
    },
    validateField(field) {
      const value = this.job[field]
      
      // Common required fields validation
      if (['title', 'location', 'description', 'responsibilities', 'company'].includes(field)) {
        this.errors[field] = value.trim() ? '' : `${this.formatFieldName(field)} is required`
      } 
      // Select fields validation
      else if (['type', 'category_id', 'education_level', 'experience_level', 'job_level'].includes(field)) {
        this.errors[field] = value ? '' : `${this.formatFieldName(field)} is required`
      }
      // Description length validation
      else if (field === 'description' && value.length < 100) {
        this.errors[field] = 'Description must be at least 100 characters'
      }
      // Responsibilities length validation
      else if (field === 'responsibilities' && value.length < 50) {
        this.errors[field] = 'Responsibilities must be at least 50 characters'
      }
    },
    formatFieldName(field) {
      const names = {
        category_id: 'Category',
        education_level: 'Education Level',
        experience_level: 'Experience Level',
        job_level: 'Job Level'
      }
      return names[field] || field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')
    },

    validateForm() {
      let isValid = true
      
      // Validate required fields
      const requiredFields = [
        'title', 'type', 'category_id', 'location', 
        'description', 'responsibilities', 'company',
        'education_level', 'experience_level', 'job_level'
      ]
      
      requiredFields.forEach(field => {
        this.validateField(field)
        if (!this.job[field] || this.errors[field]) {
          isValid = false
        }
      })
      
      // Validate skills
      if (this.job.skills.length < 3) {
        this.errors.skills = 'At least 3 skills are required'
        isValid = false
      } else {
        this.errors.skills = ''
      }
      
      return isValid
    },
    addSkill() {
      const skill = this.skillInput.trim()
      if (skill && !this.job.skills.includes(skill)) {
        this.job.skills.push(skill)
        this.skillInput = ''
        this.errors.skills = ''
      }
    },
    removeSkill(index) {
      this.job.skills.splice(index, 1)
      if (this.job.skills.length < 3) {
        this.errors.skills = 'At least 3 skills are required'
      }
    },
    addKeywords() {
      if (this.keywordInput) {
        const newKeywords = this.keywordInput.split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0)
        
        const allKeywords = [...new Set([...this.job.tags, ...newKeywords])]
        this.job.tags = allKeywords
        this.keywordInput = ''
      }
    },
    removeTag(index) {
      this.job.tags.splice(index, 1)
    },
    async submitJob() {
  this.formSubmitted = true;
  
  if (!this.validateForm()) {
    this.showAlert('Please fix the validation errors before submitting.', 'error');
    return;
  }

  this.isLoading = true;

  try {
    const response = await axios.post('http://localhost:8000/api/jobs', {
      // Only send fields that exist in your database
      title: this.job.title,
      type: this.job.type,
      category_id: this.job.category_id,
      location: this.job.location,
      salary_type: this.job.salary_type,
      min_salary: this.job.min_salary,
      max_salary: this.job.max_salary,
      description: this.job.description,
      responsibilities: this.job.responsibilities,
      company: this.job.company,
      education_level: this.job.education_level,
      experience_level: this.job.experience_level,
      job_level: this.job.job_level,
      skills: this.job.skills,
      tags: this.job.tags,
      status: 'pending'
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    });

    this.showAlert('Job posted successfully!', 'success');
    this.resetForm();
    this.$router.push('/employer/dashboard/jobs');
    
  } catch (error) {
    let errorMessage = 'Failed to post job';
    if (error.response) {
      // More detailed error handling
      if (error.response.data.errors) {
        errorMessage = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }
    this.showAlert(errorMessage, 'error');
    console.error('Full error details:', error.response || error);
  } finally {
    this.isLoading = false;
  }
},
resetForm() {
  this.job = {
    title: '',
    type: '',
    category_id: '',
    location: '',
    salary_type: 'range',
    min_salary: null,
    max_salary: null,
    education_level: '',
    experience_level: '',
    job_level: '',
    description: '',
    responsibilities: '',
    company: '',
    skills: [],
    tags: []
  };
  this.skillInput = ''
  this.keywordInput = ''
  this.errors = {
    title: '',
    type: '',
    category_id: '',
    location: '',
    description: '',
    responsibilities: '',
    education_level: '',
    experience_level: '',
    job_level: '',
    company: '',
    skills: ''
  }
},
    showAlert(message, type) {
      // Replace with your preferred alert/notification system
      alert(`${type.toUpperCase()}: ${message}`)
    }
  }
}
</script>


<style scoped>
/* Your existing styles remain unchanged with small additions for tags */
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

.tag-badge {
  background: #3a0ca3;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 0.6rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.tag-remove:hover {
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