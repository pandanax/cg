import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Explorer from '../views/Explorer'

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
    }

  ]
})
