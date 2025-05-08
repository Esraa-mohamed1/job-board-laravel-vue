<template>
    <div v-if="profileData" class="employer-profile-container animate-fade-in">
      <!-- Header Section with Banner -->
      <div class="profile-header">
        <div class="banner-container">
          <img v-if="profileData.companyInfo.banner" :src="profileData.companyInfo.banner" alt="Company Banner" class="banner-img fade-in">
          <div v-else class="default-banner fade-in"></div>
          <button class="edit-profile-btn" @click="editProfile">
          <i class="fas fa-pencil-alt"></i> Edit Profile
          </button>
          <div class="company-logo-container slide-in-left">
            <img v-if="profileData.companyInfo.logo" :src="profileData.companyInfo.logo" alt="Company Logo" class="company-logo">
            <div v-else class="default-logo">{{ getCompanyInitials(profileData.companyInfo.name || profileData.companyName) }}</div>
          </div>
        </div>

        <div class="profile-info">
          <h1 class="slide-in-right">{{ profileData.companyInfo.name || profileData.companyName }}</h1>
          <p class="industry fade-in-delay">{{ formatIndustryType(profileData.foundingInfo.industryType) }}</p>
          <div class="meta-info fade-in">
            <span><i class="fas fa-map-marker-alt"></i> {{ profileData.contactInfo.contactInfo.address.city }}, {{ profileData.contactInfo.contactInfo.address.country }}</span>
            <span><i class="fas fa-users"></i> {{ profileData.foundingInfo.teamSize }} employees</span>
            <span><i class="fas fa-calendar-alt"></i> Established {{ formatDate(profileData.foundingInfo.establishmentYear) }}</span>
          </div>
        </div>
      </div>

      <div class="profile-content fade-in">
        <div class="left-column">
          <!-- About Company -->
          <section class="about-section fade-in-delay">
            <h2>About Our Company</h2>
            <p>{{ profileData.companyInfo.about || 'No description provided' }}</p>
          </section>

          <section class="vision-section fade-in-delay">
            <h2>Our Vision</h2>
            <p>{{ profileData.foundingInfo.companyVision || 'No vision statement provided' }}</p>
          </section>

          <!-- Hiring Section -->
          <section class="hiring-section slide-up">
            <h2>Hiring Information</h2>
            <div class="hiring-card">
              <h3>We're Hiring!</h3>
              <p>Looking for talented professionals to join our team.</p>
              <router-link to="/post-job" class="post-job-btn bounce-btn">Post a Job</router-link>
            </div>
          </section>
        </div>

        <div class="right-column">
          <!-- Company Details -->
          <section class="details-section fade-in-delay">
            <h2>Company Details</h2>
            <div class="detail-item">
              <h3>Organization Type</h3>
              <p>{{ formatOrganizationType(profileData.foundingInfo.organizationType) }}</p>
            </div>
            <div class="detail-item">
              <h3>Industry</h3>
              <p>{{ formatIndustryType(profileData.foundingInfo.industryType) }}</p>
            </div>
            <div class="detail-item">
              <h3>Team Size</h3>
              <p>{{ profileData.foundingInfo.teamSize }}</p>
            </div>
            <div class="detail-item">
              <h3>Established</h3>
              <p>{{ formatDate(profileData.foundingInfo.establishmentYear) }}</p>
            </div>
          </section>

          <!-- Contact Information -->
          <section class="contact-section fade-in-delay">
            <h2>Contact Information</h2>
            <div class="contact-item">
              <i class="fas fa-globe"></i>
              <a v-if="profileData.foundingInfo.companyWebsite" :href="ensureHttp(profileData.foundingInfo.companyWebsite)" target="_blank">Company Website</a>
              <span v-else>Not provided</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a :href="`mailto:${profileData.email}`">{{ profileData.email }}</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a :href="`tel:${profileData.contactInfo.contactInfo.phone}`">{{ profileData.contactInfo.contactInfo.phone }}</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ formatAddress(profileData.contactInfo.contactInfo.address) }}</span>
            </div>
          </section>

          <!-- Social Media -->
          <section class="social-section fade-in">
            <h2>Connect With Us</h2>
            <div class="social-links">
              <a v-for="(link, index) in uniqueSocialLinks" 
                 :key="index" 
                 :href="link.url" 
                 target="_blank"
                 class="social-icon slide-in-bottom">
                <i :class="getSocialIcon(link.platform)"></i>
              </a>
              <div v-if="!profileData.socialMedia.socialLinks.length" class="no-social">
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

const route = useRoute()
const router = useRouter()
const profileData = ref(null)
const loading = ref(true)
const error = ref(null)

const uniqueSocialLinks = computed(() => {
  if (!profileData.value?.socialMedia?.socialLinks) return []
  const unique = []
  const platforms = new Set()
  profileData.value.socialMedia.socialLinks.forEach(link => {
    if (!platforms.has(link.platform.toLowerCase())) {
      platforms.add(link.platform.toLowerCase())
      unique.push(link)
    }
  })
  return unique
})

const getCompanyInitials = (name) => {
  if (!name) return 'CO'
  return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase()
}

const getSocialIcon = (platform) => {
  const icons = {
    facebook: 'fab fa-facebook-f',
    twitter: 'fab fa-twitter',
    instagram: 'fab fa-instagram',
    linkedin: 'fab fa-linkedin-in',
    github: 'fab fa-github'
  }
  return icons[platform.toLowerCase()] || 'fas fa-link'
}

const formatIndustryType = (industry) => {
  if (!industry) return 'Not specified'
  return industry.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

const formatOrganizationType = (type) => {
  if (!type) return 'Not specified'
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const editProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (!user || user.role !== 'employer') {
      throw new Error('You do not have permission to edit this profile')
    }

    if (!profileData.value) {
      await loadProfileData()
      if (!profileData.value) throw new Error('Profile data could not be loaded')
    }

    const prepared = {
      ...profileData.value,
      foundingInfo: {
        ...profileData.value.foundingInfo,
        establishmentYear: profileData.value.foundingInfo?.establishmentYear
          ? new Date(profileData.value.foundingInfo.establishmentYear).toISOString().split('T')[0]
          : ''
      },
      socialMedia: {
        socialLinks: profileData.value.socialMedia?.socialLinks || []
      }
    }

    localStorage.setItem('editProfileData', JSON.stringify(prepared))

    await router.push({ name: 'EmployerProfile', params: { id: user.id }, query: { edit: true } })

  } catch (err) {
    handleEditError(err)
  }
}

const loadProfileData = async () => {
  try {
    const employerId = route.params.id || JSON.parse(localStorage.getItem('userData')).id
    const response = await fetch(`http://localhost:3000/employers/${employerId}`)
    if (!response.ok) throw new Error('Failed to fetch profile data')
    profileData.value = await response.json()
  } catch (err) {
    console.error('Error loading profile:', err)
    throw err
  }
}

const handleEditError = (err) => {
  alert(`Edit Error: ${err.message}`)
  router.push({ name: 'EditEmployerProfile', query: { error: err.message } })
}

const formatAddress = (address) => {
  if (!address) return 'Not specified'
  const { street, city, country } = address
  return [street, city, country].filter(Boolean).join(', ')
}

const ensureHttp = (url) => {
  if (!url) return '#'
  return url.startsWith('http') ? url : `https://${url}`
}

onMounted(async () => {
  try {
    await loadProfileData()

    if (route.params.updated) {
      alert('Profile Updated Successfully')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

  
  <style scoped>
  /* Same CSS as in the previous example */
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