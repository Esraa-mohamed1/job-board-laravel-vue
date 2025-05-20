<template>
  <div>
    <div v-if="jobData" class="job-details-container animate-fade-in">
      <div class="details-header">
        <div class="banner-container">
          <img v-if="jobData.company_banner" :src="jobData.company_banner" alt="Company Banner" class="banner-img fade-in">
          <div v-else class="default-banner fade-in"></div>
          <div class="company-logo-container slide-in-left">
            <img v-if="jobData.company_logo" :src="jobData.company_logo" alt="Company Logo" class="company-logo">
            <div v-else class="default-logo">{{ getCompanyInitials(jobData.company || jobData.company_name) }}</div>
          </div>
        </div>
        <div class="details-info">
          <h1 class="slide-in-right">{{ jobData.title }}</h1>
          <p class="industry fade-in-delay">{{ jobData.company || jobData.company_name }}</p>
          <div class="meta-info fade-in">
            <span><i class="fas fa-map-marker-alt"></i> {{ jobData.location }}</span>
            <span><i class="fas fa-money-bill-wave"></i> {{ jobData.salary }}</span>
            <span><i class="fas fa-briefcase"></i> {{ jobData.job_type }}</span>
            <span><i class="fas fa-calendar-alt"></i> Posted {{ formatDate(jobData.created_at) }}</span>
          </div>
        </div>
      </div>

      <div class="details-content fade-in">
        <div class="left-column">
          <section class="fade-in-delay">
            <h2>Job Description</h2>
            <p>{{ jobData.description }}</p>
          </section>

          <section v-if="jobData.responsibilities" class="fade-in-delay">
            <h2>Responsibilities</h2>
            <ul>
              <li v-for="(responsibility, index) in jobData.responsibilities" :key="index">{{ responsibility }}</li>
            </ul>
          </section>

          <section v-if="jobData.skills" class="fade-in-delay">
            <h2>Required Skills</h2>
            <ul>
              <li v-for="(skill, index) in jobData.skills" :key="index">{{ skill }}</li>
            </ul>
          </section>

          <section class="hiring-section slide-up">
            <h2>Hiring Information</h2>
            <div class="hiring-card">
              <h2>Ready to Apply?</h2>
              <button class="post-job-btn bounce-btn" @click="showApplyModal = true">
                Apply Now
              </button>
            </div>
          </section>
        </div>

        <div class="right-column">
          <section class="details-section fade-in-delay">
            <h2>Job Details</h2>
            <div class="detail-item">
              <h3>Job Type</h3>
              <p>{{ jobData.job_type }}</p>
            </div>
            <div class="detail-item">
              <h3>Location</h3>
              <p>{{ jobData.location }}</p>
            </div>
            <div class="detail-item">
              <h3>Salary</h3>
              <p>{{ jobData.salary }}</p>
            </div>
            <div class="detail-item">
              <h3>Posted</h3>
              <p>{{ formatDate(jobData.created_at) }}</p>
            </div>
          </section>

          <section v-if="jobData.contact_email || jobData.contact_phone" class="contact-section fade-in-delay">
            <h2>Contact Information</h2>
            <div class="contact-item" v-if="jobData.contact_email">
              <i class="fas fa-envelope p-3"></i>
              <a :href="`mailto:${jobData.contact_email}`">{{ jobData.contact_email }}</a>
            </div>
            <div class="contact-item" v-if="jobData.contact_phone">
              <i class="fas fa-phone p-3"></i>
              <a :href="`tel:${jobData.contact_phone}`">{{ jobData.contact_phone }}</a>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Apply Job Modal -->
    <div v-if="showApplyModal" class="modal-overlay" @click.self="closeModal">
      <div class="apply-modal">
        <button class="close-btn" @click="closeModal">&times;</button>
        <h2 class="modal-title">Apply Job: {{ jobData.title }}</h2>
        <form @submit.prevent="submitApplication" class="apply-form">
          <label class="form-label mt-3">Choose Resume</label>
          <select v-model="selectedResume" class="form-select" required>
            <option value="" disabled>Select...</option>
            <option v-for="resume in resumes" :key="resume.id" :value="resume.path">
              {{ resume.name }}
            </option>
          </select>
          <label class="form-label mt-4">Cover Letter</label>
          <textarea
            class="form-control cover-letter-input"
            rows="6"
            v-model="coverLetter"
            placeholder="Write down your biography here. Let the employers know who you are..."
            required
          ></textarea>
          <div class="modal-actions">
            <button class="btn btn-light cancel-btn" type="button" @click="closeModal">Cancel</button>
            <button class="btn btn-primary apply-btn" type="submit" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
              <span v-else>Apply Now</span>
            </button>
          </div>
          <div v-if="errorMsg" class="alert alert-danger mt-2">{{ errorMsg }}</div>
          <div v-if="successMsg" class="alert alert-success mt-2">{{ successMsg }}</div>
        </form>
      </div>
    </div>

  <div v-if="showApplyModal" class="modal-overlay" @click.self="closeModal">
    <div class="apply-modal">
      <button class="close-btn" @click="closeModal">&times;</button>
      <h2 class="modal-title">Apply Job: {{ jobData.title }}</h2>
      <form @submit.prevent="submitApplication" class="apply-form">
        <label class="form-label mt-3">Choose Resume</label>
        <select v-model="selectedResume" class="form-select" required>
          <option value="" disabled>Select...</option>
          <option v-for="resume in resumes" :key="resume.id" :value="resume.path">
            {{ resume.name }}
          </option>
        </select>
        <label class="form-label mt-4">Cover Letter</label>
        <textarea
          class="form-control cover-letter-input"
          rows="6"
          v-model="coverLetter"
          placeholder="Write down your biography here. Let the employers know who you are..."
          required
        ></textarea>
        <div class="modal-actions">
          <button class="btn btn-light cancel-btn" type="button" @click="closeModal">Cancel</button>
          <button class="btn btn-primary apply-btn" type="submit" :disabled="submitting">
            <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
            <span v-else>Apply Now</span>
          </button>
        </div>
        <div v-if="errorMsg" class="alert alert-danger mt-2">{{ errorMsg }}</div>
        <div v-if="successMsg" class="alert alert-success mt-2">{{ successMsg }}</div>
      </form>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const jobData = ref(null);
