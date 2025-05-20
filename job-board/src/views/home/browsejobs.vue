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
            <li class="nav-item"><router-link to="/blog" class="nav-link">Blog</router-link></li>
                        <li class="nav-item"><router-link to="/contact" class="nav-link">Contact us</router-link></li>

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
        <section class="col-12">
          <!-- Filters with Dropdowns -->
          <div class="filter-row mb-5">
            <div class="filter-dropdowns d-flex flex-wrap gap-3">
              <!-- Category Dropdown -->
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedCategories.length > 0 ? `${selectedCategories.length} Categories` : 'All Categories' }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
                  <li>
                    <div class="search-form p-3">
                      <div class="form-group">
                        <span class="icon icon-search"></span>
                        <input
                          v-model="categorySearch"
                          type="text"
                          class="form-control search-input"
                          placeholder="Search categories..."
                        />
                      </div>
                    </div>
                  </li>
                  <li v-for="category in filteredCategories" :key="category.value">
                    <label class="dropdown-item">
                      <input
                        type="checkbox"
                        :value="category.value"
                        v-model="selectedCategories"
                        @change="filterJobs"
                        class="me-2"
                      />
                      {{ category.label }}
                    </label>
                  </li>
                </ul>
              </div>

              <!-- Location Dropdown -->
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="locationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedLocations.length > 0 ? `${selectedLocations.length} Locations` : 'All Locations' }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="locationDropdown">
                  <li>
                    <div class="search-form p-3">
                      <div class="form-group">
                        <span class="icon icon-search"></span>
                        <input
                          v-model="locationSearch"
                          type="text"
                          class="form-control search-input"
                          placeholder="Search locations..."
                        />
                      </div>
                    </div>
                  </li>
                  <li v-for="location in filteredLocations" :key="location.value">
                    <label class="dropdown-item">
                      <input
                        type="checkbox"
                        :value="location.value"
                        v-model="selectedLocations"
                        @change="filterJobs"
                        class="me-2"
                      />
                      {{ location.label }}
                    </label>
                  </li>
                </ul>
              </div>

              <!-- Job Type Dropdown -->
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="jobTypeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedJobTypes.length > 0 ? `${selectedJobTypes.length} Types` : 'All Job Types' }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="jobTypeDropdown">
                  <li v-for="type in jobTypes" :key="type.label">
                    <label class="dropdown-item">
                      <input
                        type="checkbox"
                        :value="type.label"
                        v-model="selectedJobTypes"
                        @change="filterJobs"
                        class="me-2"
                      />
                      {{ type.label }}
                    </label>
                  </li>
                </ul>
              </div>

              <!-- Clear Filters Button -->
              <button 
                class="btn btn-outline-danger"
                @click="clearFilters"
                :disabled="!hasActiveFilters"
              >
                Clear Filters
              </button>
            </div>
          </div>

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
                <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#007bff" />
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
                  <<
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
                  >>
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
              <h2 class="ftco-heading-2">Skillhunt Jobboard</h2>
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
const itemsPerPage = ref(10);
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
    // Filter out invalid categories, locations, and job types
    const validCategories = [...new Set(
      jobs.value
        .filter(job => job.category && typeof job.category === 'string')
        .map(job => job.category)
    )];
    categories.value = validCategories.map(value => ({
      value,
      label: value
    }));
    const validLocations = [...new Set(
      jobs.value
        .filter(job => job.location && typeof job.location === 'string')
        .map(job => job.location)
    )];
    locations.value = validLocations.map(value => ({
      value,
      label: value
    }));
    const validJobTypes = [...new Set(
      jobs.value
        .filter(job => job.jobType && typeof job.jobType === 'string')
        .map(job => job.jobType)
    )];
    jobTypes.value = validJobTypes.map(value => ({
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

const filteredCategories = computed(() => {
  return categories.value.filter(category => 
    (category.label || '').toLowerCase().includes(categorySearch.value.toLowerCase())
  );
});

const filteredLocations = computed(() => {
  return locations.value.filter(location => 
    (location.label || '').toLowerCase().includes(locationSearch.value.toLowerCase())
  );
});

const filteredJobs = computed(() => {
  let filtered = jobs.value;

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(job => job.category && selectedCategories.value.includes(job.category));
  }

  if (selectedLocations.value.length > 0) {
    filtered = filtered.filter(job => job.location && selectedLocations.value.includes(job.location));
  }

  if (selectedJobTypes.value.length > 0) {
    filtered = filtered.filter(job => job.jobType && selectedJobTypes.value.includes(job.jobType));
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || 
         selectedLocations.value.length > 0 || 
         selectedJobTypes.value.length > 0;
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

const clearFilters = () => {
  selectedCategories.value = [];
  selectedLocations.value = [];
  selectedJobTypes.value = [];
  categorySearch.value = '';
  locationSearch.value = '';
  filterJobs();
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
// Color Variables
$primary: #007bff;
$primary-light: #4dabf7;
$secondary: #6c757d;
$light: #f8f9fa;
$dark: #343a40;
$white: #ffffff;
$danger: #dc3545;
$border-color: #dee2e6;

// Font
$font-family-base: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

// Base Styles
.browse-jobs-page {
  font-family: $font-family-base;
  color: $dark;
  line-height: 1.6;
  background-color: $white;
  min-height: 100vh;
}

/* Navbar Styles */
.navbar {
  padding: 1rem 0;
  background-color: $white !important;
  box-shadow: 0 0.125rem 0.25rem rgba($dark, 0.075);
  
  .navbar-brand {
    font-size: 1.75rem;
    font-weight: 700;
    color: $primary !important;
    
    &:hover {
      color: $primary-light !important;
    }
  }

  .nav-link {
    font-weight: 500;
    padding: 0.5rem 1rem;
    color: $dark !important;
    transition: color 0.3s ease;
    
    &:hover, &.active {
      color: $primary !important;
    }
  }

  .navbar-toggler {
    border: none;
    padding: 0.5rem;
    color: $dark;
    
    &:focus {
      box-shadow: none;
    }

    .oi-menu {
      color: $primary;
    }
  }
}

/* Hero Section */
.hero-wrap-2 {
  position: relative;
  background: linear-gradient(rgba($dark, 0.7), rgba($dark, 0.7)), 
              url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 6rem 0;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($dark, 0.5);
  }

  .breadcrumbs {
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    
    a {
      color: $white;
      transition: color 0.3s;
      
      &:hover {
        color: $primary-light;
        text-decoration: none;
      }
    }
    
    .ion-ios-arrow-forward {
      color: $primary;
    }

    span {
      color: $white;
    }
  }
  
  h1.bread {
    font-size: 2.5rem;
    font-weight: 700;
    color: $white;
    margin-top: 0.5rem;
  }
}

/* Main Content */
.job-board {
  padding: 5rem 0;
  position: relative;
  z-index: 1;
}

/* Filter Dropdowns */
.filter-dropdowns {
  .dropdown {
    position: relative;
    
    .dropdown-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 180px;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      border: 1px solid $primary;
      color: $primary;
      background: $white;
      
      &::after {
        margin-left: 0.75rem;
        border-top-color: $primary;
      }
      
      &:hover {
        background: $light;
        color: $primary-light;
      }
    }
    
    .dropdown-menu {
      width: 280px;
      max-height: 300px;
      overflow-y: auto;
      padding: 0;
      border: 1px solid $border-color;
      box-shadow: 0 0.5rem 1rem rgba($dark, 0.15);
      border-radius: 0.5rem;
      background: $white;
      
      .dropdown-item {
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
        color: $dark;
        
        &:hover {
          background-color: $light;
          color: $primary;
        }
        
        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: $primary;
          cursor: pointer;
        }
      }
      
      .search-form {
        border-bottom: 1px solid $border-color;
        
        .form-control {
          padding-left: 2rem;
          border-radius: 0.25rem;
          border: 1px solid $border-color;
          background: $white;
          color: $dark;
          
          &:focus {
            border-color: $primary;
            box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
            background: $white;
            color: $dark;
          }

          &::placeholder {
            color: $secondary;
          }
        }
        
        .icon-search {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: $primary;
        }
      }
    }
  }
  
  .btn-outline-danger {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid $danger;
    color: $danger;
    background: $white;
    
    &:hover {
      background: $danger;
      color: $white;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

/* Job List Header */
.job-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .job-count {
    font-size: 0.9rem;
    color: $secondary;
  }
  
  .sort-control {
    display: flex;
    align-items: center;
    
    label {
      margin-right: 0.75rem;
      color: $secondary;
      font-size: 0.9rem;
    }
    
    select {
      border-radius: 0.5rem;
      border: 1px solid $border-color;
      padding: 0.375rem 1.75rem 0.375rem 0.75rem;
      font-size: 0.9rem;
      color: $dark;
      background: $white;
      
      &:focus {
        border-color: $primary;
        box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
        background: $white;
      }

      option {
        background: $white;
        color: $dark;
      }
    }
  }
}

/* Job Cards */
.job-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.job-card {
  background: $light;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba($dark, 0.075);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid $border-color;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba($dark, 0.15);
    border-color: $primary;
  }
}

.job-post-item {
  display: flex;
  padding: 1.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.job-details {
  flex: 1;
  padding-right: 1rem;
}

.job-post-item-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
}

.subadge {
  background: rgba($primary, 0.1);
  color: $primary;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: $dark;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: $primary;
    }
  }
}

.job-post-item-body {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  color: $secondary;
  font-size: 0.9rem;
  
  div {
    display: flex;
    align-items: center;
    
    .icon-layers,
    .icon-my_location,
    .icon-calendar {
      margin-right: 0.5rem;
      color: $primary;
    }
  }
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag-badge {
  background: $light;
  color: $secondary;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s;
  border: 1px solid $border-color;
  
  &:hover {
    background: $primary;
    color: $white;
  }
}

.job-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 120px;
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    min-width: auto;
  }
}

.bookmark-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $white;
  border-radius: 50%;
  color: $secondary;
  border: 1px solid $border-color;
  transition: all 0.3s;
  
  &:hover {
    background: $primary;
    color: $white;
  }

  .icon-heart {
    color: inherit;
  }
}

