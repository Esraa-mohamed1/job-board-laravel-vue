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
            <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
            <li class="nav-item cta mr-md-1"><router-link to="/new-post" class="nav-link">Post a Job</router-link></li>
            <li class="nav-item cta cta-colored"><router-link to="/job-post" class="nav-link">Want a Job</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- END nav -->

    <!-- Hero Section -->
    <div class="hero-wrap hero-wrap-2" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text align-items-end justify-content-start">
          <div class="col-md-12 ftco-animate text-center mb-5">
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
    <section class="ftco-section bg-light jobs-section">
      <div class="container">
        <div v-if="loading" class="text-center loading-container">
          <div class="custom-loader"></div>
          <p>Loading jobs...</p>
        </div>
        <div v-else-if="error" class="text-center text-danger error-message">
          <p>{{ error }}</p>
        </div>
        <div v-else class="row">
          <div class="col-lg-9 pr-lg-4">
            <div class="row">
              <div class="col-md-12 ftco-animate job-card" v-for="(job, index) in filteredJobs" :key="job.id">
                <div class="job-post-item p-4 d-flex align-items-center">
                  <div class="job-details">
                    <div class="job-post-item-header align-items-center">
                      <span class="subadge">{{ job.jobType }}</span>
                      <h2 class="mr-3 text-black">
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
                  <div class="job-actions ml-auto d-flex align-items-center">
                    <div>
                      <a href="#" class="icon text-center d-flex justify-content-center align-items-center icon mr-2 bookmark-btn" @click.prevent="bookmarkJob(job)">
                        <span class="icon-heart"></span>
                      </a>
                    </div>
                    <router-link :to="'/job/' + job.id" class="btn btn-primary py-2 apply-btn">Apply Job</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5" v-if="filteredJobs.length > 0">
              <div class="col text-center">
                <div class="block-27">
                  <ul class="pagination">
                    <li><a href="#" @click.prevent="changePage(currentPage - 1)"><</a></li>
                    <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                      <span v-if="page === currentPage">{{ page }}</span>
                      <a v-else href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li><a href="#" @click.prevent="changePage(currentPage + 1)">></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 sidebar">
            <!-- Category Filter -->
            <div class="sidebar-box bg-white p-4 ftco-animate filter-card">
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
            <div class="sidebar-box bg-white p-4 ftco-animate filter-card">
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
            <div class="sidebar-box bg-white p-4 ftco-animate filter-card">
              <h3 class="heading-sidebar">Job Type</h3>
              <form class="browse-form">
                <label class="filter-option" v-for="jobType in jobTypes" :key="jobType.value">
                  <input
                    type="checkbox"
                    :value="jobType.value"
                    v-model="selectedJobTypes"
                    @change="filterJobs"
                  />
                  {{ jobType.label }}
                </label>
              </form>
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
              <h2 class="ftco-heading-2">Skillhunt Jobboard</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
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

    <!-- Loader -->
    <div id="ftco-loader" class="fullscreen" :class="{ show: loading }">
      <svg class="circular" width="48px" height="48px">
        <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
        <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#FF69B4" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrowseJobsPage',
  data() {
    return {
      navbarOpen: false,
      jobs: [],
      categories: [],
      locations: [],
      jobTypes: [],
      selectedCategories: [],
      selectedLocations: [],
      selectedJobTypes: [],
      categorySearch: '',
      locationSearch: '',
      newsletterEmail: '',
      currentPage: 1,
      jobsPerPage: 9,
      loading: false,
      error: null
    };
  },
  computed: {
    filteredJobs() {
      let filtered = this.jobs;

      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(job => this.selectedCategories.includes(job.category));
      }

      if (this.selectedLocations.length > 0) {
        filtered = filtered.filter(job => this.selectedLocations.includes(job.location));
      }

      if (this.selectedJobTypes.length > 0) {
        filtered = filtered.filter(job => this.selectedJobTypes.includes(job.jobType));
      }

      if (this.categorySearch) {
        filtered = filtered.filter(job =>
          job.category.toLowerCase().includes(this.categorySearch.toLowerCase())
        );
      }

      if (this.locationSearch) {
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(this.locationSearch.toLowerCase())
        );
      }

      const start = (this.currentPage - 1) * this.jobsPerPage;
      const end = start + this.jobsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.jobsPerPage);
    }
  },
  async mounted() {
    await this.loadJobsData();
  },
  methods: {
    async loadJobsData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs data');
        }
        const data = await response.json();
        this.jobs = data.jobs || [];
        this.categories = [...new Set(this.jobs.map(job => job.category))].map(value => ({
          value,
          label: value
        }));
        this.locations = [...new Set(this.jobs.map(job => job.location))].map(value => ({
          value,
          label: value
        }));
        this.jobTypes = [...new Set(this.jobs.map(job => job.jobType))].map(value => ({
          value,
          label: value
        }));
      } catch (error) {
        console.error('Error loading jobs:', error);
        this.error = 'Unable to load jobs. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    filterJobs() {
      this.currentPage = 1;
    },
    bookmarkJob(job) {
      console.log('Bookmarked:', job);
      alert(`Job ${job.title} bookmarked! (This is a demo)`);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    subscribe() {
      console.log('Subscribed:', this.newsletterEmail);
      alert('Subscribed to newsletter! (This is a demo)');
      this.newsletterEmail = '';
    }
  }
};
</script>

