<template>
  <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm position-relative">
    <div class="container">
      <div class="d-flex w-100 align-items-center">

        <router-link class="navbar-brand me-4 text-dark fw-bold fs-4" to="/">
          <i class="fas fa-briefcase me-2 text-primary fs-3"></i> MyJob
        </router-link>

        <div class="d-flex flex-grow-1 mx-4 position-relative" style="max-width: 500px;">
          <div class="dropdown me-2">
            <button class="btn btn-outline-secondary dropdown-toggle py-2" type="button"
              id="countryDropdown" data-bs-toggle="dropdown">
              Egypt
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">USA</a></li>
              <li><a class="dropdown-item" href="#">UK</a></li>
            </ul>
          </div>

          <div class="input-group w-100">
            <span class="input-group-text bg-light border-end-0">
              <i class="fas fa-search text-primary"></i>
            </span>
            <input
              v-model="search"
              @keydown.enter="handleSearch"
              @input="fetchJobs"
              type="text"
              class="form-control border-start-0"
              placeholder="Search for jobs"
              aria-label="Search"
            />
          </div>

          <div
            class="search-results position-absolute bg-white shadow w-100 rounded mt-1"
            v-if="jobs.length && search.length"
          >
            <div
              v-for="job in jobs"
              :key="job.id"
              class="search-result-item py-2 px-3 border-bottom"
            >
              <router-link :to="`/candidate/jobs/${job.id}`" class="text-dark text-decoration-none">
                {{ job.title }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center ms-auto">
          <button class="btn btn-light position-relative me-3">
            <i class="fas fa-bell text-primary fs-4"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1
            </span>
          </button>

          <div class="dropdown">
            <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../../assets/candidate2.jpg" alt="User"
                class="rounded-circle" width="50" height="50">
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/candidate/dashboard/profile">
                  <i class="fas fa-user me-2"></i> My Profile
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                  <i class="fas fa-sign-out-alt me-2"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const search = ref('')
const jobs = ref([])
const router = useRouter()

const handleSearch = () => {
  if (search.value.trim()) {
    router.push({ name: 'JobBoard', query: { search: search.value.trim() } })
  }
}

const fetchJobs = async () => {
  if (!search.value.trim()) {
    jobs.value = []
    return
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/jobs', {
      params: { search: search.value.trim() }
    })
    jobs.value = response.data.data || []
  } catch (error) {
    console.error('Search error:', error)
    jobs.value = []
  }
}

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
</script>

<style scoped>
/* Navbar Styling */
header {
  border-bottom: 1px solid #e9ecef;
}
img {
  object-fit: cover;
}

/* Dropdown Styling */
.dropdown-toggle {
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}
.dropdown-toggle::after {
  display: none;
}
.dropdown-menu {
  margin-top: 10px;
  border: none;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}
.dropdown-item {
  padding: 8px 16px;
  font-size: 0.9rem;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}
.dropdown-item i {
  width: 20px;
  text-align: center;
}

/* Input Styling */
.input-group-text {
  padding: 0.5rem 1rem;
}
.form-control {
  padding: 0.5rem;
}

/* Live Search Results */
.search-results {
  top: 100%;
  z-index: 1050;
  max-height: 250px;
  overflow-y: auto;
}
.search-result-item:hover {
  background-color: #f8f9fa;
}
</style>
