import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Moment from "moment";
import { sync } from "vuex-router-sync";
import localforage from "localforage";
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)
// import VueWorker from 'vue-worker'

// Vue.use(VueWorker)
Vue.use(localforage)


Vue.config.productionTip = false

// Vue.use(moment)

sync(store, router)

Vue.mixin({
  methods: {
    $back() {
      window.history.back()
    },
    // $workee() {
    //   VueWorker.run(store.dispatch("checkUpcomingTime"))
    // },
    moment
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
