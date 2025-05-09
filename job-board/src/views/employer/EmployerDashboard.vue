<template>
    <div class="dashboard-container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom py-2">
        <div class="container-fluid px-3 px-lg-4 ">
          <div class="d-flex align-items-center">
            <button 
            class="navbar-toggler me-2 d-lg-none" 
            type="button" 
            @click.stop="toggleSidebar"
            aria-label="Toggle sidebar"
            :aria-expanded="sidebarVisible.toString()"
          >
            <i class="fas fa-bars"></i>
          </button>
            <router-link class="navbar-brand me-4  me-lg-4  text-dark fw-bold fs-4" to="/">
              <i class="fas fa-briefcase me-2 text-primary fs-3"></i>MyJob
            </router-link>
            <div class="navbar-nav me-auto d-none d-lg-flex flex-row gap-3">
              <router-link class="nav-link small px-2" to="/">Home</router-link>
              <router-link class="nav-link small px-2" to="/candidates">Find Candidate</router-link>
              <router-link class="nav-link small px-2" to="/employer/dashboard">Dashboard</router-link>
              <router-link class="nav-link small px-2" to="/my-jobs">My Jobs</router-link>
              <router-link class="nav-link small px-2" to="/applications">Applications</router-link>
              <router-link class="nav-link small px-2" to="/support">Customer Support</router-link>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-3 small d-none d-md-block"><i class="fas fa-phone-alt me-1"></i> +1 202-555-0156</span>
            <div class="dropdown">
              <button class="btn btn-sm dropdown-toggle d-flex align-items-center py-1" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://flagcdn.com/w20/us.png" width="16" alt="English" class="me-1" />
                <span class="small">English</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li><a class="dropdown-item small" href="#">English</a></li>
                <li><a class="dropdown-item small" href="#">Spanish</a></li>
                <li><a class="dropdown-item small" href="#">French</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    
      <div class="container-fluid px-0">
        <div class="row g-0">
          <div  class="col-lg-3 col-xl-2 bg-white py-3 border-end"
            :class="{
                'd-none': !sidebarVisible && windowWidth < 992,
                'mobile-sidebar': windowWidth < 992,
                'd-lg-block': windowWidth >= 992
            }"
            ref="sidebar">

            <div class="sidebar-menu px-3">
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/overview" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('overview') }"
                >
                  <i class="fas fa-chart-pie me-2" :class="{ 'text-muted': !$route.path.includes('overview') }"></i>
                  <span class="small">Overview</span>
                </router-link>
              </div>
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/profile" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('profile') }"
                >
                  <i class="fas fa-building me-2" :class="{ 'text-muted': !$route.path.includes('profile') }"></i>
                  <span class="small">My Profile</span>
                </router-link>
              </div>
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/post" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('post-job') }"
                >
                  <i class="fas fa-plus-circle me-2" :class="{ 'text-muted': !$route.path.includes('post-job') }"></i>
                  <span class="small">Post a Job</span>
                </router-link>
              </div>
              
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/my-jobs" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('my-jobs') }"
                >
                  <i class="fas fa-briefcase me-2" :class="{ 'text-muted': !$route.path.includes('my-jobs') }"></i>
                  <span class="small">My Jobs</span>
                </router-link>
              </div>
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/applications" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('applications') }"
                >
                  <i class="fas fa-file-alt me-2" :class="{ 'text-muted': !$route.path.includes('applications') }"></i>
                  <span class="small">Applications</span>
                </router-link>
              </div>
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/saved-candidates" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('saved-candidates') }"
                >
                  <i class="fas fa-heart me-2" :class="{ 'text-muted': !$route.path.includes('saved-candidates') }"></i>
                  <span class="small">Saved Candidates</span>
                </router-link>
              </div>
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/billing" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('billing') }"
                >
                  <i class="fas fa-credit-card me-2" :class="{ 'text-muted': !$route.path.includes('billing') }"></i>
                  <span class="small">Plans & Billing</span>
                </router-link>
              </div>
              
              <div class="sidebar-menu-item mb-2">
                <router-link 
                  to="/employer/dashboard/settings" 
                  class="d-flex align-items-center text-decoration-none py-2 px-2 rounded"
                  :class="{ 'text-primary bg-light': $route.path.includes('settings') }"
                >
                  <i class="fas fa-cog me-2" :class="{ 'text-muted': !$route.path.includes('settings') }"></i>
                  <span class="small">Settings</span>
                </router-link>
              </div>
            </div>
            
            <div class="mt-auto px-3 pt-5">
              <button class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2" @click="logout">
                <i class="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </div>
          </div>
  
          <div  class="col-lg-9 col-xl-10 p-3 p-md-4 bg-light"
          @click="closeSidebarOnMobile">
            <div class="enhanced-search-container mb-4 ">
              <div class="search-box-enhanced">
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="fas fa-search text-primary"></i>
                  </span>
                  <input 
                    type="text" 
                    class="form-control border-start-0" 
                    placeholder="Search..." 
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                    aria-label="Search"
                  >
                  <button class="btn btn-primary" @click="performSearch">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <router-view :key="$route.fullPath"></router-view>
          </div>
        </div>
      </div>
      
      <footer class="bg-light border-top py-2 mt-auto">
        <div class="container-fluid">
          <div class="d-flex justify-content-center align-items-center">
            <small class="text-muted fs-11">© 2024 MyJob - Job Portal. All Rights Reserved</small>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { onMounted, onUnmounted  } from 'vue'
   

  const sidebarVisible = ref(false);
