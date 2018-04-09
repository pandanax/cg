import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Games from '../views/Games'
import Game from '../views/Game'
import Round from '../views/Round'
import Stat from '../views/Stat'
import How from '../views/How'
import Faq from '../views/Faq'

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
      path: '/profile',
      component: Profile
    },
    {
      path: '/games',
      component: Games
    },
    {
      path: '/stat',
      component: Stat
    },

    {
      path: '/game/:gameId',
      component: Game,
    },
    {
      path: '/game/:gameId/:roundId',
      component: Round
    },
    {
      path: '/how',
      component: How
    },
    {
      path: '/faq',
      component: Faq
    }
  ]
})
