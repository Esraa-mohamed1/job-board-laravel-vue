<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="overlay"></div>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <h1 class="hero-title">Find Your Dream Job with Skillhunt</h1>
            <p class="hero-subtitle">Browse over 15,000 jobs from top companies and make your next career move</p>
            
            <div class="job-search-form">
              <form class="form-inline">
                <div class="form-group">
                  <span class="icon icon-search"></span>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Job title, keywords, or company"
                  >
                </div>
                <div class="form-group">
                  <span class="icon icon-map-marker"></span>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="City or postcode"
                  >
                </div>
                <button type="submit" class="btn btn-primary">
                  <span class="icon icon-search"></span> Search Jobs
                </button>
              </form>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="hero-image">
              <img src="https://th.bing.com/th/id/R.251842516da311af902688e675ef39ac?rik=iyc1AQ7AncXyeg&riu=http%3a%2f%2fsloanreview.mit.edu%2fcontent%2fuploads%2f2016%2f04%2fTechSavvy-20160414-1200-1200x627.jpg&ehk=WKjn1QZNNPYk7DSGpWZHg2p3P%2bne9mNzl8FoItlRTHc%3d&risl=&pid=ImgRaw&r=0" alt="Job seekers" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="section-title">Popular Job Categories</h2>
            <p class="section-subtitle">Browse jobs by your preferred category</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-3 col-sm-6" v-for="(category, index) in categories" :key="index">
            <div class="category-card">
              <div class="category-icon" :class="'icon-' + (index + 1)">
                <span :class="category.icon"></span>
              </div>
              <h3>{{ category.name }}</h3>
              <p>{{ category.jobs }} Open Positions</p>
              <router-link to="/browsejobs" class="btn-link">Browse Jobs <span class="icon-arrow-right"></span></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs Section -->
    <section class="featured-jobs-section bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="section-title">Featured Jobs</h2>
            <p class="section-subtitle">Find your next career opportunity from these featured jobs</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6" v-for="(job, index) in featuredJobs" :key="index">
            <div class="job-card">
              <div class="job-logo">
                <img :src="job.logo" :alt="job.company" class="img-fluid">
              </div>
              <div class="job-details">
                <span class="job-type" :class="job.type === 'Full Time' ? 'full-time' : 'part-time'">{{ job.type }}</span>
                <h3><router-link :to="'/job/' + job.id">{{ job.title }}</router-link></h3>
                <p class="company">{{ job.company }}</p>
                <div class="job-meta">
                  <span class="location"><span class="icon-map-marker"></span> {{ job.location }}</span>
                  <span class="salary"><span class="icon-money"></span> ${{ job.salary }}/yr</span>
                </div>
              </div>
              <div class="job-actions">
                <button class="btn btn-save" @click="saveJob(job)">
                  <span class="icon-bookmark"></span>
                </button>
                <router-link :to="'/job/' + job.id" class="btn btn-apply">Apply Now</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <router-link to="/browsejobs" class="btn btn-primary btn-lg">Browse All Jobs</router-link>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="section-title">How It Works</h2>
            <p class="section-subtitle">Get your dream job in 4 simple steps</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-3" v-for="(step, index) in steps" :key="index">
            <div class="step-card">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-icon">
                <span :class="step.icon"></span>
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="section-title">What Our Candidates Say</h2>
            <p class="section-subtitle">Success stories from people who found their dream jobs through Skillhunt</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p>"{{ testimonial.quote }}"</p>
              </div>
              <div class="testimonial-author">
                <img :src="testimonial.image" :alt="testimonial.name" class="author-img">
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <span>{{ testimonial.position }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h2>Ready to take the next step in your career?</h2>
            <p>Join thousands of professionals who found their dream jobs through Skillhunt</p>
          </div>
          <div class="col-lg-4 text-lg-right">
            <router-link to="/register" class="btn btn-primary btn-lg">Create Free Account</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      categories: [
        { name: 'Web Development', jobs: 1243, icon: 'icon-code' },
        { name: 'Graphic Design', jobs: 845, icon: 'icon-paint-brush' },
        { name: 'Marketing', jobs: 1120, icon: 'icon-bullhorn' },
        { name: 'Data Science', jobs: 932, icon: 'icon-chart-bar' },
        { name: 'Customer Support', jobs: 756, icon: 'icon-headset' },
        { name: 'Project Management', jobs: 689, icon: 'icon-briefcase' },
        { name: 'Healthcare', jobs: 1024, icon: 'icon-heartbeat' },
        { name: 'Education', jobs: 587, icon: 'icon-graduation-cap' }
      ],
      featuredJobs: [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          type: 'Full Time',
          salary: '120,000',
          logo: '/images/company-logo-1.png'
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'DesignHub',
          location: 'New York, NY',
          type: 'Full Time',
          salary: '95,000',
          logo: '/images/company-logo-2.png'
        },
        {
          id: 3,
          title: 'Digital Marketing Specialist',
          company: 'MarketMasters',
          location: 'Remote',
          type: 'Part Time',
          salary: '65,000',
          logo: '/images/company-logo-3.png'
        },
        {
          id: 4,
          title: 'Data Analyst',
          company: 'DataSystems',
          location: 'Boston, MA',
          type: 'Full Time',
          salary: '85,000',
          logo: '/images/company-logo-4.png'
        }
      ],
      steps: [
        {
          title: 'Create Account',
          description: 'Sign up and create your professional profile',
          icon: 'icon-user-plus'
        },
        {
          title: 'Search Jobs',
          description: 'Browse thousands of job listings',
          icon: 'icon-search'
        },
        {
          title: 'Apply for Jobs',
          description: 'Submit applications to companies',
          icon: 'icon-paper-plane'
        },
        {
          title: 'Get Hired',
          description: 'Start your new career journey',
          icon: 'icon-trophy'
        }
      ],
      testimonials: [
        {
          quote: 'Skillhunt helped me find my dream job in just two weeks! The platform is so easy to use and the job recommendations were spot on.',
          name: 'Sarah Johnson',
          position: 'Product Designer at Google',
          image: '/images/testimonial-1.jpg'
        },
        {
          quote: 'After months of searching, I finally found the perfect job through Skillhunt. The application process was seamless and the support team was amazing.',
          name: 'Michael Chen',
          position: 'Senior Developer at Amazon',
          image: '/images/testimonial-2.jpg'
        },
        {
          quote: 'As a recent graduate, I was struggling to find entry-level positions. Skillhunt connected me with companies looking for fresh talent.',
          name: 'Jessica Williams',
          position: 'Marketing Associate at Facebook',
          image: '/images/testimonial-3.jpg'
        }
      ]
    }
  },
  methods: {
    saveJob(job) {
      // Placeholder for save job functionality
      console.log('Job saved:', job);
      alert(`Job "${job.title}" has been saved to your bookmarks!`);
    }
  }
}
</script>

