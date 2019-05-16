import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/quasar.styl'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import Quasar from 'quasar'
import animate from 'animate.css'
import wowjs from 'wowjs'
import axios from 'axios'
import Cookies from 'js-cookie'
import vCharts from 'v-charts'
import Vuelidate from 'vuelidate'
import Video from 'video.js'
import 'video.js/dist/video-js.css'


Vue.prototype.$axios = axios
Vue.prototype.$video = Video
Vue.use(Cookies)
Vue.use(wowjs)
Vue.use(animate)
Vue.use(vCharts)
Vue.use(Vuelidate)//安装插件
Vue.use(Quasar, {
  config: {}
 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
