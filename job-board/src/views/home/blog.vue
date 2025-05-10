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
            <li class="nav-item"><router-link to="/browsejobs" class="nav-link">Browse Jobs</router-link></li>
            <li class="nav-item"><router-link to="/candidates" class="nav-link">Candidates</router-link></li>
            <li class="nav-item active"><router-link to="/blog" class="nav-link">Blog</router-link></li>
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
              <span>Blog</span>
            </p>
            <h1 class="mb-3 bread">Our Blog</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Section -->
    <section class="ftco-section">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-3 d-flex ftco-animate" v-for="(post, index) in paginatedPosts" :key="index">
            <div class="blog-entry align-self-stretch">
              <router-link :to="'/blog/' + post.id" class="block-20" :style="{ backgroundImage: `url(/images/image_${index + 1}.jpg)` }"></router-link>
              <div class="text mt-3">
                <div class="meta mb-2">
                  <div><a href="#">{{ post.date }}</a></div>
                  <div><a href="#">{{ post.author }}</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> {{ post.comments }}</a></div>
                </div>
                <h3 class="heading">
                  <router-link :to="'/blog/' + post.id">{{ post.title }}</router-link>
                </h3>
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
  name: 'BlogPage',
  data() {
    return {
      navbarOpen: false,
      posts: [
        {
          id: 1,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 2,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 3,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 4,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 5,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 6,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 7,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        },
        {
          id: 8,
          title: 'Even the all-powerful Pointing has no control about the blind texts',
          date: 'August 28, 2019',
          author: 'Admin',
          comments: 3
        }
      ],
      newsletterEmail: '',
      currentPage: 1,
      postsPerPage: 8
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
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