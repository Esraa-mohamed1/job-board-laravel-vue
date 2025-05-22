<template>
  <div class="home-page">
    <Navbar />

    <div>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="overlay"></div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <h1 class="hero-title fw-bold">Find Your Dream Job Today</h1>
              <p class="hero-subtitle">Join thousands of companies and candidates connecting on our platform</p>
              <div class="popular-tags">
                <span>Popular Searches:</span>
                <a class="text-decoration-none" href="#">Developer</a>
                <a class="text-decoration-none" href="#">Designer</a>
                <a class="text-decoration-none" href="#">Marketing</a>
                <a class="text-decoration-none" href="#">Remote</a>
              </div>

              <div class="stats-grid">
                <div class="stat-item">
                  <h3>5,678+</h3>
                  <p>Live Jobs</p>
                </div>
                <div class="stat-item">
                  <h3>1,234+</h3>
                  <p>Companies</p>
                </div>
                <div class="stat-item">
                  <h3>25,901+</h3>
                  <p>Candidates Hired</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block ">
              <div class="hero-image">
                <img src="../../assets/work-home-concept-design.png" alt="Job seekers illustration" class="img-fluid floating-animation">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section scroll-animate">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Browse by Category</h2>
            <p class="section-subtitle">Find jobs in your specialized field</p>
          </div>
          
          <div class="categories-grid">
            <div class="category-card">
              <div class="category-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <h3>Development</h3>
              <p>1,234 Jobs</p>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Design</h3>
              <p>876 Jobs</p>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Marketing</h3>
              <p>1,532 Jobs</p>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3>Finance</h3>
              <p>943 Jobs</p>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Human Resources</h3>
              <p>567 Jobs</p>
            </div>
          </div>
          
          <div class="text-center">
            <router-link to="/categories" class="btn btn-outline">
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Featured Jobs Section -->
      <section class="featured-jobs-section scroll-animate">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Jobs</h2>
            <p class="section-subtitle">Discover your next career opportunity with these hand-picked positions</p>
          </div>
    
          <div class="jobs-grid">
            <div class="job-card">
              <div class="job-badge">Full-time</div>
              <div class="job-content">
                <h3>Senior Frontend Developer</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    San Francisco, CA
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 2 days ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Vue.js</span>
                  <span>CSS3</span>
                </div>
              </div>
              <button class="bookmark-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            
            <div class="job-card">
              <div class="job-badge remote">Remote</div>
              <div class="job-content">
                <h3>UX/UI Designer</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Remote (Worldwide)
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 1 week ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>Figma</span>
                  <span>Prototyping</span>
                  <span>User Research</span>
                </div>
              </div>
              <button class="bookmark-btn active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            
            <div class="job-card">
              <div class="job-badge">Full-time</div>
              <div class="job-content">
                <h3>Backend Engineer (Node.js)</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    New York, NY
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 3 days ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>Node.js</span>
                  <span>TypeScript</span>
                  <span>AWS</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <button class="bookmark-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            
            <div class="job-card">
              <div class="job-badge part-time">Part-time</div>
              <div class="job-content">
                <h3>Digital Marketing Specialist</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Chicago, IL
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 5 days ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>SEO</span>
                  <span>Google Ads</span>
                  <span>Social Media</span>
                  <span>Analytics</span>
                </div>
              </div>
              <button class="bookmark-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <div class="job-card">
              <div class="job-badge remote">Remote</div>
              <div class="job-content">
                <h3>UX/UI Designer</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Remote (Worldwide)
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 1 week ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>Figma</span>
                  <span>Prototyping</span>
                  <span>User Research</span>
                </div>
              </div>
              <button class="bookmark-btn active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <div class="job-card">
              <div class="job-badge">Full-time</div>
              <div class="job-content">
                <h3>Backend Engineer (Node.js)</h3>
                <div class="job-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    New York, NY
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M2 10h20M7 6v4m4-4v4m4-4v4"></path>
                    </svg>
                    Posted 3 days ago
                  </span>
                </div>
                <div class="job-tags">
                  <span>Node.js</span>
                  <span>TypeScript</span>
                  <span>AWS</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <button class="bookmark-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="text-center">
            <router-link to="/browsejobs" class="btn btn-primary mb-5">
              Browse All Jobs
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
         </div>
      </section>


      <!-- How It Works Section -->
      <section class="how-it-works scroll-animate">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">How It Works</h2>
            <p class="section-subtitle">Get your dream job in 4 simple steps</p>
          </div>
          
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Create Account</h3>
              <p>Register and complete your profile to get noticed by employers</p>
            </div>
            
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Search Jobs</h3>
              <p>Browse thousands of job listings and find your perfect match</p>
            </div>
            
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3>Apply</h3>
              <p>Submit your application with just one click</p>
            </div>
            
            <div class="step-card">
              <div class="step-number">4</div>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Get Hired</h3>
              <p>Start your new career journey with your dream company</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section scroll-animate">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Success Stories</h2>
            <p class="section-subtitle">What our candidates say about us</p>
          </div>
          
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p>I found my dream job within a week of using this platform. The application process was so smooth and I got responses faster than any other job board I've used.</p>
              </div>
              <div class="testimonial-author">
                <img src="../../assets/portrait-handsome-young-european-man-looks-directly-camera-with-serious-expression-feels-self-confident-wears-round-transparent-glasses-casual-sweater-isolated-beige-background.jpg" alt="Sarah Johnson" class="author-avatar">
                <div class="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Product Designer at TechCorp</p>
                </div>
              </div>
            </div>
            
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p>As a hiring manager, I've found the best candidates through this platform. The quality of applicants is consistently higher than other job sites we've used.</p>
              </div>
              <div class="testimonial-author">
                <img src="../../assets/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background.jpg" alt="Michael Chen" class="author-avatar">
                <div class="author-info">
                  <h4>Michael Chen</h4>
                  <p>HR Director at InnovateCo</p>
                </div>
              </div>
            </div>
            
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p>After months of searching, I finally landed a remote position that perfectly matches my skills and career goals. The job matching algorithm is spot on!</p>
              </div>
              <div class="testimonial-author">
                <img src="../../assets/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer.jpg" alt="David Wilson" class="author-avatar">
                <div class="author-info">
                  <h4>David Wilson</h4>
                  <p>Senior Developer at RemoteFirst</p>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p>As a hiring manager, I've found the best candidates through this platform. The quality of applicants is consistently higher than other job sites we've used.</p>
              </div>
              <div class="testimonial-author">
                <img src="../../assets/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background.jpg" alt="Michael Chen" class="author-avatar">
                <div class="author-info">
                  <h4>Michael Chen</h4>
                  <p>HR Director at InnovateCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Section -->
      <section class="blog-section scroll-animate">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Career Insights & Tips</h2>
            <p class="section-subtitle">Learn from industry experts and boost your career</p>
          </div>
          
          <div class="blog-grid">
            <article class="blog-card">
              <div class="blog-image">
                <img src="../../assets/top-view-desk-concept-with-woman-hands.jpg" alt="Interview Tips" class="img-fluid">
                <div class="overlay"></div>
                <div class="blog-category">Interviewing</div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    May 15, 2023
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    John Doe
                  </span>
                </div>
                <h3>
                  <router-link  class="text-decoration-none" to="/blog/1">10 Essential Tips for Acing Your Technical Interview</router-link>
                </h3>
                <router-link to="/blog/1" class="read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </article>
            
            <article class="blog-card">
              <div class="blog-image">
                <img src="../../assets/close-up-business-person-s-hand-typing-laptop-writing-paper-with-pencil-against-pink-background.jpg" alt="Resume Writing" class="img-fluid">
                <div class="overlay"></div>
                <div class="blog-category">Resume</div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    June 2, 2023
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Jane Smith
                  </span>
                </div>
                <h3>
                  <router-link   class="text-decoration-none" to="/blog/2">The Ultimate Guide to Writing a Resume That Gets Noticed</router-link>
                </h3>
                <router-link to="/blog/2" class="read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </article>
            
            <article class="blog-card">
              <div class="blog-image">
                <img src="../../assets/business-man-working-office.jpg" alt="Remote Work" class="img-fluid">
                <div class="overlay"></div>
                <div class="blog-category">Trends</div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    June 10, 2023
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Mike Johnson
                  </span>
                </div>
                <h3>
                  <router-link  class="text-decoration-none" to="/blog/3">Remote Work in 2023: What's Changed and What to Expect</router-link>
                </h3>
                <router-link to="/blog/3" class="read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </article>
            <article class="blog-card">
              <div class="blog-image">
                <img src="../../assets/top-view-desk-concept-with-woman-hands.jpg" alt="Interview Tips" class="img-fluid">
                <div class="overlay"></div>
                <div class="blog-category">Interviewing</div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    May 15, 2023
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    John Doe
                  </span>
                </div>
                <h3>
                  <router-link  class="text-decoration-none" to="/blog/1">10 Essential Tips for Acing Your Technical Interview</router-link>
                </h3>
                <router-link to="/blog/1" class="read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </article>
            
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to take the next step in your career?</h2>
            <p>Join thousands of professionals who found their dream jobs through our platform</p>
            <div class="cta-buttons">
              <router-link to="/register" class="btn btn-primary">Get Started Now</router-link>
              <router-link to="/browsejobs" class="btn btn-outline-light">Browse Jobs</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h2>Myjob Jobboard</h2>
              <p>Connecting talented professionals with top companies worldwide to build meaningful careers and successful businesses.</p>
              <div class="social-links">
                <a href="#" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="footer-col">
              <h3>For Employers</h3>
              <ul>
                <li><a href="#">Browse Candidates</a></li>
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">Employer Listing</a></li>
                <li><a href="#">Resume Page</a></li>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Job Packages</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h3>For Candidates</h3>
              <ul>
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Submit Resume</a></li>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Browse Categories</a></li>
                <li><a href="#">My Bookmarks</a></li>
                <li><a href="#">Candidate Listing</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h3>Account</h3>
              <ul>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Sign In</a></li>
                <li><a href="#">Create Account</a></li>
                <li><a href="#">Checkout</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h3>Contact Us</h3>
              <address>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +2 392 3929 210
                </p>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  info@yoursite.com
                </p>
              </address>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>
              Copyright © {{ new Date().getFullYear() }} All rights reserved | Made with
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              by Myjob Team
            </p>
          </div>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from '@/components/homenav.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Scroll animation logic
