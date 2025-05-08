

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2 sticky-top">
      <div class="container-fluid px-3 px-lg-4">
        <router-link class="navbar-brand me-3 me-lg-4" to="/">
          <img src="@/assets/logo.svg" alt="MyJob Logo" width="24" class="d-inline-block align-text-top" />
          <span class="fw-bold text-primary ms-2 fs-5">MyJob</span>
        </router-link>
  
        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" :class="{ show: navbarOpen }" id="navbarContent">
          <div class="navbar-nav me-auto d-flex flex-column flex-lg-row gap-1 gap-lg-2">
            <router-link 
              v-for="(item, index) in navItems" 
              :key="index"
              class="nav-link px-2 px-lg-3" 
              active-class="active"
              :to="item.path"
              exact
              @click="closeNavbarOnMobile"
            >
              {{ $t(item.titleKey) }}
            </router-link>
          </div>
  
          <div class="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
            <span class="me-3 text-muted mb-2 mb-lg-0">
              <i class="fas fa-phone-alt me-1"></i> +1 202-555-0156
            </span>
            <div class="dropdown">
              <button 
                class="btn btn-sm dropdown-toggle d-flex align-items-center py-1" 
                type="button" 
                @click="toggleDropdown"
              >
                <img :src="currentLanguage.flag" width="16" :alt="currentLanguage.name" class="me-1" />
                <span class="small">{{ currentLanguage.name }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: dropdownOpen }">
                <li v-for="(lang, index) in languages" :key="index">
                  <a 
                    class="dropdown-item small d-flex align-items-center" 
                    href="#"
                    @click.prevent="changeLanguage(lang)"
                  >
                    <img :src="lang.flag" width="16" :alt="lang.name" class="me-2" />
                    {{ lang.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  


  <script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()

const { locale, t } = useI18n()

const navItems = [
  { titleKey: 'nav.home', path: '/' },
  { titleKey: 'nav.jobs', path: '/jobs' },
  { titleKey: 'nav.employers', path: '/employers' },
  { titleKey: 'nav.dashboard', path: '/dashboard' },
  { titleKey: 'nav.alerts', path: '/alerts' },
  { titleKey: 'nav.support', path: '/support' }
]

const languages = [
  { name: 'English', code: 'en', flag: 'https://flagcdn.com/w20/us.png', rtl: false },
  { name: 'العربية', code: 'ar', flag: 'https://flagcdn.com/w20/eg.png', rtl: true }
]

const currentLanguage = ref(languages[0])
const navbarOpen = ref(false)
const dropdownOpen = ref(false)

const toggleNavbar = () => {
  navbarOpen.value = !navbarOpen.value
}

const closeNavbarOnMobile = () => {
  if (window.innerWidth < 992) {
    navbarOpen.value = false
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const changeLanguage = (lang) => {
  currentLanguage.value = lang
  dropdownOpen.value = false
  locale.value = lang.code

  document.documentElement.lang = lang.code
  document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr'

  localStorage.setItem('lang', lang.code)
}

onMounted(() => {
  const savedLangCode = localStorage.getItem('lang')
  if (savedLangCode) {
    const lang = languages.find(l => l.code === savedLangCode)
    if (lang) {
      currentLanguage.value = lang
      locale.value = lang.code
      document.documentElement.lang = lang.code
      document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr'
    }
  }
})
</script>



























<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
  position: relative;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  border-radius: 0.25rem;
  text-align: center;
}

.nav-link:hover:not(.active) {
  color: #64748b;
  background-color: #f8fafc;
}

.nav-link.active {
  color: #2563eb;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 15%;
  width: 70%;
  height: 2px;
  background-color: #2563eb;
  border-radius: 2px;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand span {
  transition: color 0.2s ease;
}

.navbar-brand:hover span {
  color: #1d4ed8;
}

.dropdown-toggle {
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  margin-left: 1rem;
}

.dropdown-toggle:hover {
  background-color: #f8fafc;
  border-color: #cbd5e0;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 8rem;
}

.dropdown-item {
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
  color: #2563eb;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 1rem 0;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
    margin: 0.25rem 0;
  }
  
  .nav-link.active::after {
    left: 25%;
    width: 50%;
  }
  
  .dropdown-toggle {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (min-width: 992px) {
  .nav-link {
    text-align: left;
  }
}
</style>