<style scoped lang="scss">
@use "sass:color";

$primary-color: #1E90FF; // Dodger Blue
$secondary-color: #87CEFA; // Light Sky Blue
$accent-color: #FF69B4; // Hot Pink
$light-accent: #FFB6C1; // Light Pink
$tag-color: #28A745; // Green for tags
$bg-light: #F5F7FA; // Light Blue-Gray
$white: #FFFFFF;
$border-color: #E6ECF5; // Light Blue Border
$text-color: #333333;
$footer-bg: #2F4F4F; // Dark Slate Gray
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

.browse-jobs-page {
  font-family: 'Roboto', sans-serif;
  background-color: $bg-light;
}

// Hero Section
.hero-wrap-2 {
  position: relative;
  background-image: url('https://media.istockphoto.com/id/1013058562/photo/space-travel.jpg?s=612x612&w=is&k=20&c=iPejpvCNMBTzfJPkFNMKSfrsLUJ6vIlbmWdQE_wjczo=');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .overlay {
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

// Jobs Section
.jobs-section {
  padding: 3rem 0;
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
    p {
      font-size: 1.2rem;
      color: $text-color;
    }
    .custom-loader {
      border: 4px solid $border-color;
      border-top: 4px solid $accent-color;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
  .error-message {
    margin: 2rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: $accent-color;
  }
  .job-card {
    margin-bottom: 1.5rem;
    .job-post-item {
      background: $white;
      border: 1px solid $border-color;
      border-radius: 10px;
      box-shadow: $shadow;
      padding: 1.5rem;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
      justify-content: space-between;
      gap: 2rem;
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: $primary-color;
      }
      .job-details {
        flex: 1;
        .subadge {
          background: $secondary-color;
          color: $white;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          display: inline-block;
        }
        h2 {
          font-size: 1.4rem;
          margin: 0;
          line-height: 1.4;
          a {
            color: $text-color;
            text-decoration: none;
            &:hover {
              color: $primary-color;
            }
          }
        }
        .job-post-item-body {
          color: $text-color;
          font-size: 0.9rem;
          .icon-layers,
          .icon-my_location {
            margin-right: 0.5rem;
            color: $primary-color;
          }
          a {
            color: $text-color;
            &:hover {
              color: $primary-color;
            }
          }
        }
        .job-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          .tag-badge {
            background: $tag-color;
            color: $white;
            padding: 0.3rem 0.7rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
          }
        }
      }
      .job-actions {
        flex-shrink: 0;
        gap: 0.5rem;
        .bookmark-btn {
          background: $border-color;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          transition: background 0.3s ease;
          &:hover {
            background: $accent-color;
            .icon-heart {
              color: $white;
            }
          }
          .icon-heart {
            color: $text-color;
          }
        }
        .apply-btn {
          background: $primary-color;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          color: $white;
          transition: background 0.3s ease;
          &:hover {
            background: color.adjust($primary-color, $lightness: -10%);
          }
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    li {
      &.active span {
        background: $primary-color;
        color: $white;
        border-radius: 6px;
        padding: 0.5rem 1rem;
      }
      a {
        color: $primary-color;
        padding: 0.5rem 1rem;
        text-decoration: none;
        border-radius: 6px;
        transition: background 0.3s ease;
        &:hover {
          background: $border-color;
        }
      }
    }
  }
}

// Sidebar Filters
.sidebar {
  .filter-card {
    border-radius: 10px;
    box-shadow: $shadow;
    margin-bottom: 1.5rem;
    border: 1px solid $border-color;
    .heading-sidebar {
      font-size: 1.2rem;
      font-weight: 600;
      color: $text-color;
      margin-bottom: 1rem;
    }
    .search-form {
      .form-group {
        position: relative;
        .icon-search {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
          color: $secondary-color;
        }
        .search-input {
          padding-left: 2.5rem;
          border: 1px solid $border-color;
          border-radius: 6px;
          font-size: 0.9rem;
          transition: border-color 0.3s ease;
          &:focus {
            border-color: $primary-color;
            box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.2);
          }
        }
      }
    }
    .browse-form {
      .filter-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: $text-color;
        input[type="checkbox"] {
          appearance: none;
          width: 1.1rem;
          height: 1.1rem;
          border: 1px solid $border-color;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          &:checked {
            background: $primary-color;
            border-color: $primary-color;
            &:after {
              content: '\2713';
              color: $white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
}

// Newsletter Section
.newsletter-section {
  .parallax-img {
    background: linear-gradient(135deg, $primary-color, $accent-color);
    .heading-section {
      h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: $white;
      }
      p {
        color: $white;
        opacity: 0.9;
        font-size: 1rem;
      }
      .subscribe-form {
        .form-group {
          .subscribe-input {
            border: none;
            border-radius: 6px 0 0 6px;
            padding: 0.7rem;
            font-size: 0.9rem;
            &:focus {
              box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.2);
            }
          }
          .subscribe-btn {
            background: $light-accent;
            border: none;
            border-radius: 0 6px 6px 0;
            padding: 0.7rem 1.5rem;
            font-weight: 500;
            color: $white;
            transition: background 0.3s ease;
            &:hover {
              background: color.adjust($light-accent, $lightness: -10%);
            }
          }
        }
      }
    }
  }
}

// Loader
#ftco-loader {
  &.show {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    .circular {
      .path {
        stroke: $accent-color;
      }
    }
  }
}

// Footer
.ftco-footer {
  background: $footer-bg;
  .ftco-heading-2 {
    font-size: 1.4rem;
    color: $white;
  }
  p, a, .text {
    color: rgba($white, 0.85);
    font-size: 0.9rem;
    &:hover {
      color: $light-accent;
    }
  }
  .ftco-footer-social {
    li a {
      background: $secondary-color;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.3s ease;
      &:hover {
        background: $accent-color;
      }
    }
  }
}

// Responsive Adjustments
@media (max-width: 991.98px) {
  .sidebar {
    margin-top: 2rem;
  }
  .job-card .job-post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    .job-actions {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
}

@media (max-width: 767.98px) {
  .hero-wrap-2 .slider-text h1.bread {
    font-size: 2rem;
  }
  .job-card .job-post-item {
    padding: 1rem;
  }
  .pagination li a, .pagination li span {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>