import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'
// import Home from '../views/home.vue'
import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'
import Login from '../views/auth/login.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/employer/Auth/Register.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password', 
    component: () => import('@/components/employer/Auth/ResetPassword.vue')
  },


{
  path: '/employer',
  component: EmployerLayout,
  children: [
    { 
      path: 'profile', 
      name: 'employer-profile',
      component: () => import('@/views/employer/EmployerProfile.vue'),
      meta: { requiresAuth: true } },
]},
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
] 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
