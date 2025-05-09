<template>
    <div v-if="jobData" class="job-details-container animate-fade-in">
      <div class="details-header">
        <div class="banner-container">
          <img v-if="jobData.banner" :src="jobData.company.banner" alt="Company Banner" class="banner-img fade-in">
          <div v-else class="default-banner fade-in"></div>
          <div class="company-logo-container slide-in-left">
            <img v-if="jobData.logo" :src="jobData.logo" alt="Company Logo" class="company-logo">
            <div v-else class="default-logo">{{ getCompanyInitials(jobData.company.name) }}</div>
          </div>
        </div>
  
        <div class="details-info">
          <h1 class="slide-in-right">{{ jobData.title }}</h1>
          <p class="industry fade-in-delay">{{ jobData.company.name }}</p>
          <div class="meta-info fade-in">
            <span><i class="fas fa-map-marker-alt"></i> {{ jobData.location }}</span>
            <span><i class="fas fa-money-bill-wave"></i> {{ jobData.salary }}</span>
            <span><i class="fas fa-briefcase"></i> {{ jobData.type }}</span>
            <span><i class="fas fa-calendar-alt"></i> Posted {{ formatDate(jobData.postedDate) }}</span>
          </div>
        </div>
      </div>
  
      <div class="details-content fade-in">
        <div class="left-column">
          <section class="fade-in-delay">
            <h2>Job Description</h2>
            <p>{{ jobData.description }}</p>
          </section>
  
          <section class="fade-in-delay">
            <h2>Responsibilities</h2>
            <ul>
              <li v-for="(responsibility, index) in jobData.responsibilities" :key="index">{{ responsibility }}</li>
            </ul>
          </section>
  
          <section class="fade-in-delay">
            <h2>Required Skills</h2>
            <ul>
              <li v-for="(skill, index) in jobData.skills" :key="index">{{ skill }}</li>
            </ul>
          </section>

          <section class="hiring-section slide-up">
            <h2>Hiring Information</h2>
            <div class="hiring-card">
                <h2>Ready to Apply?</h2>
              <router-link to="/post-job" class="post-job-btn bounce-btn">Apply Now</router-link>
            </div>
          </section>


          
        </div>
  
        <div class="right-column">
          <section class="details-section fade-in-delay">
            <h2>Job Details</h2>
            <div class="detail-item">
              <h3>Job Type</h3>
              <p>{{ jobData.type }}</p>
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
              <p>{{ formatDate(jobData.postedDate) }}</p>
            </div>
          </section>
  
          <section class="contact-section fade-in-delay">
            <h2>Contact Information</h2>
            <div class="contact-item">
              <i class="fas fa-envelope p-3"></i>
              <a :href="`mailto:${jobData.contact.email}`">{{ jobData.contact.email }}</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone p-3"></i>
              <a :href="`tel:${jobData.contact.phone}`">{{ jobData.contact.phone }}</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  
    <div v-else-if="loading" class="loading">
      <p>Loading job details...</p>
    </div>
    <div v-else class="error">
      <p>Error loading job details.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const jobData = ref(null);
  const loading = ref(true);
  
  const loadJobData = async () => {
    try {
      const jobId = route.params.id;
      const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
      if (!response.ok) throw new Error('Failed to fetch job details');
      jobData.value = await response.json();
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
  
  onMounted(() => {
    loadJobData();
  });
  </script>
  
  <style scoped>
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