const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
};

onMounted(() => {
  setupScrollAnimations();
})
const logout = async () => {
  try {
    const token = localStorage.getItem('authToken')

    await axios.post('/api/logout', null, {
      baseURL: 'http://127.0.0.1:8000',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    clearAuthData()
    await router.push('/login')

  } catch (error) {
    console.error('Logout error:', error)
    clearAuthData()
    await router.push('/login')
  }
}

const clearAuthData = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  localStorage.removeItem('userRole')
  delete axios.defaults.headers.common['Authorization']
}
document.addEventListener('DOMContentLoaded', function() {
  const statItems = document.querySelectorAll('.stat-item h3');
  
  statItems.forEach(item => {
    const target = +item.textContent.replace(/,|\+/g, '');
    const duration = 4000;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
        item.textContent = target.toLocaleString() + '+';
      } else {
        item.textContent = Math.floor(current).toLocaleString() + '+';
      }
    }, duration / steps);
  });
});
</script>

<style>
/* Updated CSS Variables */
/* ================ 
  CSS Variables
================ */
:root {
  --primary-color: #0059ff;
  --primary-hover: #1d4ed8;
  --secondary-color: #ffffff;
  --accent-color: #ec4899;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  
  --dark-color: #002561;
  --darker-color: #0f172a;
  --light-color: #f8fafc;
  --lighter-color: #f1f5f9;
  --gray-color: #64748b;
  --light-gray: #e2e8f0;
  --border-color: #cbd5e1;
  --white: #ffffff;
  --black: #0f172a;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  --transition: all 0.3s ease;
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* ================ 
  Base Styles
================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
               Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
  background-color: var(--light-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ================ 
  Typography
================ */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  color: var(--black);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-hover);
}
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.animate {
  opacity: 1;
  transform: translateY(0);
}