const loading = ref(true);

const showApplyModal = ref(false);
const resumes = ref([]);
const selectedResume = ref('');
const coverLetter = ref('');
const submitting = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const loadResumes = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch('http://localhost:8000/api/user/resumes', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch resumes');
    const data = await response.json();
    resumes.value = Array.isArray(data) ? data : (data.data || []);
  } catch (err) {
    resumes.value = [];
  }
};
const loadJobData = async () => {
  try {
    const jobId = route.params.id;
    const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch job details');
    jobData.value = await response.json();
    await loadResumes();
  } catch (err) {
    console.error('Error loading job details:', err.message);
  } finally {
    loading.value = false;
  }
};

const getCompanyInitials = (name) => {
  if (!name) return 'CO';
  return name.split(' ').map((part) => part.charAt(0)).join('').toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const closeModal = () => {
  showApplyModal.value = false;
  selectedResume.value = '';
  coverLetter.value = '';
  errorMsg.value = '';
  successMsg.value = '';
};

const submitApplication = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  submitting.value = true;
      const token = localStorage.getItem('authToken')

  try {
    const jobId = jobData.value.id;
    const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        cover_letter: coverLetter.value,
        resume_path: selectedResume.value
      })
    });

    if (response.status === 409) {
      const data = await response.json();
      errorMsg.value = data.message || "You have already applied for this job.";
      submitting.value = false;
      return;
    }
    if (!response.ok) {
      const data = await response.json();
      errorMsg.value = data.message || "Failed to apply for job.";
      submitting.value = false;
      return;
    }
    successMsg.value = "Application submitted successfully.";
    setTimeout(closeModal, 1200);
  } catch (err) {
    errorMsg.value = "Failed to submit application.";
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  loadJobData();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.apply-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 96vw;
  padding: 2rem 2rem 1.5rem 2rem;
  position: relative;
  box-shadow: 0 8px 32px rgba(44,62,80,0.25);
  animation: fadeIn .22s;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;}}
