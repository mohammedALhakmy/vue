import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/View.vue'
import StudentViewCreate from '../views/Student/create.vue'
import StudentViewEdit from '../views/Student/edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },{
      path: '/students',
      name: 'students',
      component: StudentView
    },{
      path: '/students/create',
      name: 'studentsCreate',
      component: StudentViewCreate
    },{
      path: '/students/:id/edit',
      name: 'studentsEdit',
      component: StudentViewEdit
    }
  ]
})

export default router