.scroll-animate.delay-1 { transition-delay: 0.2s; }
.scroll-animate.delay-2 { transition-delay: 0.4s; }
.scroll-animate.delay-3 { transition-delay: 0.6s; }
/* ================ 
  Utility Classes
================ */
.section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.25rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--gray-color);
  max-width: 700px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

/* ================ 
  Buttons
================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  font-weight: 600;
  border-radius: var(--radius);
  transition: var(--transition);
  cursor: pointer;
  border: none;
  gap: 0.5rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn-outline-light {
  background-color: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-outline-light:hover {
  background-color: var(--white);
  color: var(--primary-color);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* ================ 
  Hero Section
================ */
.hero-section {
  position: relative;
  height: 80vh;
  padding: 6rem 0;
  background: linear-gradient(90deg,rgb(38, 107, 209) 0%, rgb(77, 155, 224) 62%, rgba(219, 241, 255, 1) 100%);
  color: var(--white);
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/hero-pattern.png') center/cover no-repeat;
  opacity: 0.05;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease-out;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.search-box {
  display: flex;
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: fadeInUp 0.8s ease-out 0.4s both;
  max-width: 800px;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  border-right: 1px solid var(--light-gray);
}

.search-input svg {
  color: var(--gray-color);
  margin-right: 0.75rem;
}

.search-input input {
  flex: 1;
  border: none;
  padding: 1rem 0;
  font-size: 1rem;
  min-width: 0;
}

.search-input input:focus {
  outline: none;
}

.search-btn {
  background: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.search-btn:hover {
  background: var(--primary-hover);
}

.popular-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.popular-tags span {
  opacity: 0.8;
}

.popular-tags a {
  color: var(--white);
  background: rgba(255, 255, 255, 0.15);
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  transition: var(--transition);
}

.popular-tags a:hover {
  background: rgba(255, 255, 255, 0.25);
}

.stats-grid {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
  color: var(--white);
  font-weight: 700;
  transition: all 1s ease-out;
}

.stat-item p {
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.hero-image {
  position: relative;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
}

/* ================ 
  Categories Section
================ */
.categories-section {
  background-color: var(--white);
  margin-top: 50px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.category-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  overflow: hidden; 
  z-index: 1;
}

.category-card::before {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #043b922a;
  transition: var(--transition);
  z-index: -1; 
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.category-card:hover::before {
  top: 0;
}

.category-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  z-index: 2;
  color: var(--primary-color);
}

/* ================ 
  Jobs Section
================ */

.featured-jobs-section {
  padding: 5rem 0;
  background-color: #f8fafc;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.job-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 72, 226, 0.1), 
              0 4px 6px -2px rgba(0, 72, 226, 0.05);
  border-color: #0048e2;
}

.job-badge {
  position: absolute;
    top: 1.54rem;
    right: 0.5rem;
  background: #0048e2;
  color: #ffffff;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.job-badge.remote {
  background: #10b981;
}

.job-badge.part-time {
  background: #f59e0b;
}

.job-content {
  padding-right: 2rem; /* Space for bookmark button */
}

.job-content h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: #0f172a;
  font-weight: 700;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #64748b;
}

.job-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.job-meta svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
}

.job-tags span {
  background: rgba(0, 72, 226, 0.1);
  color: #0048e2;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 72, 226, 0.2);
}

.bookmark-btn {
  position: absolute;
  top: -0.2rem;
  right: 0.2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.bookmark-btn:hover {
  background: rgba(0, 72, 226, 0.1);
  color: #0048e2;
}

.bookmark-btn.active {
  color: #ec4899;
}

.bookmark-btn svg {
  width: 20px;
  height: 20px;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .jobs-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .featured-jobs-section {
    padding: 3rem 0;
  }
}

@media (max-width: 576px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
  
  .job-card {
    padding: 1.5rem;
  }
}

/* ================ 
  How It Works
================ */
.how-it-works {
  padding: 5rem 0;

  background-color: var(--white);
  position: relative;
  overflow: hidden;
}

.how-it-works::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/dots-pattern.png') center/cover no-repeat;
  opacity: 0.05;
  z-index: 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.step-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  overflow: hidden; 
  z-index: 1;
}

.step-card::before {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #043b922a; 
  transition: var(--transition);
  z-index: -1; 
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.step-card:hover::before {
  top: 0; 
}

.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  background: var(--primary-color);
  color: var(--white);
  border-radius: 50%;
  font-weight: 700;
}

.step-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  color: var(--primary-color);
}

