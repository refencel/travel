// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import qs from 'qs'

import '@/assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
import './assets/css/font.css'

axios.defaults.baseURL = "https://easy-mock.com/mock/59e56d9df757730a12fcdeec/travel/";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
    data = qs.stringify(data)
	return data
};

Vue.config.productionTip = false;
Vue.use(VueSwiper);
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
