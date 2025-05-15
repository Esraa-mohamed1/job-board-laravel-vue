<template>
  <div class="home-page">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div class="container-fluid px-md-4">
        <router-link class="navbar-brand" to="/">Skillhunt</router-link>
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleNavbar"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" :class="{ show: navbarOpen }" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
            <li class="nav-item"><router-link to="/browsejobs" class="nav-link">Browse Jobs</router-link></li>
            <li class="nav-item active"><router-link to="/blog" class="nav-link">Blog</router-link></li>
                        <li class="nav-item active"><router-link to="/contact" class="nav-link">Contact</router-link></li>

          </ul>
        </div>
      </div>
    </nav>
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchData" class="btn btn-primary">Retry</button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Hero Section -->
      <section class="hero-section d-flex align-items-center text-white">
        <div class="overlay"></div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <h1 class="hero-title display-4">Find Your Dream Job</h1>
              <p class="hero-subtitle lead mb-4">Browse thousands of jobs from top companies</p>
              
              <div class="job-search-form mb-5">
                <form class="row g-2 align-items-center">
                  <div class="col-md-5">
                    <div class="input-group">
                      <span class="input-group-text"><i class="fas fa-search"></i></span>
                      <input 
                        type="text" 
                        class="form-control search-input" 
                        placeholder="Job title, keywords"
                        v-model="searchQuery"
                      >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-group">
                      <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                      <input 
                        type="text" 
                        class="form-control search-input" 
                        placeholder="Location"
                        v-model="locationQuery"
                      >
                    </div>
                  </div>
                  <div class="col-md-3">
                    <button type="submit" class="btn btn-primary w-100 apply-btn" @click.prevent="searchJobs">
                      Search Jobs
                    </button>
                  </div>
                </form>
              </div>

              <div class="stats-grid d-flex justify-content-between gap-4">
                <div class="stat-item text-center">
                  <h3 class="display-5 fw-bold">{{ stats.jobs }}</h3>
                  <p class="text-uppercase small">Live Jobs</p>
                </div>
                <div class="stat-item text-center">
                  <h3 class="display-5 fw-bold">{{ stats.companies }}</h3>
                  <p class="text-uppercase small">Companies</p>
                </div>
                <div class="stat-item text-center">
                  <h3 class="display-5 fw-bold">{{ stats.candidates }}</h3>
                  <p class="text-uppercase small">Candidates</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block">
              <div class="hero-image">
                <img src="https://themewagon.github.io/skillhunt/assets/img/hero-img.png" alt="Job seekers" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Jobs Section -->
      <section class="featured-jobs-section py-5 bg-light">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 text-center">
              <h2 class="section-title h3 fw-bold position-relative">Featured Jobs</h2>
              <p class="section-subtitle text-muted">Find your next career opportunity</p>
            </div>
          </div>
          
          <div class="row g-4 mt-4">
            <div class="col-md-6" v-for="job in featuredJobs" :key="job.id">
              <div class="job-card job-post-item p-4 d-flex">
                <div class="job-details">
                  <div class="job-post-item-header align-items-center">
                    <span class="subadge">{{ job.jobType }}</span>
                    <h2 class="mr-3 text-black h5">
                      <router-link :to="'/job/' + job.id">{{ job.title }}</router-link>
                    </h2>
                  </div>
                  <div class="job-post-item-body d-block d-md-flex">
                    <div class="mr-3"><span class="icon-layers"></span> <a href="#">{{ job.company }}</a></div>
                    <div><span class="icon-my_location"></span> <span>{{ job.location }}</span></div>
                  </div>
                  <div class="job-tags mt-2">
                    <span
                      v-for="tag in job.tags || [job.category]"
                      :key="tag"
                      class="tag-badge"
                    >{{ tag }}</span>
                  </div>
                </div>
                <div class="job-actions ml-auto d-flex flex-column align-items-end">
                  <a href="#" class="icon text-center d-flex justify-content-center align-items-center icon mr-2 bookmark-btn" @click.prevent="saveJob(job)">
                    <span class="icon-heart"></span>
                  </a>
                  <router-link :to="'/job/' + job.id" class="btn btn-primary py-2 apply-btn">Apply Job</router-link>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-5">
            <router-link to="/browsejobs" class="btn btn-primary btn-lg apply-btn">
              Browse All Jobs
            </router-link>
          </div>
        </div>
      </section>

      <!-- Recent Blog Posts -->
      <section class="blog-section py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 text-center">
              <h2 class="section-title h3 fw-bold position-relative">Recent Blog Posts</h2>
              <p class="section-subtitle text-muted">Career tips and industry insights</p>
            </div>
          </div>
          
          <div class="row g-4 mt-4">
            <div class="col-md-4" v-for="blog in recentBlogs" :key="blog.id">
              <div class="blog-card job-post-item p-4">
                <router-link :to="'/blog/' + blog.id" class="blog-image">
                  <img :src="blog.image" :alt="blog.title" class="img-fluid">
                </router-link>
                <div class="blog-content">
                  <div class="meta d-flex justify-content-between text-muted small mb-2">
                    <span>{{ blog.date }}</span>
                    <span>{{ blog.author }}</span>
                  </div>
                  <h3 class="h5 fw-bold">
                    <router-link :to="'/blog/' + blog.id">{{ blog.title }}</router-link>
                  </h3>
                  <router-link :to="'/blog/' + blog.id" class="read-more text-primary text-decoration-none">
                    Read More <i class="fas fa-arrow-right ms-1"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="ftco-footer ftco-bg-dark ftco-section">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Myjob Jobboard</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Employers</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block">Browse Candidates</a></li>
                  <li><a href="#" class="pb-1 d-block">Post a Job</a></li>
                  <li><a href="#" class="pb-1 d-block">Employer Listing</a></li>
                  <li><a href="#" class="pb-1 d-block">Resume Page</a></li>
                  <li><a href="#" class="pb-1 d-block">Dashboard</a></li>
                  <li><a href="#" class="pb-1 d-block">Job Packages</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4 ml-md-4">
                <h2 class="ftco-heading-2">Candidate</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block">Browse Jobs</a></li>
                  <li><a href="#" class="pb-1 d-block">Submit Resume</a></li>
                  <li><a href="#" class="pb-1 d-block">Dashboard</a></li>
                  <li><a href="#" class="pb-1 d-block">Browse Categories</a></li>
                  <li><a href="#" class="pb-1 d-block">My Bookmarks</a></li>
                  <li><a href="#" class="pb-1 d-block">Candidate Listing</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4 ml-md-4">
                <h2 class="ftco-heading-2">Account</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block">My Account</a></li>
                  <li><a href="#" class="pb-1 d-block">Sign In</a></li>
                  <li><a href="#" class="pb-1 d-block">Create Account</a></li>
                  <li><a href="#" class="pb-1 d-block">Checkout</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Have a Questions?</h2>
                <div class="block-23 mb-3">
                  <ul>
                    <li><span class="icon icon-map-marker"></span><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                    <li><a href="#"><span class="icon icon-phone"></span><span class="text">+2 392 3929 210</span></a></li>
                    <li><a href="#"><span class="icon icon-envelope"></span><span class="text">info@yoursite.com</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <p>
                Copyright © {{ new Date().getFullYear() }} All rights reserved | This template is made with
                <i class="icon-heart text-danger" aria-hidden="true"></i> by
                <a href="https://colorlib.com" target="_blank">Colorlib</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/employer/auth'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  jobs: 0,
  companies: 0,
  candidates: 0
})
const featuredJobs = ref([])
const recentBlogs = ref([])
const searchQuery = ref('')
const locationQuery = ref('')
const loading = ref(true)
const error = ref(null)
const navbarOpen = ref(false)

