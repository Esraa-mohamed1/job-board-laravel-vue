<template>
  <div>
    <!-- Navigation - Enhanced with shadow and smoother transition -->
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-light
     ftco-navbar-light" id="ftco-navbar" style="box-shadow: 0 2px 15px rgba(0,0,0,0.1);">
      <div class="container-fluid px-md-4">
        <router-link class="navbar-brand" to="/" style="font-weight: 700; color:rgb(1, 4, 7); letter-spacing: 1px;">Skillhunt</router-link>
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleNavbar"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style="border: none; outline: none;"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" :class="{ show: navbarOpen }" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
            <li class="nav-item"><router-link to="/browsejobs" class="nav-link">Browse Jobs</router-link></li>
            <li class="nav-item"><router-link to="/blog" class="nav-link">Blog</router-link></li>
            <li class="nav-item active"><router-link to="/contact" class="nav-link" style="color: #4eabff !important;">Contact</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    

    <!-- Contact Section - Enhanced with cards and better spacing -->
    <section class="ftco-section contact-section bg-light" style="padding: 7rem 0;">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-md-8 text-center">
            <h2 class="h1 mb-4" style="font-weight: 700; color: #2c3e50;">Contact Information</h2>
            <p class="mb-5" style="color: #7f8c8d;">We'd love to hear from you! Reach out through any of these channels.</p>
          </div>
        </div>
        
        <div class="row d-flex mb-5 contact-info">
          <div class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm p-4" style="border-radius: 12px; transition: all 0.3s ease;">
              <div class="card-body text-center">
                <div style="width: 60px; height: 60px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <i class="icon-map-marker" style="font-size: 24px; color: #4eabff;"></i>
                </div>
                <h5 class="card-title" style="font-weight: 600;">Address</h5>
                <p class="card-text">198 West 21th Street, Suite 721 New York NY 10016</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm p-4" style="border-radius: 12px; transition: all 0.3s ease;">
              <div class="card-body text-center">
                <div style="width: 60px; height: 60px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <i class="icon-phone" style="font-size: 24px; color: #4eabff;"></i>
                </div>
                <h5 class="card-title" style="font-weight: 600;">Phone</h5>
                <p class="card-text"><a href="tel://1234567920" style="color: #7f8c8d;">+ 1235 2355 98</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm p-4" style="border-radius: 12px; transition: all 0.3s ease;">
              <div class="card-body text-center">
                <div style="width: 60px; height: 60px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <i class="icon-envelope" style="font-size: 24px; color: #4eabff;"></i>
                </div>
                <h5 class="card-title" style="font-weight: 600;">Email</h5>
                <p class="card-text"><a href="mailto:info@yoursite.com" style="color: #7f8c8d;">info@yoursite.com</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm p-4" style="border-radius: 12px; transition: all 0.3s ease;">
              <div class="card-body text-center">
                <div style="width: 60px; height: 60px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <i class="icon-globe" style="font-size: 24px; color: #4eabff;"></i>
                </div>
                <h5 class="card-title" style="font-weight: 600;">Website</h5>
                <p class="card-text"><a href="#" style="color: #7f8c8d;">yoursite.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row block-9">
          <div class="col-md-6 order-md-last d-flex">
            <form class="bg-white p-5 contact-form" @submit.prevent="submitForm" style="border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.05);">
              <h3 class="mb-4" style="font-weight: 600; color: #2c3e50;">Send us a message</h3>
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="Your Name"
                  required
                  style="height: 50px; border-radius: 8px; border: 1px solid #eee; padding-left: 20px;"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="Your Email"
                  required
                  style="height: 50px; border-radius: 8px; border: 1px solid #eee; padding-left: 20px;"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="form.subject"
                  type="text"
                  class="form-control"
                  placeholder="Subject"
                  required
                  style="height: 50px; border-radius: 8px; border: 1px solid #eee; padding-left: 20px;"
                />
              </div>
              <div class="form-group">
                <textarea
                  v-model="form.message"
                  cols="30"
                  rows="7"
                  class="form-control"
                  placeholder="Message"
                  required
                  style="border-radius: 8px; border: 1px solid #eee; padding: 15px 20px;"
                ></textarea>
              </div>
              <div class="form-group">
                <input 
                  type="submit" 
                  value="Send Message" 
                  class="btn btn-primary py-3 px-5" 
                  style="background: #4eabff; border: none; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px; transition: all 0.3s ease;"
                  @mouseover="hoverBtn = true"
                  @mouseleave="hoverBtn = false"
                  :style="{ transform: hoverBtn ? 'translateY(-2px)' : 'none', boxShadow: hoverBtn ? '0 5px 15px rgba(78, 171, 255, 0.4)' : 'none' }"
                />
              </div>
            </form>
          </div>

          <div class="col-md-6 d-flex">
            <div id="map" class="bg-white" style="width: 100%; height: 100%; min-height: 400px; border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.05);"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer - Enhanced with better spacing and hover effects -->
    <footer class="ftco-footer ftco-bg-dark ftco-section" style="background: #2c3e50 !important;">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2" style="color: white;">Skillhunt Jobboard</h2>
              <p style="color: #bdc3c7;">Connecting talented professionals with innovative companies since 2015.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li class="ftco-animate">
                  <a href="#" style="background: #3b5998;"><span class="icon-facebook"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#" style="background: #1da1f2;"><span class="icon-twitter"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#" style="background: #e1306c;"><span class="icon-instagram"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#" style="background: #0077b5;"><span class="icon-linkedin"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2" style="color: white;">Employers</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Browse Candidates</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Post a Job</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Employer Listing</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Resume Page</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-4">
              <h2 class="ftco-heading-2" style="color: white;">Candidate</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Browse Jobs</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Submit Resume</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Dashboard</a></li>
                <li><a href="#" class="pb-1 d-block" style="color: #bdc3c7;">Browse Categories</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2" style="color: white;">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li>
                    <span class="icon icon-map-marker" style="color: #4eabff;"></span>
                    <span class="text" style="color: #bdc3c7;">203 Fake St. Mountain View, San Francisco, California, USA</span>
                  </li>
                  <li>
                    <a href="#" style="color: #bdc3c7;">
                      <span class="icon icon-phone" style="color: #4eabff;"></span>
                      <span class="text">+2 392 3929 210</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" style="color: #bdc3c7;">
                      <span class="icon icon-envelope" style="color: #4eabff;"></span>
                      <span class="text">info@yoursite.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <p style="color: #bdc3c7;">
              Copyright &copy; {{ new Date().getFullYear() }} All rights reserved | Made with
              <i class="icon-heart text-danger" aria-hidden="true"></i> by
              <a href="https://colorlib.com" target="_blank" style="color: #4eabff;">Colorlib</a>
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Loader -->
    <div id="ftco-loader" class="show fullscreen">
      <svg class="circular" width="48px" height="48px">
        <circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
        <circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#4eabff" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      navbarOpen: false,
      hoverBtn: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    submitForm() {
      // Form submission logic
      console.log('Form submitted:', this.form);
      alert('Thank you for your message! We will get back to you soon.');
      this.form = { name: '', email: '', subject: '', message: '' };
    }
  },
  mounted() {
    // Initialize Google Maps
    if (window.google && window.google.maps) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
        zoom: 14,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              { "color": "#7c7c7c" }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              { "visibility": "on" },
              { "color": "#ffffff" },
              { "weight": 1.5 }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              { "visibility": "on" }
            ]
          }
        ]
      });
      
      new google.maps.Marker({
        position: { lat: 40.7128, lng: -74.0060 },
        map: map,
        title: "Our Location"
      });
    }
  }
};
</script>

<style scoped>
/* Smooth transitions for interactive elements */
.nav-link, .card, .btn, .ftco-footer-social a {
  transition: all 0.3s ease;
  color:rgb(1, 4, 7);
}

/* Hover effects */
.nav-link:hover {
  color: #4eabff !important;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

.ftco-footer-social a {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  color: white !important;
  text-decoration: none !important;
}

.ftco-footer-social a:hover {
  transform: translateY(-3px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-wrap {
    height: 50vh !important;
  }
  
  .contact-form {
    margin-top: 30px;
  }
}
</style>