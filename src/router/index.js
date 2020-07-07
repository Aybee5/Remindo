import Vue from 'vue'
import VueRouter from 'vue-router'
import New from "../components/CreateNewTask.vue"
import TaskList from "../views/ListTask.vue"
import Welcome from "../views/Welcome.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/task/upcoming'
  },
  {
    path: '/task/:id',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/new',
    name: 'New',
    component: New
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior : (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  // },
  routes
})

export default router