const toggleNavbar = () => {
  navbarOpen.value = !navbarOpen.value
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('/db.json')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    
    // Calculate stats
    stats.value = {
      jobs: data.jobs?.length || 0,
      companies: data.employers?.length || 0,
      candidates: data.users?.filter(u => u.role === 'candidate')?.length || 0
    }
    
    // Get featured jobs (first 4 jobs)
    featuredJobs.value = data.jobs?.slice(0, 4) || []
    
    // Get recent blogs (first 3 blogs)
    recentBlogs.value = data.blogs?.slice(0, 3) || []
    
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Failed to load data. Please try again later.'
  } finally {
    loading.value = false
  }
}

const searchJobs = () => {
  if (searchQuery.value || locationQuery.value) {
    router.push({
      path: '/browsejobs',
      query: {
        search: searchQuery.value,
        location: locationQuery.value
      }
    })
  }
}

const saveJob = (job) => {
  console.log('Job saved:', job)
  alert(`Job "${job.title}" has been saved to your bookmarks!`)
}

// Fetch data on mount
fetchData()
</script>

<style scoped lang="scss">
@use "sass:color"; /* Import Sass color module */

/* SCSS Variables */
$primary-color: #1E90FF; /* Dodger Blue */
$secondary-color: #87CEFA; /* Light Sky Blue */
$accent-color: #FF69B4; /* Hot Pink */
$light-accent: #FFB6C1; /* Light Pink */
$tag-color: #28A745; /* Green for tags */
$bg-light: #F5F7FA; /* Light Blue-Gray */
$white: #FFFFFF;
$border-color: #E6ECF5; /* Light Blue Border */
$text-color: #333333;
$footer-bg:hsl(221, 91.70%, 9.40%); /* Dark Slate Gray */
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Base Styles */
.home-page {
  font-family: 'Roboto', sans-serif;
  background-color: $bg-light;
}

/* Navbar */
.ftco-navbar-light {
  background: $footer-bg !important;
  padding: 1rem 0;
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: 700;
  color: $white !important;
}

.nav-link {
  color: $white !important;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-item.active .nav-link {
  color: $light-accent !important;
}

.navbar-toggler {
  border: none;
  color: $white;
}

.oi-menu {
  margin-right: 0.5rem;
}

/* Loading Overlay */
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $bg-light;
}