<style scoped lang="scss">
// Color Variables
$primary-color: #2c98f0; // Blue
$secondary-color: #4CAF50; // Green
$accent-color: #f9bf3f; // Yellow
$dark-color: #1e2a3a; // Dark Blue
$light-color: #f8f9fa; // Light Gray
$text-color: #555555;
$border-color: #eaeaea;

// Base Styles
.home-page {
  font-family: 'Poppins', sans-serif;
  color: $text-color;
  line-height: 1.6;
}

// Hero Section
.hero-section {
  position: relative;
  padding: 120px 0;
  background: linear-gradient(135deg, rgba($primary-color, 0.9), rgba($secondary-color, 0.9)), 
              url('/images/hero-bg.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($dark-color, 0.7);
    z-index: 1;
  }
  
  .container {
    position: relative;
    z-index: 2;
  }
  
  .hero-title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .job-search-form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    .form-inline {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      
      .form-group {
        flex: 1;
        min-width: 200px;
        position: relative;
        
        .icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: $primary-color;
        }
        
        .form-control {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid $border-color;
          border-radius: 6px;
          font-size: 0.95rem;
          
          &:focus {
            border-color: $primary-color;
            box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
          }
        }
      }
      
      .btn {
        background: $primary-color;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover {
          background: darken($primary-color, 10%);
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .hero-image {
    img {
      border-radius: 8px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
  }
}

// Section Common Styles
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: $dark-color;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: $primary-color;
  }
}

.section-subtitle {
  font-size: 1.1rem;
  color: lighten($text-color, 20%);
  margin-bottom: 3rem;
}

// Categories Section
.categories-section {
  padding: 80px 0;
  
  .category-card {
    background: white;
    border-radius: 8px;
    padding: 30px 20px;
    margin-bottom: 30px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid $border-color;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      border-color: $primary-color;
    }
    
    .category-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: white;
      
      span {
        transition: all 0.3s ease;
      }
      
      &.icon-1 { background: $primary-color; }
      &.icon-2 { background: $secondary-color; }
      &.icon-3 { background: #9c27b0; }
      &.icon-4 { background: #ff5722; }
      &.icon-5 { background: #607d8b; }
      &.icon-6 { background: #ff9800; }
      &.icon-7 { background: #e91e63; }
      &.icon-8 { background: #00bcd4; }
    }
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: $dark-color;
    }
    
    p {
      color: $text-color;
      margin-bottom: 15px;
    }
    
    .btn-link {
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      
      &:hover {
        color: darken($primary-color, 10%);
        
        .icon-arrow-right {
          transform: translateX(5px);
        }
      }
      
      .icon-arrow-right {
        margin-left: 5px;
        transition: all 0.3s ease;
      }
    }
  }
}

// Featured Jobs Section
.featured-jobs-section {
  padding: 80px 0;
  
  .job-card {
    background: white;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    border: 1px solid $border-color;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-color: $primary-color;
    }
    
    .job-logo {
      width: 80px;
      height: 80px;
      margin-right: 20px;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    
    .job-details {
      flex: 1;
      
      .job-type {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 10px;
        
        &.full-time {
          background: rgba($secondary-color, 0.1);
          color: $secondary-color;
        }
        
        &.part-time {
          background: rgba($accent-color, 0.1);
          color: darken($accent-color, 20%);
        }
      }
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 5px;
        
        a {
          color: $dark-color;
          text-decoration: none;
          
          &:hover {
            color: $primary-color;
          }
        }
      }
      
      .company {
        color: $text-color;
        margin-bottom: 10px;
        font-size: 0.9rem;
      }
      
      .job-meta {
        display: flex;
        gap: 15px;
        font-size: 0.85rem;
        
        .location, .salary {
          display: flex;
          align-items: center;
          
          .icon {
            margin-right: 5px;
            color: $primary-color;
          }
        }
      }
    }
    
    .job-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-left: 20px;
      
      .btn-save {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba($dark-color, 0.05);
        color: $dark-color;
        border: none;
        transition: all 0.3s ease;
        
        &:hover {
          background: $primary-color;
          color: white;
        }
      }
      
      .btn-apply {
        background: $primary-color;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 15px;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover {
          background: darken($primary-color, 10%);
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .btn-primary {
    background: $primary-color;
    border: none;
    padding: 12px 30px;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-2px);
    }
  }
}

// How It Works Section
.how-it-works-section {
  padding: 80px 0;
  
  .step-card {
    text-align: center;
    padding: 30px 20px;
    position: relative;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      border-radius: 8px;
      z-index: -1;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    
    &:hover::before {
      opacity: 1;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      background: $primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin: 0 auto 20px;
    }
    
    .step-icon {
      width: 70px;
      height: 70px;
      background: rgba($primary-color, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 1.8rem;
      color: $primary-color;
      transition: all 0.3s ease;
    }
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: $dark-color;
    }
    
    p {
      color: $text-color;
      font-size: 0.95rem;
    }
    
    &:hover {
      .step-icon {
        background: $primary-color;
        color: white;
        transform: scale(1.1);
      }
    }
  }
}

// Testimonials Section
.testimonials-section {
  padding: 80px 0;
  
  .testimonial-card {
    background: white;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 30px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    
    &::before {
      content: '"';
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 4rem;
      color: rgba($primary-color, 0.1);
      font-family: Georgia, serif;
      line-height: 1;
    }
    
    .testimonial-content {
      position: relative;
      z-index: 1;
      margin-bottom: 20px;
      font-style: italic;
      color: $text-color;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      
      .author-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 15px;
        border: 3px solid $primary-color;
      }
      
      .author-info {
        h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: $dark-color;
        }
        
        span {
          font-size: 0.85rem;
          color: lighten($text-color, 20%);
        }
      }
    }
  }
}

// Call to Action Section
.cta-section {
  padding: 60px 0;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 0;
  }
  
  .btn {
    background: white;
    color: $primary-color;
    border: none;
    padding: 12px 30px;
    font-weight: 600;
    border-radius: 6px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(white, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
}

// Responsive Adjustments
@media (max-width: 991.98px) {
  .hero-section {
    padding: 80px 0;
    
    .hero-title {
      font-size: 2.2rem;
    }
    
    .hero-image {
      margin-top: 40px;
    }
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .job-card {
    flex-direction: column;
    text-align: center;
    
    .job-logo {
      margin-right: 0;
      margin-bottom: 20px;
    }
    
    .job-actions {
      margin-left: 0;
      margin-top: 20px;
      flex-direction: row;
      justify-content: center;
    }
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 60px 0;
    
    .hero-title {
      font-size: 1.8rem;
    }
    
    .hero-subtitle {
      font-size: 1rem;
    }
    
    .job-search-form .form-inline .form-group {
      min-width: 100%;
    }
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .category-card, .testimonial-card {
    padding: 20px;
  }
  
  .cta-section {
    text-align: center;
    
    .btn {
      margin-top: 20px;
    }
  }
}
</style>