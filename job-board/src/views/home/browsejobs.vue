<template>
  <div class="browse-jobs-page">
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
            <li class="nav-item active"><router-link to="/browsejobs" class="nav-link">Browse Jobs</router-link></li>
            <li class="nav-item"><router-link to="/candidates" class="nav-link">Candidates</router-link></li>
            <li class="nav-item"><router-link to="/blog" class="nav-link">Blog</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-wrap hero-wrap-2" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text align-items-end justify-content-start">
          <div class="col-md-12 text-center mb-5">
            <p class="breadcrumbs mb-0">
              <span class="mr-3"><router-link to="/">Home <i class="ion-ios-arrow-forward"></i></router-link></span>
              <span>Browse Jobs</span>
            </p>
            <h1 class="mb-3 bread">Browse Jobs</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Jobs Section -->
    <section class="job-board container py-5">
      <div class="row">
        <aside class="col-lg-3 mb-4">
          <!-- Category Filter -->
          <div class="sidebar-box bg-white p-4 filter-card">
            <h3 class="heading-sidebar">Browse Category</h3>
            <form class="search-form mb-3">
              <div class="form-group">
                <span class="icon icon-search"></span>
                <input
                  v-model="categorySearch"
                  type="text"
                  class="form-control search-input"
                  placeholder="Search..."
                />
              </div>
            </form>
            <form class="browse-form">
              <label class="filter-option" v-for="category in categories" :key="category.value">
                <input
                  type="checkbox"
                  :value="category.value"
                  v-model="selectedCategories"
                  @change="filterJobs"
                />
                {{ category.label }}
              </label>
            </form>
          </div>

          <!-- Location Filter -->
          <div class="sidebar-box bg-white p-4 filter-card">
            <h3 class="heading-sidebar">Select Location</h3>
            <form class="search-form mb-3">
              <div class="form-group">
                <span class="icon icon-search"></span>
                <input
                  v-model="locationSearch"
                  type="text"
                  class="form-control search-input"
                  placeholder="Search..."
                />
              </div>
            </form>
            <form class="browse-form">
              <label class="filter-option" v-for="location in locations" :key="location.value">
                <input
                  type="checkbox"
                  :value="location.value"
                  v-model="selectedLocations"
                  @change="filterJobs"
                />
                {{ location.label }}
              </label>
            </form>
          </div>

          <!-- Job Type Filter -->
          <div class="sidebar-box bg-white p-4 filter-card">
            <h3 class="heading-sidebar">Job Type</h3>
            <form class="browse-form">
              <label class="filter-option" v-for="type in jobTypes" :key="type.label">
                <input
                  type="checkbox"
                  :value="type.label"
                  v-model="selectedJobTypes"
                  @change="filterJobs"
                />
                {{ type.label }}
              </label>
            </form>
          </div>
        </aside>

        <section class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="text-muted fw-bold">{{ filteredJobs.length.toLocaleString() }} Jobs found</div>
            <div class="d-flex align-items-center">
              <label for="sort" class="me-2 text-muted">Sort by</label>
              <select id="sort" class="form-select w-auto" v-model="sortOption" @change="sortJobs">
                <option value="none">None</option>
                <option value="latest">Latest</option>
                <option value="salaryHigh">Salary High</option>
              </select>
            </div>
          </div>

          <div v-if="loading" class="text-center loading-container">
            <div id="ftco-loader" class="show">
              <svg class="circular" width="48px" height="48px">
                <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
                <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#FF69B4" />
              </svg>
            </div>
            <p>Loading jobs...</p>
          </div>
          <div v-else-if="error" class="text-center text-danger error-message">
            <p>{{ error }}</p>
          </div>
          <div v-else class="job-list">
            <div
              v-for="job in paginatedJobs"
              :key="job.id"
              class="job-card"
            >
              <div class="job-post-item p-3 d-flex align-items-center">
                <div class="job-details">
                  <div class="job-post-item-header d-flex align-items-center flex-wrap">
                    <span class="subadge me-2">{{ job.jobType }}</span>
                    <h2 class="job-title">
                      <router-link :to="'/job/' + job.id">{{ job.title }}</router-link>
                    </h2>
                  </div>
                  <div class="job-post-item-body d-flex flex-wrap gap-2">
                    <div class="company"><span class="icon-layers me-1"></span>{{ job.company }}</div>
                    <div class="location"><span class="icon-my_location me-1"></span>{{ job.location }}</div>
                    <div class="posted-date"><span class="icon-calendar me-1"></span>Posted on {{ formatPostedDate(job.postedDate) }}</div>
                  </div>
                  <div class="job-tags mt-2 d-flex flex-wrap gap-2">
                    <span v-for="tag in job.tags || [job.category]" :key="tag" class="tag-badge">{{ tag }}</span>
                  </div>
                </div>
                <div class="job-actions ms-auto d-flex flex-column align-items-end gap-2">
                  <a
                    href="#"
                    class="icon d-flex justify-content-center align-items-center bookmark-btn"
                    @click.prevent="bookmarkJob(job)"
                  >
                    <span class="icon-heart"></span>
                  </a>
                  <router-link :to="'/job/' + job.id" class="btn btn-primary apply-btn">Apply Job</router-link>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="Job pagination" class="mt-5" v-if="filteredJobs.length > 0">
            <ul class="pagination justify-content-center gap-2">
              <li class="page-item">
                <button class="page-link rounded shadow-sm" @click="currentPage--" :disabled="currentPage === 1">
                  &lt;&lt;
                </button>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item">
                <button
                  class="page-link rounded shadow-sm"
                  :class="{ 'active bg-primary text-white': page === currentPage }"
                  @click="currentPage = page"
                >
                  {{ page.toString().padStart(2, '0') }}
                </button>
              </li>
              <li class="page-item">
                <button class="page-link rounded shadow-sm" @click="currentPage++" :disabled="currentPage === totalPages">
                  &gt;&gt;
                </button>
              </li>
            </ul>
          </nav>

          <button
            class="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"
            aria-label="Scroll to top"
            @click="scrollToTop"
          >
            <i class="bi bi-arrow-up"></i>
          </button>
        </section>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const jobs = ref([]);
