import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Explorer from '../views/Explorer'
import Profile from '../views/Profile'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/explorer',
      component: Explorer
    },
    {
      path: '/profile',
      component: Profile
    }

  ]
})