.loading-overlay p {
  margin-top: 1rem;
  color: $text-color;
}

/* Error Message */
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $bg-light;
}

.error-message p {
  color: $accent-color;
  margin-bottom: 1rem;
}

.btn-primary {
  background: $primary-color;
  border-color: $primary-color;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: color.adjust($primary-color, $lightness: -10%);
  border-color: color.adjust($primary-color, $lightness: -10%);
}

/* Hero Section */
.hero-section {
  position: relative;
  background-image: url('https://blog.people-cloud.com/hs-fs/hub/1817347/file-3972374098-jpg/blog-files/por-que-incluir-tecnologia-en-la-gestion-de-recursos-humanos.jpg?width=1024&name=por-que-incluir-tecnologia-en-la-gestion-de-recursos-humanos.jpg');
  background-size: cover;
  background-position: center;
  min-height: 600px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-title {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: $bg-light; /* Changed to lighter color */
  font-weight: 600; /* Slightly lighter weight */
}

.hero-subtitle {
  opacity: 0.9;
}

.job-search-form .input-group-text {
  background: $white;
  border: 1px solid $border-color;
  border-right: none;
  border-radius: 6px 0 0 6px;
}

.job-search-form .search-input {
  border: 1px solid $border-color;
  border-left: none;
  border-radius: 0 6px 6px 0;
  height: 50px;
  padding-left: 0.5rem;
}

.job-search-form .search-input:focus {
  border-color: $primary-color;
  box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.2);
}

.job-search-form .apply-btn {
  height: 50px;
  font-weight: 500;
}

.stats-grid {
  margin-top: 2rem;
}

.stat-item h3 {
  color: $white;
  margin-bottom: 0.25rem;
}

.stat-item p {
  opacity: 0.8;
}

/* Section Titles */
.section-title {
  margin-bottom: 1rem;
}

.section-title:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 3px;
  background: $primary-color;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Featured Jobs Section */
.featured-jobs-section {
  padding: 3rem 0;
}

.job-card {
  background: $white;
  border: 1px solid $border-color;
  border-radius: 10px;
  box-shadow: $shadow;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  justify-content: space-between;
  gap: 2rem;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: $primary-color;
}

.job-details {
  flex: 1;
}

.subadge {
  background: $secondary-color;
  color: $white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.job-details h2 {
  font-size: 1.4rem;
  margin: 0;
  line-height: 1.4;
}

.job-details h2 a {
  color: $text-color;
  text-decoration: none;
}

.job-details h2 a:hover {
  color: $primary-color;
}

.job-post-item-body {
  color: $text-color;
  font-size: 0.9rem;
}

.job-post-item-body .icon-layers,
.job-post-item-body .icon-my_location {
  margin-right: 0.5rem;
  color: $primary-color;
}

.job-post-item-body a {
  color: $text-color;
}

.job-post-item-body a:hover {
  color: $primary-color;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-badge {
  background: $tag-color;
  color: $white;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.job-actions {
  flex-shrink: 0;
  gap: 0.5rem;
}

.bookmark-btn {
  background: $border-color;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  transition: background 0.3s ease;
}

.bookmark-btn:hover {
  background: $accent-color;
}

.bookmark-btn .icon-heart {
  color: $text-color;
}

.bookmark-btn:hover .icon-heart {
  color: $white;
}

.apply-btn {
  background: $primary-color;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: $white;
  transition: background 0.3s ease;
}

.apply-btn:hover {
  background: color.adjust($primary-color, $lightness: -10%);
}

/* Blog Section */
.blog-section {
  padding: 3rem 0;
}

.blog-card {
  background: $white;
  border: 1px solid $border-color;
  border-radius: 10px;
  box-shadow: $shadow;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.blog-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: $primary-color;
}

.blog-image {
  display: block;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.blog-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-image:hover img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1rem 0;
}

.blog-content a {
  color: $text-color;
  text-decoration: none;
}

.blog-content a:hover {
  color: $primary-color;
}

.read-more {
  font-weight: 500;
}

/* Footer */
.ftco-footer {
  background: $footer-bg;
  padding: 3rem 0;
}

.ftco-heading-2 {
  font-size: 1.4rem;
  color: $white;
}

.ftco-footer p,
.ftco-footer a,
.ftco-footer .text {
  color: rgba($white, 0.85);
  font-size: 0.9rem;
}

.ftco-footer a:hover {
  color: $light-accent;
}

.icon-heart.text-danger {
  color: $accent-color !important;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .hero-section {
    min-height: 500px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .job-search-form form {
    flex-direction: column;
    gap: 1rem;
  }
  
  .job-search-form .col-md-5,
  .job-search-form .col-md-4,
  .job-search-form .col-md-3 {
    width: 100%;
  }
  
  .job-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .job-actions {
    flex-direction: row !important;
    gap: 1rem;
    margin-top: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .blog-image {
    height: 150px;
  }
}
</style>