const categories = ref([]);
const locations = ref([]);
const jobTypes = ref([
  { label: 'Full Time', checked: false },
  { label: 'Part Time', checked: false },
  { label: 'Remote', checked: false },
  { label: 'Contract', checked: false }
]);
const selectedCategories = ref([]);
const selectedLocations = ref([]);
const selectedJobTypes = ref([]);
const categorySearch = ref('');
const locationSearch = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const sortOption = ref('none');
const loading = ref(false);
const error = ref(null);
const navbarOpen = ref(false);

const fetchJobs = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('/db.json');
    if (!response.ok) throw new Error('Failed to fetch jobs data');
    const data = await response.json();
    jobs.value = data.jobs || [];
    categories.value = [...new Set(jobs.value.map(job => job.category))].map(value => ({
      value,
      label: value
    }));
    locations.value = [...new Set(jobs.value.map(job => job.location))].map(value => ({
      value,
      label: value
    }));
    jobTypes.value = [...new Set(jobs.value.map(job => job.jobType))].map(value => ({
      value,
      label: value,
      checked: false
    }));
  } catch (err) {
    console.error('Error fetching jobs:', err);
    error.value = 'Unable to load jobs. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const filteredJobs = computed(() => {
  let filtered = jobs.value;

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(job => selectedCategories.value.includes(job.category));
  }

  if (selectedLocations.value.length > 0) {
    filtered = filtered.filter(job => selectedLocations.value.includes(job.location));
  }

  if (selectedJobTypes.value.length > 0) {
    filtered = filtered.filter(job => selectedJobTypes.value.includes(job.jobType));
  }

  if (categorySearch.value) {
    filtered = filtered.filter(job =>
      job.category.toLowerCase().includes(categorySearch.value.toLowerCase())
    );
  }

  if (locationSearch.value) {
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(locationSearch.value.toLowerCase())
    );
  }

  return filtered;
});

const sortedJobs = computed(() => {
  if (sortOption.value === 'latest') {
    return [...filteredJobs.value].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }
  if (sortOption.value === 'salaryHigh') {
    return [...filteredJobs.value].sort((a, b) => {
      const getMaxSalary = (salary) => {
        if (!salary || typeof salary !== 'string') return 0;
        const matches = salary.match(/\d+/g);
        if (!matches) return 0;
        return parseInt(matches[matches.length - 1]) * (salary.includes('k') ? 1000 : 1);
      };
      const salaryA = getMaxSalary(a.salary);
      const salaryB = getMaxSalary(b.salary);
      return salaryB - salaryA;
    });
  }
  return filteredJobs.value;
});

const totalPages = computed(() => Math.ceil(sortedJobs.value.length / itemsPerPage.value));

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedJobs.value.slice(start, end);
});

const formatPostedDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const toggleNavbar = () => {
  navbarOpen.value = !navbarOpen.value;
};

const filterJobs = () => {
  currentPage.value = 1;
};

const sortJobs = () => {
  currentPage.value = 1;
};

const bookmarkJob = (job) => {
  console.log('Bookmarked:', job);
  alert(`Job "${job.title}" bookmarked! (This is a demo)`);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchJobs();
});
</script>

<style scoped lang="scss">
@use "sass:color";

// SCSS Variables
$primary-color: #1E90FF; // Dodger Blue
$secondary-color: #87CEFA; // Light Sky Blue
$accent-color: #FF69B4; // Hot Pink
$light-accent: #FFB6C1; // Light Pink
$tag-color: #28A745; // Green for tags
$white: #FFFFFF;
$border-color: #E6ECF5; // Light Blue Border
$text-color: #333333;
$footer-bg: #2F4F4F; // Dark Slate Gray
$shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

