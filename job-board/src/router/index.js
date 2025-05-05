import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'
import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'
import Login from '../views/auth/login.vue'



const routes = [
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
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/candidate/dashboard',
    component: CandidateDashboard
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
