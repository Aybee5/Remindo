import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Moment from "moment";
import { sync } from "vuex-router-sync";
import localforage from "localforage";
import { extendMoment } from 'moment-range';
import './registerServiceWorker'

const moment = extendMoment(Moment)

Vue.use(localforage)


Vue.config.productionTip = false

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
  },
  mounted() {
    
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
