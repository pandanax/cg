import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Games from '../views/Games'
import Game from '../views/Game'
import Round from '../views/Round'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      path: '/game/:gameId',
      component: Game
    },
    {
      path: '/game/:gameId/:roundId',
      component: Round
    }
  ]
})
