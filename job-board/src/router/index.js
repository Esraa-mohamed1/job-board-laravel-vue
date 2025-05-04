import { createRouter, createWebHistory } from 'vue-router'
// import DefaultLayout from '../layouts/DefaultLayout.vue'
import EmployerLayout from '../layouts/EmployerLayout.vue'
// import Home from '../views/home.vue'
import EmployerProfile from '../views/employer/EmployerProfile.vue'
import CandidateRegister from '../views/candidate/register.vue'
import CandidateDashboard from '../views/candidate/dashboard.vue'

const routes = [
  // {
  //   path: '/',
  //   component: DefaultLayout,
  //   children: [
  //     { path: '', component: Home }
  //   ]
  // },
  {
    path: '/employer',
    component: EmployerLayout,
    children: [
      { path: 'profile', component: EmployerProfile }
    ]
  },
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
  history: createWebHistory(),
  routes
})

export default router
