import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'
import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'
import CandidateProfile from '../views/candidate/myprofile.vue'
import findjob from '../views/candidate/findJob.vue'
import Login from '../views/auth/login.vue'
import profile from '../views/employer/profile.vue'
import EmployerDashboard from '../views/employer/EmployerDashboard.vue'
import EmployerOverview from '@/views/employer/Auth/EmployerOverview.vue'
import admindashboard from '../views/admin/home.vue'
import candidateHome from '../views/candidate/home.vue'
import jobDetails from '../views/candidate/jobDetails.vue'
import jobAlert from '../views/candidate/jobAlert.vue'
import candidateSupport from '../views/candidate/candidateSupport.vue'
import overview from '../views/candidate/overview.vue'
import JobPosting from '../views/employer/posts/postjosb.vue'
import EmployerJops from '../views/employer/EmployerJops.vue'
import JobApplications from '@/views/employer/JobApplications.vue'
import BrowseJobs from '../views/home/browsejobs.vue'
import Blog from '../views/home/blog.vue'
import Contact from '../views/home/contact.vue'
import Home from '../views/home/home.vue'
import NotFound from '@/views/auth/NotFound.vue'
import unauthorized from '@/views/auth/Unauthorized.vue'
const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/employer/Auth/Register.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/employer/Auth/ResetPassword.vue'),
    props: route => ({ token: route.query.token })
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/employer/Auth/ForgotPassword.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'admin',
    component: admindashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/employer',
    component: EmployerLayout,
    children: [
      {
        path: 'steps',
        name: 'employer-steps',
        component: EmployerProfile,
        meta: { requiresAuth: true, role: 'employer' }
      }
    ]
  },

  {
    path: '/employer/dashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, role: 'employer' },
    children: [
      {
        path: '',
        name: 'employer-dashboard',
        redirect: { name: 'employer-overview' }
      },
      {
        path: 'overview',
        name: 'employer-overview',
        component: EmployerOverview
      },
      {
        path: 'profile',
        name: 'employer-profile',
        component: profile
      },
      {
        path: 'post',
        name: 'JobPosting',
        component: JobPosting,
        meta: { requiresAuth: true, role: 'employer' }
      },
      {
        path: 'myjobs',
        name: 'my-jobs',
        component: EmployerJops,
        meta: { requiresAuth: true, role: 'employer' }
      },
      {
        path: 'myjobs/:id/applications',
        name: 'job-applications',
        component: JobApplications,
        props: true
      },
      {
        path: 'settings',
        name: 'EmployerProfileEdit',
        component: () => import('../views/employer/EditEmployerProfile.vue'),
        meta: { requiresAuth: true, role: 'employer' }
      },
    ]
  },
  {
    path: '/candidate',
    name: 'candidate',
    component: candidateHome,
    meta: { requiresAuth: true, role: 'candidate' },
    children: [
      {
        path: 'findjob',
        component: findjob
      },
      {
        path: 'jobs/:id',
        name: 'JobDetails',
        component: jobDetails
      },
      {
        path: 'alerts',
        component: jobAlert
      },
      {
        path: 'Candidate-Support',
        component: candidateSupport
      },
      {
        path: 'dashboard',
        component: CandidateDashboard,
        children: [
          {
            path: 'profile',
            component: CandidateProfile
          },
          {
            path: 'applications',
            component: () => import('@/views/candidate/applications.vue')
          },
          {
            path: 'alerts',
            component: () => import('@/views/candidate/jobAlert.vue')
          },
          {
            path: '',
            redirect: { name: 'overview' }
          },
          {
            path: 'overview',
            name: 'overview',
            component: overview
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browsejobs',
    name: 'BrowseJobs',
    component: BrowseJobs
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: unauthorized
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
 const authToken = localStorage.getItem('authToken')
const userRole = localStorage.getItem('userRole')
const isAuthenticated = !!authToken

  if (to.path === '/login' && isAuthenticated) {
    if (userRole === 'admin') return next('/admin')
    if (userRole === 'employer') return next('/employer/dashboard')
    if (userRole === 'candidate') return next('/candidate/dashboard')
    return next('/')
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/unauthorized')
  }

  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    return next('/unauthorized')
  }

  next()
})


export default router