.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color .2s;
}
.close-btn:hover { color: #333; }
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}
.apply-form label {
  font-weight: 500;
  margin-bottom: .4rem;
  display: block;
}
.form-select {
  width: 100%;
  padding: .5rem;
  border-radius: 6px;
  border: 1px solid #d5dae2;
  margin-bottom: 0.5rem;
}
.cover-letter-input {
  width: 100%;
  min-height: 120px;
  border-radius: 6px;
  border: 1px solid #d5dae2;
  padding: .8rem;
  font-size: 1rem;
  margin-bottom: 0.7rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.4rem;
}
.cancel-btn {
  background: #f5f6fa;
  color: #4a6baf;
  border: 1px solid #e3e6f0;
}
.cancel-btn:hover {
  background: #f0f2f9;
  color: #2c3e50;
}
.apply-btn {
  background: #1671fa;
  color: #fff;
  border: none;
  min-width: 120px;
}
.apply-btn:hover {  
  background: #105fc6;
}
  .modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.apply-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 96vw;
  padding: 2rem 2rem 1.5rem 2rem;
  position: relative;
  box-shadow: 0 8px 32px rgba(44,62,80,0.25);
  animation: fadeIn .22s;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;}}
.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color .2s;
}
.close-btn:hover { color: #333; }
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}
.apply-form label {
  font-weight: 500;
  margin-bottom: .4rem;
  display: block;
}
.form-select {
  width: 100%;
  padding: .5rem;
  border-radius: 6px;
  border: 1px solid #d5dae2;
  margin-bottom: 0.5rem;
}
.cover-letter-input {
  width: 100%;
  min-height: 120px;
  border-radius: 6px;
  border: 1px solid #d5dae2;
  padding: .8rem;
  font-size: 1rem;
  margin-bottom: 0.7rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.4rem;
}
.cancel-btn {
  background: #f5f6fa;
  color: #4a6baf;
  border: 1px solid #e3e6f0;
}
.cancel-btn:hover {
  background: #f0f2f9;
  color: #2c3e50;
}
.apply-btn {
  background: #1671fa;
  color: #fff;
  border: none;
  min-width: 120px;
}
.apply-btn:hover {  
  background: #105fc6;
}
  .job-details-container {
    max-width: 1200px;
    margin: 2rem auto;
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .details-header {
    position: relative;
    margin-bottom: 80px;
  }
  
  .banner-container {
    height: 250px;
    background: linear-gradient(135deg, #4a6baf 0%, #2c3e50 100%);
    position: relative;
  }
  
  .company-logo-container {
    position: absolute;
    bottom: -50px;
    left: 40px;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 4px solid white;
  }
  
  .company-logo {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
  }
  
  .default-logo {
    font-size: 2.5rem;
    font-weight: bold;
    color: #4a6baf;
  }
  
  .details-info {
    padding: 0 40px 20px;
    margin-top: 70px;
  }
  
  .details-info h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #222;
  }
  
  .industry {
    font-size: 1.1rem;
    color: #4a6baf;
    margin-bottom: 1rem;
  }
  
  .meta-info {
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 0.9rem;
  }
  
  .meta-info i {
    margin-right: 5px;
    color: #4a6baf;
  }
  
  .details-content {
    display: flex;
    padding: 0 40px 40px;
    gap: 30px;
  }
  
  .left-column {
    flex: 2;
  }
  
  .right-column {
    flex: 1;
  }
  
  section {
    margin-bottom: 30px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  .employer-profile-container {
    max-width: 1200px;
    margin: 2rem auto;
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .profile-header {
    position: relative;
    margin-bottom: 80px;
  }
  
  .banner-container {
    height: 250px;
    background: linear-gradient(135deg, #4a6baf 0%, #2c3e50 100%);
    position: relative;
  }
  .edit-profile-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  color: #4a6baf;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 10;
}

.edit-profile-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.edit-profile-btn i {
  font-size: 0.9rem;
}
  .default-banner {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4a6baf 0%, #2c3e50 100%);
  }
  
  .company-logo-container {
    position: absolute;
    bottom: -50px;
    left: 40px;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 4px solid white;
  }
  
  .company-logo {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
  }
  
  .default-logo {
    font-size: 2.5rem;
    font-weight: bold;
    color: #4a6baf;
  }
  
  .profile-info {
    padding: 0 40px 20px;
    margin-top: 70px;
    }
  
  .profile-info h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #222;
  }
  
  .industry {
    font-size: 1.1rem;
    color: #4a6baf;
    margin-bottom: 1rem;
  }
  
  .meta-info {
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 0.9rem;
  }
  
  .meta-info i {
    margin-right: 5px;
    color: #4a6baf;
  }
  
  .profile-content {
    display: flex;
    padding: 0 40px 40px;
    gap: 30px;
  }
  
  .left-column {
    flex: 2;
  }
  
  .right-column {
    flex: 1;
  }
  
  section {
    margin-bottom: 30px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .about-section p, .vision-section p {
    line-height: 1.6;
    color: #555;
  }
  
  .hiring-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border-left: 4px solid #4a6baf;
  }
  
  .hiring-card h3 {
    color: #4a6baf;
    margin-bottom: 0.5rem;
  }
  
  .post-job-btn {
    display: inline-block;
    background: #4a6baf;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    margin-top: 10px;
    transition: background 0.3s;
  }
  
  .post-job-btn:hover {
    background: #3a5a9f;
  }
  
  .detail-item {
    margin-bottom: 15px;
  }
  
  .detail-item h3 {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 0.3rem;
  }
  
  .detail-item p {
    font-size: 1rem;
    color: #333;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .contact-item i {
    width: 24px;
    color: #4a6baf;
    margin-right: 10px;
  }
  
  .contact-item a {
    color: #4a6baf;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .contact-item a:hover {
    text-decoration: underline;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #f0f0f0;
    border-radius: 50%;
    color: #555;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background: #4a6baf;
    color: white;
  }
  
  .no-social {
    color: #777;
    font-style: italic;
  }
  
  .loading, .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
  }
  
  .loading {
    color: #666;
  }
  
  .error {
    color: #e74c3c;
  }
  
  @media (max-width: 768px) {
    .profile-content {
      flex-direction: column;
      padding: 0 20px 20px;
    }
    
    .profile-info {
      padding: 0 20px 20px;
    
    }
    
    .company-logo-container {
      left: 20px;
      width: 100px;
      height: 100px;
      bottom: -40px;
    }
    
    .meta-info {
      flex-direction: column;
      gap: 8px;
    }
  }
  @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInLeft {
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slideInRight {
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes slideInBottom {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.bounce-btn {
  animation: bounceBtn 0.8s ease infinite alternate;
}
@keyframes bounceBtn {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out both;
}
.fade-in {
  animation: fadeIn 0.6s ease-in-out both;
}
.fade-in-delay {
  animation: fadeIn 0.6s ease-in-out both;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

  
  .apply-btn {
    display: inline-block;
    background: #4a6baf;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    margin-top: 10px;
    transition: background 0.3s;
  }
  
  .apply-btn:hover {
    background: #3a5a9f;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.6s ease-in-out both;
  }
  
  </style>