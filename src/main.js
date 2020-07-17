import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Moment from "moment";
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    $back() {
      window.history.back()
    },
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