// Base Styles
.browse-jobs-page {
  font-family: 'Roboto', sans-serif;
  background-color: $white; // White background
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

/* Hero Section */
.hero-wrap-2 {
  position: relative;
  background-image: url('https://media.istockphoto.com/id/1013058562/photo/space-travel.jpg?s=612x612&w=is&k=20&c=iPejpvCNMBTzfJPkFNMKSfrsLUJ6vIlbmWdQE_wjczo=');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .slider-text {
    h1.bread {
      font-size: 2.8rem;
      font-weight: 700;
      color: $white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .breadcrumbs {
      font-size: 1rem;
      color: $white;
      a {
        color: $white;
        text-decoration: none;
        &:hover {
          color: $light-accent;
        }
      }
      .ion-ios-arrow-forward {
        margin: 0 5px;
      }
    }
  }
}

/* Job Board Section */
.job-board {
  padding: 3rem 0;
  background-color: $white; // White background
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Job Card */
.job-card {
  margin-bottom: 1.25rem;
}

.job-post-item {
  background: $white;
  border: 1px solid $border-color;
  border-radius: 8px;
  box-shadow: $shadow;
  padding: 1rem;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  gap: 1.5rem;
}

.job-post-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  border-color: $primary-color;
}

.job-details {
  flex: 1;
}

.job-post-item-header {
  gap: 0.5rem;
}

.subadge {
  background: $secondary-color;
  color: $white;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.job-title a {
  color: $text-color;
  text-decoration: none;
}

.job-title a:hover {
  color: $primary-color;
}

.job-post-item-body {
  color: $text-color;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.job-post-item-body .company,
.job-post-item-body .location,
.job-post-item-body .posted-date {
  display: flex;
  align-items: center;
}

.job-post-item-body .icon-layers,
.job-post-item-body .icon-my_location,
.job-post-item-body .icon-calendar {
  color: $primary-color;
  font-size: 0.9rem;
}

.job-post-item-body .company a {
  color: $text-color;
  text-decoration: none;
}

.job-post-item-body .company a:hover {
  color: $primary-color;
}

.job-tags {
  gap: 0.5rem;
}

.tag-badge {
  background: $tag-color;
  color: $white;
  padding: 0.25rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: capitalize;
}

.job-actions {
  gap: 0.75rem;
}

.bookmark-btn {
  background: $border-color;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: background 0.3s ease;
}

.bookmark-btn:hover {
  background: $accent-color;
}

.bookmark-btn .icon-heart {
  color: $text-color;
  font-size: 0.9rem;
}

.bookmark-btn:hover .icon-heart {
  color: $white;
}

.apply-btn {
  background: $primary-color;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: $white;
  transition: background 0.3s ease;
}

.apply-btn:hover {
  background: #1a7fe6; // Static darker blue instead of color.adjust
}

/* Sidebar Filters */
.sidebar-box {
  border-radius: 10px;
  box-shadow: $shadow;
  margin-bottom: 1.5rem;
  border: 1px solid $border-color;
}

.heading-sidebar {
  font-size: 1.2rem;
  font-weight: 600;
  color: $text-color;
  margin-bottom: 1rem;
}

.search-form .form-group {
  position: relative;
}

.search-form .icon-search {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: $secondary-color;
}

.search-form .search-input {
  padding-left: 2.5rem;
  border: 1px solid $border-color;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.search-form .search-input:focus {
  border-color: $primary-color;
  box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.2);
}

.browse-form .filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: $text-color;
}

.browse-form .filter-option input[type="checkbox"] {
  appearance: none;
  width: 1.1rem;
  height: 1.1rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.browse-form .filter-option input[type="checkbox"]:checked {
  background: $primary-color;
  border-color: $primary-color;
}

.browse-form .filter-option input[type="checkbox"]:checked:after {
  content: '\2713';
  color: $white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
}

/* Loading and Error States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.loading-container p {
  font-size: 1.2rem;
  color: $text-color;
}

#ftco-loader.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

#ftco-loader .circular .path {
  stroke: $accent-color;
}

.error-message {
  margin: 2rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: $accent-color;
}

/* Pagination */
.page-link {
  padding: 0.75rem 1rem;
  border: 2px solid $border-color;
  color: $text-color;
  transition: all 0.2s ease;
}

.page-link:hover {
  background-color: $white;
  border-color: $primary-color;
}

.page-link.active {
  background-color: $primary-color;
  border-color: $primary-color;
  color: $white;
}

.page-link:disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Scroll to Top Button */
.btn-primary.rounded-circle {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-color;
  border: none;
  box-shadow: $shadow;
  transition: background 0.3s ease;
}

.btn-primary.rounded-circle:hover {
  background: #1a7fe6; // Static darker blue
}

/* Form Elements */
select.form-select:focus,
input.form-check-input:focus {
  box-shadow: none;
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
@media (max-width: 991.98px) {
  .job-board .row > aside {
    margin-bottom: 2rem;
  }
  .job-post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .job-actions {
    flex-direction: row;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 767.98px) {
  .hero-wrap-2 .slider-text h1.bread {
    font-size: 2rem;
  }
  .job-board {
    padding: 1.5rem 0;
  }
  .job-post-item {
    padding: 0.75rem;
  }
  .job-title {
    font-size: 1rem;
  }
  .job-post-item-body {
    font-size: 0.8rem;
  }
  .subadge,
  .tag-badge {
    font-size: 0.65rem;
  }
  .pagination .page-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>