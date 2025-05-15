<template>
  <div class="blog-page">
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
    <div class="hero-wrap hero-wrap-2" data-stellar-background-ratio="0.5">
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
    <section class="ftco-section blog-section">
      <div class="container">
        <div v-if="loading" class="text-center loading-container">
          <div class="custom-loader"></div>
          <p>Loading posts...</p>
        </div>
        <div v-else-if="error" class="text-center text-danger error-message">
          <p>{{ error }}</p>
        </div>
        <div v-else class="row">
          <div class="col-md-12 ftco-animate blog-card" v-for="post in paginatedPosts" :key="post.id">
            <div class="blog-entry p-4 d-flex align-items-center">
              <div class="blog-image">
                <router-link :to="'/blog/' + post.id" class="block-20" :style="{ backgroundImage: `url(${post.image})` }" :aria-label="'View blog post: ' + post.title"></router-link>
              </div>
              <div class="blog-details">
                <div class="meta mb-2">
                  <div><a href="#">{{ post.date }}</a></div>
                  <div><a href="#">{{ post.author }}</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> {{ post.comments }}</a></div>
                </div>
                <h3 class="heading">
                  <router-link :to="'/blog/' + post.id">{{ post.title }}</router-link>
                </h3>
                <div class="blog-tags mt-2">
                  <span
                    v-for="(tag, index) in (post.tags || [post.category]).slice(0, 3)"
                    :key="tag"
                    class="tag-badge"
                  >{{ tag }}</span>
                  <span v-if="(post.tags || [post.category]).length > 3" class="tag-badge">+{{ (post.tags || [post.category]).length - 3 }}</span>
                </div>
              </div>
              <div class="blog-actions ml-auto d-flex align-items-center">
                <router-link :to="'/blog/' + post.id" class="btn btn-primary py-2 read-btn" aria-label="Read blog post">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5" v-if="paginatedPosts.length > 0">
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
    </section>

    <!-- Newsletter Section -->
    <section class="ftco-section-parallax newsletter-section">
      <div class="parallax-img d-flex align-items-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
              <h2>Subscribe to our Newsletter</h2>
              <p>Stay updated with the latest job opportunities and career tips.</p>
              <div class="row d-flex justify-content-center mt-4 mb-4">
                <div class="col-md-12">
                  <form class="subscribe-form" @submit.prevent="subscribe">
                    <div class="form-group d-flex">
                      <input
                        v-model="newsletterEmail"
                        type="text"
                        class="form-control subscribe-input"
                        placeholder="Enter email address"
                        required
                      />
                      <input type="submit" value="Subscribe" class="submit px-3 subscribe-btn" />
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
  name: 'BlogPage',
  data() {
    return {
      navbarOpen: false,
      posts: [],
      newsletterEmail: '',
      currentPage: 1,
      postsPerPage: 8,
      loading: false,
      error: null
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
  async mounted() {
    await this.loadPostsData();
  },
  methods: {
    async loadPostsData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Failed to fetch posts data');
        }
        const data = await response.json();
        // Assuming blog posts are under a 'posts' key, similar to 'jobs' in BrowseJobs.vue
        this.posts = data.posts || [];
      } catch (error) {
        console.error('Error loading posts:', error);
        this.error = 'Unable to load posts. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
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

.blog-page {
  font-family: 'Roboto', sans-serif;
  background-color: $bg-light;
}

// Hero Section
.hero-wrap-2 {
  position: relative;
  background-image: url('/images/bg_1.jpg');
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

// Blog Section
.blog-section {
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
  .blog-card {
    margin-bottom: 1.5rem;
    .blog-entry {
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
      .blog-image {
        flex: 0 0 150px;
        .block-20 {
          display: block;
          width: 150px;
          height: 100px;
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          transition: transform 0.3s ease;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      .blog-details {
        flex: 1;
        .meta {
          font-size: 0.85rem;
          color: $text-color;
          display: flex;
          gap: 1rem;
          a {
            color: $text-color;
            text-decoration: none;
            &:hover {
              color: $primary-color;
            }
          }
          .icon-chat {
            margin-right: 0.3rem;
          }
        }
        h3.heading {
          font-size: 1.4rem;
          margin: 0.5rem 0;
          line-height: 1.4;
          a {
            color: $text-color;
            text-decoration: none;
            &:hover {
              color: $primary-color;
            }
          }
        }
        .blog-tags {
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
            transition: background 0.3s ease;
            &:hover {
              background: color.adjust($tag-color, $lightness: -10%);
            }
          }
        }
      }
      .blog-actions {
        flex-shrink: 0;
        gap: 0.5rem;
        .read-btn {
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
  .blog-card .blog-entry {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    .blog-image {
      flex: 0 0 100%;
      .block-20 {
        width: 100%;
        height: 150px;
      }
    }
    .blog-actions {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
}

@media (max-width: 767.98px) {
  .hero-wrap-2 .slider-text h1.bread {
    font-size: 2rem;
  }
  .blog-card .blog-entry {
    padding: 1rem;
  }
  .pagination li a, .pagination li span {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>