import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import filter from './filter'
import localization from 'vuejs-localization'

import BootstrapVue from 'bootstrap-vue'

import VueLodash from 'vue-lodash'

const options = { name: 'lodash' } // customize the way you want to call it


localization.requireAll(require.context('./lang', true, /\.js$/));


Vue.use(VueLodash, options) // options is optional
Vue.use(BootstrapVue);
Vue.use(localization);

sync(store, router)



const app = new Vue({
  router,
  store,
  filter,
  ...App
})

export { app, router, store, filter}