const windowWidth = ref(0); 

const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value >= 992) {
      sidebarVisible.value = false;
    }
  }
};

const toggleSidebar = () => {

  sidebarVisible.value = !sidebarVisible.value;
  console.log('Sidebar toggled:', sidebarVisible.value);
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
  const router = useRouter()
  const searchQuery = ref('')
  const isSidebarVisible = ref(false)



    const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    
    router.push('/login')
  }
  
  const performSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({
        path: '/employer/dashboard/search',
        query: { q: searchQuery.value.trim() }
      })
    }
  }
  </script>
  
  <style scoped>
  .dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar {
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
}

.sidebar-menu-item a {
  transition: all 0.2s ease;
}
.mobile-sidebar {
  position: fixed;
  top: 56px;
  left: 0;
  width: 280px;
  height: calc(100vh - 56px);
  z-index: 1050;
  transition: transform 0.3s ease;
}

.mobile-content-shifted {
  transform: translateX(280px);
  width: calc(100% - 280px);
}

@media (min-width: 992px) {
  .mobile-sidebar {
    position: static;
    width: auto;
    height: auto;
    transform: none;
  }
  
  .mobile-content-shifted {
    transform: none;
    width: auto;
  }

  .mobile-sidebar-overlay {
    display: none !important;
  }
}
.sidebar-menu-item a:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.sidebar-menu-item a.text-primary {
  font-weight: 500;
}

.enhanced-search-container {
  max-width: 600px;
}

.search-box-enhanced {
  width: 100%;
}

.search-box-enhanced .input-group {
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-radius: 6px;
  overflow: hidden;
}

.search-box-enhanced .input-group-text {
  border-radius: 6px 0 0 6px;
  padding: 0.5rem 0.75rem;
  border-color: #e9ecef;
}

.search-box-enhanced .form-control {
  border-color: #e9ecef;
  font-size: 0.875rem;
}

.search-box-enhanced .btn {
  border-radius: 0 6px 6px 0;
}

@media (max-width: 768px) {
  .sidebar {
    min-height: auto;
    border-end: none;
    border-bottom: 1px solid #dee2e6;
  }
  
  .enhanced-search-container {
    margin-top: 1rem;
    max-width: 100%;
  }
}
.mobile-sidebar-visible {
  position: fixed;
  top: 56px;
  left: 0;
  width: 280px;
  height: calc(100vh - 56px);
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  overflow-y: auto;
  display: block !important;
}

.mobile-content-shifted {
  margin-left: 280px;
  width: calc(100% - 280px);
}


.mobile-sidebar-visible + .bg-light::before {
  content: '';
  position: fixed;
  top: 56px;
  left: 280px;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  pointer-events: none;
}

@media (max-width: 991.98px) {
  .sidebar {
    display: none;
  }
  
  .mobile-content-shifted {
    margin-left: 0;
    width: 100%;
  }
}

@media (min-width: 992px) {
  .sidebar {
    display: block !important;
  }
  
  .mobile-content-shifted {
    margin-left: 0 !important;
    width: 100% !important;
  }
}
  .fs-11 {
    font-size: 11px;
  }
  </style>