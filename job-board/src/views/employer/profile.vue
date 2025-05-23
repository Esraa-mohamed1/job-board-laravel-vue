<template>
  <div v-if="profileData" class="employer-profile-container animate-fade-in">
    <div class="profile-header">
      <div class="banner-container">
        <img v-if="profileData.banner" :src="`/storage/images/${profileData.banner}`" alt="Company Banner" class="banner-img fade-in">
        <div v-else class="default-banner fade-in"></div>
        <router-link to="/employer/dashboard/settings" class="edit-profile-btn">
          <i class="fas fa-pencil-alt"></i> Edit Profile
        </router-link>
        <div class="company-logo-container slide-in-left">
          <img v-if="profileData.logo" :src="`/storage/images/${profileData.logo}`" alt="Company Logo" class="company-logo">
          <div v-else class="default-logo">{{ getCompanyInitials(profileData.company_name) }}</div>
        </div>
      </div>

      <div class="profile-info">
        <h1 class="slide-in-right">{{ profileData.company_name }}</h1>
        <p class="industry fade-in-delay">{{ formatIndustryType(profileData.industry_type) }}</p>
        <div class="meta-info fade-in">
          <span><i class="fas fa-map-marker-alt"></i> {{ profileData.city }}, {{ profileData.country }}</span>
          <span><i class="fas fa-users"></i> {{ profileData.team_size }} employees</span>
          <span><i class="fas fa-calendar-alt"></i> Established {{ formatDate(profileData.establishment_year) }}</span>
        </div>
      </div>
    </div>

    <div class="profile-content fade-in">
      <div class="left-column">
        <section class="about-section fade-in-delay">
          <h2>About Our Company</h2>
          <p>{{ profileData.about || 'No description provided' }}</p>
        </section>

        <section class="vision-section fade-in-delay">
          <h2>Our Vision</h2>
          <p>{{ profileData.company_vision || 'No vision statement provided' }}</p>
        </section>

        <section class="hiring-section slide-up">
          <h2>Hiring Information</h2>
          <div class="hiring-card">
            <h3>We're Hiring!</h3>
            <p>Looking for talented professionals to join our team.</p>
            <router-link to="/employer/dashboard/post" class="post-job-btn bounce-btn">Post a Job</router-link>
          </div>
        </section>
      </div>

      <div class="right-column">
        <section class="details-section fade-in-delay">
          <h2>Company Details</h2>
          <div class="detail-item">
            <h3>Organization Type</h3>
            <p>{{ formatOrganizationType(profileData.organization_type) }}</p>
          </div>
          <div class="detail-item">
            <h3>Industry</h3>
            <p>{{ formatIndustryType(profileData.industry_type) }}</p>
          </div>
          <div class="detail-item">
            <h3>Team Size</h3>
            <p>{{ profileData.team_size }}</p>
          </div>
          <div class="detail-item">
            <h3>Established</h3>
            <p>{{ formatDate(profileData.establishment_year) }}</p>
          </div>
        </section>

        <section class="contact-section fade-in-delay">
          <h2>Contact Information</h2>
          <div class="contact-item">
            <i class="fas fa-globe"></i>
            <a v-if="profileData.company_website" :href="ensureHttp(profileData.company_website)" target="_blank">Company Website</a>
            <span v-else>Not provided</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <a v-if="profileData.company_email" :href="`mailto:${profileData.company_email}`">
              {{ profileData.company_email }}
            </a>
            <span v-else>Not provided</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <a v-if="profileData.company_phone" :href="`tel:${formatPhone(profileData.company_phone)}`">
              {{ formatPhone(profileData.company_phone) }}
            </a>
            <span v-else>Not provided</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ formatAddress(profileData.company_address) }}</span>
          </div>
        </section>

        <section class="social-section fade-in">
          <h2>Connect With Us</h2>
          <div class="social-links">
            <a v-for="(link, index) in socialLinks" 
              :key="index" 
              :href="link.url" 
              target="_blank"
              class="social-icon slide-in-bottom">
              <i :class="getSocialIcon(link.platform)"></i>
            </a>
            <div v-if="socialLinks && socialLinks.length === 0" class="no-social">
              No social links provided
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading">
    <p>Loading profile...</p>
  </div>
  <div v-else class="error">
    <p>Error loading profile data.</p>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const profileData = ref(null)
const loading = ref(true)
const error = ref(null)
const getSocialIcon = (platform) => {
  const icons = {
    linkedin: 'fab fa-linkedin',
    facebook: 'fab fa-facebook-f',
    twitter: 'fab fa-twitter',
  }
  return icons[platform] || 'fas fa-globe'
}
const formatPhone = (phone) => {
  if (!phone) return 'Not specified'
  return phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}
const fetchCompanyProfile = async () => {
  try {
    const authToken = localStorage.getItem('authToken')
    
    if (!authToken) {
      router.push('/login')
      return
    }

    const response = await axios.get('http://localhost:8000/api/companies/profile', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    })
    console.log('Profile Data:', response.data.data)
    if (response.data.success) {
      profileData.value = response.data.data
    } else {
      error.value = response.data.message || 'Failed to load profile'
    }
  } catch (err) {
    console.error('Error fetching company profile:', err)
    error.value = err.response?.data?.message || 'Failed to load profile'
    
    if (err.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const socialLinks = computed(() => {
  if (!profileData.value) return []
  
  const links = []
  if (profileData.value.linkedIn) links.push({ platform: 'linkedin', url: profileData.value.linkedIn })
  if (profileData.value.facebook) links.push({ platform: 'facebook', url: profileData.value.facebook })
  if (profileData.value.twitter) links.push({ platform: 'twitter', url: profileData.value.twitter })
  
  return links
})

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getCompanyInitials = (name) => {
  if (!name) return 'CO'
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}

const ensureHttp = (url) => {
  if (!url) return '#'
  return url.startsWith('http') ? url : `https://${url}`
}


const formatIndustryType = (type) => {
  if (!type) return 'Not specified'
  const types = {
    'tech': 'Technology',
    'finance': 'Finance',
    'health': 'Healthcare',
  }
  return types[type] || type
}

const formatOrganizationType = (type) => {
  if (!type) return 'Not specified'
  const types = {
    'private': 'Private Company',
    'public': 'Public Company',
    'ngo': 'Non-Governmental Organization',
  }
  return types[type] || type
}
const formatAddress = () => {
  if (!profileData.value) return 'Not specified';
  
  let address = '';
  if (profileData.value.company_address) {
    address += profileData.value.company_address;
  }
  if (profileData.value.city) {
    address += (address ? ', ' : '') + profileData.value.city;
  }
  if (profileData.value.country) {
    address += (address ? ', ' : '') + profileData.value.country;
  }
  
  return address || 'Not specified';
}
onMounted(() => {
  fetchCompanyProfile()
})
</script>

  
  <style scoped>
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
.slide-in-left {
  animation: slideInLeft 0.6s ease-out both;
}
.slide-in-right {
  animation: slideInRight 0.6s ease-out both;
}
.slide-up {
  animation: slideUp 0.6s ease-out both;
}
.slide-in-bottom {
  animation: slideInBottom 0.6s ease-out both;
}
  </style>