<template>
  <div>
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
    <div class="hero-wrap hero-wrap-2" style="background-image: url('/images/bg_1.jpg');" data-stellar-background-ratio="0.5">
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
    <section class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 pr-lg-4">
            <div class="row">
              <div class="col-md-12 ftco-animate" v-for="(job, index) in filteredJobs" :key="index">
                <div class="job-post-item p-4 d-block d-lg-flex align-items-center">
                  <div class="one-third mb-4 mb-md-0">
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
                  </div>
                  <div class="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                    <div>
                      <a href="#" class="icon text-center d-flex justify-content-center align-items-center icon mr-2" @click.prevent="bookmarkJob(job)">
                        <span class="icon-heart"></span>
                      </a>
                    </div>
                    <router-link :to="'/job/' + job.id" class="btn btn-primary py-2">Apply Job</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col text-center">
                <div class="block-27">
                  <ul>
                    <li><a href="#" @click.prevent="changePage(currentPage - 1)">&lt;</a></li>
                    <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                      <span v-if="page === currentPage">{{ page }}</span>
                      <a v-else href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li><a href="#" @click.prevent="changePage(currentPage + 1)">&gt;</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 sidebar">
            <!-- Category Filter -->
            <div class="sidebar-box bg-white p-4 ftco-animate">
              <h3 class="heading-sidebar">Browse Category</h3>
              <form class="search-form mb-3">
                <div class="form-group">
                  <span class="icon icon-search"></span>
                  <input
                    v-model="categorySearch"
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </div>
              </form>
              <form class="browse-form">
                <label v-for="(category, index) in categories" :key="index">
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
            <div class="sidebar-box bg-white p-4 ftco-animate">
              <h3 class="heading-sidebar">Select Location</h3>
              <form class="search-form mb-3">
                <div class="form-group">
                  <span class="icon icon-search"></span>
                  <input
                    v-model="locationSearch"
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </div>
              </form>
              <form class="browse-form">
                <label v-for="(location, index) in locations" :key="index">
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
            <div class="sidebar-box bg-white p-4 ftco-animate">
              <h3 class="heading-sidebar">Job Type</h3>
              <form class="browse-form">
                <label v-for="(jobType, index) in jobTypes" :key="index">
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

    <!-- Newsletter Section -->
    <section class="ftco-section-parallax">
      <div class="parallax-img d-flex align-items-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
              <h2>Subscribe to our Newsletter</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <div class="row d-flex justify-content-center mt-4 mb-4">
                <div class="col-md-12">
                  <form class="subscribe-form" @submit.prevent="subscribe">
                    <div class="form-group d-flex">
                      <input
                        v-model="newsletterEmail"
                        type="text"
                        class="form-control"
                        placeholder="Enter email address"
                        required
                      />
                      <input type="submit" value="Subscribe" class="submit px-3" />
                    </div>
                  </form>
                </div>
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
              Copyright &copy; {{ new Date().getFullYear() }} All rights reserved | This template is made with
              <i class="icon-heart text-danger" aria-hidden="true"></i> by
              <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Loader -->
    <div id="ftco-loader" class="show fullscreen">
      <svg class="circular" width="48px" height="48px">
        <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
        <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00" />
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
      jobs: [
        {
          id: 1,
          title: 'Frontend Development',
          jobType: 'Partime',
          company: 'Facebook, Inc.',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 2,
          title: 'Full Stack Developer',
          jobType: 'Fulltime',
          company: 'Google, Inc.',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 3,
          title: 'Open Source Interactive Developer',
          jobType: 'Freelance',
          company: 'New York Times',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 4,
          title: 'Frontend Development',
          jobType: 'Partime',
          company: 'Facebook, Inc.',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 5,
          title: 'Open Source Interactive Developer',
          jobType: 'Temporary',
          company: 'New York Times',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 6,
          title: 'Full Stack Developer',
          jobType: 'Fulltime',
          company: 'Google, Inc.',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 7,
          title: 'Open Source Interactive Developer',
          jobType: 'Freelance',
          company: 'New York Times',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 8,
          title: 'Frontend Development',
          jobType: 'Internship',
          company: 'Facebook, Inc.',
          location: 'Western City, UK',
          category: 'Website & Software'
        },
        {
          id: 9,
          title: 'Open Source Interactive Developer',
          jobType: 'Temporary',
          company: 'New York Times',
          location: 'Western City, UK',
          category: 'Website & Software'
        }
      ],
      categories: [
        { label: 'Website & Software', value: 'Website & Software' },
        { label: 'Education & Training', value: 'Education & Training' },
        { label: 'Graphics Design', value: 'Graphics Design' },
        { label: 'Accounting & Finance', value: 'Accounting & Finance' },
        { label: 'Restaurant & Food', value: 'Restaurant & Food' },
        { label: 'Health & Hospital', value: 'Health & Hospital' }
      ],
      locations: [
        { label: 'Sydney, Australia', value: 'Sydney, Australia' },
        { label: 'New York, United States', value: 'New York, United States' },
        { label: 'Tokyo, Japan', value: 'Tokyo, Japan' },
        { label: 'Manila, Philippines', value: 'Manila, Philippines' },
        { label: 'Seoul, South Korea', value: 'Seoul, South Korea' },
        { label: 'Western City, UK', value: 'Western City, UK' }
      ],
      jobTypes: [
        { label: 'Partime', value: 'Partime' },
        { label: 'Fulltime', value: 'Fulltime' },
        { label: 'Internship', value: 'Internship' },
        { label: 'Temporary', value: 'Temporary' },
        { label: 'Freelance', value: 'Freelance' },
        { label: 'Fixed', value: 'Fixed' }
      ],
      selectedCategories: [],
      selectedLocations: [],
      selectedJobTypes: [],
      categorySearch: '',
      locationSearch: '',
      newsletterEmail: '',
      currentPage: 1,
      jobsPerPage: 9
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

      // Pagination
      const start = (this.currentPage - 1) * this.jobsPerPage;
      const end = start + this.jobsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.jobsPerPage);
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    filterJobs() {
      this.currentPage = 1; // Reset to first page on filter change
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

<style scoped>
/* External styles are loaded from css/style.css, etc. */
</style>