/* ================ 
  Testimonials
================ */
.testimonials-section {
  background-color: var(--lighter-color);
  padding: 5rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.testimonial-content {
  position: relative;
  margin-bottom: 2rem;
  flex: 1;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  opacity: 0.1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h4 {
  margin-bottom: 0.25rem;
}

.author-info p {
  color: var(--gray-color);
  font-size: 0.875rem;
}

/* ================ 
  Blog Section
================ */
.blog-section {
  background-color: var(--white);
  padding: 4rem 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.blog-content {
  padding: 1.5rem;
  background: var(--white);
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--gray-color);
}

.blog-meta span {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.blog-content h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.blog-content h3 a {
  color: var(--black);
}

.blog-content h3 a:hover {
  color: var(--primary-color);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 1rem;
}

/* ================ 
  CTA Section
================ */
.cta-section {
  background: var(--darker-color);
  color: var(--white);
  padding: 4rem 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ================ 
  Footer
================ */
.site-footer {
  background: var(--darker-color);
  color: var(--white);
  padding: 4rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-col h2, .footer-col h3 {
  color: var(--white);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.footer-col p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 0.75rem;
}

.footer-col a {
  color: rgba(255, 255, 255, 0.7);
}

.footer-col a:hover {
  color: var(--white);
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

address p {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.footer-bottom svg {
  color: var(--accent-color);
  margin: 0 0.25rem;
}

/* ================ 
  Animations
================ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(10px);
  }
}

/* ================ 
  Responsive Styles
================ */
@media (max-width: 1200px) {
  .container {
    max-width: 1000px;
  }
}

@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .jobs-grid, .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .section {
    padding: 4rem 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .search-input {
    border-right: none;
    border-bottom: 1px solid var(--light-gray);
  }
  
  .stats-grid {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .jobs-grid, .blog-grid, .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .job-card, .blog-card {
    padding: 1.25rem;
  }
  
  .section {
    padding: 3rem 0;
  }
}
</style>