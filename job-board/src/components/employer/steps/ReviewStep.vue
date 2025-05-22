<template>
  <div class="review-container">
    <h2 class="glowing-title">Review Your Submission</h2>
    
    <div class="review-card">
      <!-- Basic Info Section -->
      <div class="section-wrapper" data-aos="fade-up">
        <h3 class="section-title neon-underline">Basic Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Company Name:</span>
            <span class="info-value">{{ formData.companyInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">About:</span>
            <span class="info-value">{{ formData.companyInfo.about || 'Not provided' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Company Details Section -->
      <div class="section-wrapper" data-aos="fade-up" data-aos-delay="100">
        <h3 class="section-title neon-underline">Company Details</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Industry:</span>
            <span class="info-value">{{ formData.foundingInfo.industryType }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Team Size:</span>
            <span class="info-value">{{ formData.foundingInfo.teamSize }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Website:</span>
            <span class="info-value">{{ formData.foundingInfo.website || 'Not provided' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Social Media:</span>
            <div class="info-value social-links">
              <template v-if="hasSocialMedia">
                <a v-if="formData.socialMedia.linkedin" :href="formData.socialMedia.linkedin" target="_blank" class="social-link linkedin">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a v-if="formData.socialMedia.facebook" :href="formData.socialMedia.facebook" target="_blank" class="social-link facebook">
                  <i class="fab fa-facebook"></i>
                </a>
                <a v-if="formData.socialMedia.twitter" :href="formData.socialMedia.twitter" target="_blank" class="social-link twitter">
                  <i class="fab fa-twitter"></i>
                </a>
              </template>
              <span v-else>Not provided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="action-buttons">
      <button @click="$emit('prev')" class="btn back-btn">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <button @click="submit" class="btn submit-btn">
        Confirm <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['formData'])
const emit = defineEmits(['prev', 'submit'])

const hasSocialMedia = computed(() => {
  return props.formData.socialMedia.linkedin || 
         props.formData.socialMedia.facebook || 
         props.formData.socialMedia.twitter;
});

const submit = () => {
  emit('submit')
}

// Initialize animation on mount
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  --dark-bg: #0f172a;
  --card-bg: #1e293b;
  --accent-color: #00f0ff;
  --accent-dark: #0088cc;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --neon-glow: 0 0 10px rgba(0, 240, 255, 0.7);
}

* {
  box-sizing: border-box;
}

.review-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Montserrat', sans-serif;
  background: var(--dark-bg);
  color: var(--text-primary);
  min-height: 100vh;
}

.glowing-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
  text-shadow: var(--neon-glow);
  position: relative;
  padding-bottom: 1rem;
}

.glowing-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  box-shadow: var(--neon-glow);
}

.review-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.section-wrapper {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-wrapper:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.neon-underline::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  box-shadow: var(--neon-glow);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.info-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  word-break: break-word;
}

.social-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
}

.linkedin { background: #0a66c2; }
.facebook { background: #1877f2; }
.twitter { background: #1da1f2; }

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border: none;
}

.back-btn {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
}

.back-btn:hover {
  background: rgba(148, 163, 184, 0.1);
  color: var(--text-primary);
}

.submit-btn {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-dark));
  color: var(--dark-bg);
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 240, 255, 0.4);
}

/* Animations */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 240, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0); }
}

.submit-btn {
  animation: pulse 2s infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review-container {
    padding: 1.5rem;
  }
  
  .glowing-title {
    font-size: 2rem;
  }
  
  .review-card {
    padding: 1.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>