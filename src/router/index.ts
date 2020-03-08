import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Demos from '../views/Demos.vue'
import TestComponentDemo from '../views/TestComponentDemo.vue'
import AvatarDemo from '../views/AvatarDemo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demos',
    name: 'Demos',
    component: Demos
  },
  // {
  //   path: '/test-component-demo',
  //   name: 'TestComponentDemo',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/TestComponentDemo.vue')
  // }
  {
    path: '/test-component-demo',
    name: 'TestComponentDemo',
    component: TestComponentDemo
  },
  {
    path: '/avatar-demo',
    name: 'AvatarDemo',
    component: AvatarDemo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
