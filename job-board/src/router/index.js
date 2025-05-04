import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'
// import Home from '../views/home.vue'
import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateRegister from '../views/candidate/register.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'

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
  //   },      {
  //       path: 'dashboard',
  //       name: 'employer-dashboard',
  //       component: () => import('@/components/employer/Dashboard/EmployerOverview.vue'),
  //       meta: { requiresAuth: true, role: 'employer' }
  //     }
  //   ]
  // }
    
]},
  {
    path: '/',
    component: CandidateRegister
  },
  {
    path: '/candidate/dashboard',
    component: CandidateDashboard
  }
] 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