.apply-btn {
  background: $primary;
  color: $white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background: $primary-light;
    transform: translateY(-2px);
    color: $white;
  }
}

/* Pagination */
.pagination {
  margin-top: 3rem;
  justify-content: center;
  gap: 0.5rem;
  
  .page-item {
    margin: 0;
  }
  
  .page-link {
    border: 1px solid $border-color;
    color: $dark;
    border-radius: 0.25rem !important;
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    transition: all 0.3s;
    background: $white;
    
    &:hover {
      background: $primary;
      color: $white;
      border-color: $primary;
    }
    
    &.active {
      background: $primary;
      color: $white;
      border-color: $primary;
    }

    &:disabled {
      background: $light;
      border-color: $border-color;
      color: $secondary;
      cursor: not-allowed;
    }
  }
}

/* Scroll to Top Button */
button[aria-label="Scroll to top"] {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: $primary;
  color: $white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 1rem rgba($dark, 0.15);
  z-index: 99;
  transition: all 0.3s;
  
  &:hover {
    background: $primary-light;
    transform: translateY(-3px);
  }
  
  .bi-arrow-up {
    font-size: 1.5rem;
  }
}

/* Footer */
.ftco-footer {
  background: $dark !important;
  padding: 5rem 0 2rem;
  color: $white;
  
  a {
    color: $white;
    transition: color 0.3s;
    
    &:hover {
      color: $primary-light;
      text-decoration: none;
    }
  }
  
  .ftco-heading-2 {
    color: $white;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.75rem;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: $primary;
    }
  }
  
  .list-unstyled {
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  .block-23 {
    ul {
      li {
        margin-bottom: 1rem;
        display: flex;
        align-items: flex-start;
        
        .icon {
          margin-right: 1rem;
          color: $primary;
        }
        
        .text {
          flex: 1;
        }
      }
    }
  }
  
  .row:last-child {
    border-top: 1px solid rgba($white, 0.1);
    padding-top: 2rem;
    margin-top: 3rem;
    text-align: center;
    font-size: 0.9rem;
    
    a {
      color: $primary;
    }

    .icon-heart {
      color: $danger;
    }
  }
}

