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
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'games',
      path: '/games',
      component: Games
    },
    {
      name: 'stat',
      path: '/stat',
      component: Stat
    },

    {
      name: 'game',
      path: '/game/:gameId',
      component: Game,
    },
    {
      name: 'round',
      path: '/game/:gameId/:roundId',
      component: Round
    },
    {
      name: 'how',
      path: '/how',
      component: How
    },
    {
      name: 'faq',
      path: '/faq',
      component: Faq
    }
  ]
})

/*
 /etc/nginx/sites-available# nano pandanax.info

server {
 listen       80;
 server_name  localhost;

 location / {
 root   /var/www/html;
 index  index.html index.htm;

 try_files $uri $uri/ @rewrites;
 }

 location @rewrites {
 rewrite ^(.+)$ /index.html last;
 }

 # location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
 #    # Some basic cache-control for static files to be sent to the browser
 #    expires max;
 #    add_header Pragma public;
 #    add_header Cache-Control "public, must-revalidate, proxy-revalidate";
 # }

 }
 */
