import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateNewTask from "../views/CreateNewTask.vue"
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
    component: CreateNewTask
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
