import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'

import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'
import CandidateProfile from  '../views/candidate/myprofile.vue'

import Login from '../views/auth/login.vue'



const routes = [
  // Make dashboard the default route
  {
    path: '/',
    redirect: '/dashboard'
  },
  
  {
    path: '/dashboard',
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
      // {
      //   path: 'alerts',
      //   component: () => import('@/views/candidate/alerts.vue')
      // },
      // {
      //   path: 'saved',
      //   component: () => import('@/views/candidate/saved.vue')
      // },
      // {
      //   path: 'resume',
      //   component: () => import('@/views/candidate/resume.vue')
      // },
      {
        path: '',
        redirect: 'profile' 
      }
    ]
  },

















  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/employer/Auth/Register.vue') // updated path
  },
  {
    path: '/reset-password',
    name: 'reset-password', 
    component: () => import('@/views/employer/Auth/ResetPassword.vue'), // updated path
    props: (route) => ({ token: route.query.token })
  },

  {
    path: '/employer',
    component: EmployerLayout,
    children: [
      { 
        path: 'profile', 
        name: 'employer-profile',
        component: EmployerProfile,
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/',
    component: CandidateDashboard
  },
  {
    path: '/login',
    component: Login
  },



  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/employer/Auth/ForgotPassword.vue'), // fixed casing
  },

 
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
