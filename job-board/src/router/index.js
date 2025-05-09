import { createRouter, createWebHistory } from 'vue-router'
import EmployerLayout from '../layouts/EmployerLayout.vue'

import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'
import CandidateProfile from '../views/candidate/myprofile.vue'
import Login from '../views/auth/login.vue'

import profile from '../views/employer/profile.vue'
import EmployerDashboard from '../views/employer/EmployerDashboard.vue'
import EmployerOverview from '@/views/employer/Auth/EmployerOverview.vue'

import admindashboard from '../views/admin/home.vue'



import JobPosting from '@/views/employer/posts/postjosb.vue';



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
        path: 'steps', 
        name: 'employer-steps',
        component: EmployerProfile,
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/employer/edit/:id',
    name: 'EmployerProfile',
    component:EmployerProfile ,
    props: true
  },









  
  {
    path: '/employer/dashboard',
  name: 'employer-dashboard',
  component: EmployerDashboard,
  children: [
    {
      path: '',
      redirect: { name: 'employer-overview' }
    },
    {
      path: 'overview',
      name: 'employer-overview',
      component: EmployerOverview
    },{
      path: 'profile',
      name: 'employer-profile',
      component: profile
    },
    {
      path: 'post',
      name: 'JobPosting',
      component: JobPosting,
      meta: {
        requiresAuth: true,
        role: 'employer'
      }
    }
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
,
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/employer/Auth/ForgotPassword.vue'), 
  },
 ,
  {
    path:'/admin',
    name:'admin',
    component: admindashboard,
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
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router