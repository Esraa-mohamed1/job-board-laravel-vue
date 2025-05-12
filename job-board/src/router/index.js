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

import JobPosting from '../views/employer/posts/postjosb.vue';
import EmployerJops from '../views/employer/EmployerJops.vue'
import JobApplications from '@/views/employer/JobApplications.vue'


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
    component: () => import('@/views/employer/EmployerProfile.vue'),
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
    },
 {
      path:'myjobs',
      name: 'my-jobs',
      component:EmployerJops,
      meta: {
        requiresAuth: true,
        role: 'employer'
      }
    },
    {
      path: 'myjobs/:id/applications',
      name: 'job-applications',
      component: JobApplications,
      props: true
    }
    ]
  },

  {
    path: '/candidate',
  name: 'candidate',
  component: candidateHome,
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
        component:jobAlert
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
      // {
      //   path: 'saved',
      //   component: () => import('@/views/candidate/saved.vue')
      // },
      // {
      //   path: 'resume',
      //   component: () => import('@/views/candidate/resume.vue')
      // },
    
    ]
  },
    ]
    
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

  
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router