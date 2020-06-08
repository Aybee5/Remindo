import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import New from "../components/CreateNewTask.vue"
import TaskList from "../views/ListTask.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/task/:id',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
