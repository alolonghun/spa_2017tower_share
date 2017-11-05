import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Success from '@/pages/success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    }
  ]
})