/* Loading Animation */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  
  #ftco-loader {
    width: 50px;
    height: 50px;
    
    .circular {
      animation: rotate 2s linear infinite;
      transform-origin: center center;
      
      .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke: $primary;
      }
    }
  }
  
  p {
    margin-top: 1.5rem;
    color: $secondary;
    font-weight: 500;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  0%, 100% {
    stroke: $primary;
  }
  50% {
    stroke: $primary-light;
  }
}

/* Error Message */
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  
  p {
    font-size: 1.1rem;
    color: $danger;
    font-weight: 500;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-wrap-2 {
    padding: 4rem 0;
    
    h1.bread {
      font-size: 2rem;
    }
  }
  
  .filter-dropdowns {
    flex-direction: column;
    gap: 0.75rem;
    
    .dropdown {
      width: 100%;
      
      .dropdown-toggle {
        width: 100%;
      }
      
      .dropdown-menu {
        width: 100%;
      }
    }
  }
  
  .job-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    .sort-control {
      width: 100%;
      
      select {
        flex: 1;
      }
    }
  }
  
  .job-post-item {
    padding: 1.25rem;
  }
}

@media (max-width: 576px) {
  .hero-wrap-2 {
    padding: 3rem 0;
    
    h1.bread {
      font-size: 1.75rem;
    }
  }

  .job-board {
    padding: 3rem 0;
  }

  .navbar-brand {
    font-size: 1.5rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>