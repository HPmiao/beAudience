import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store'
import VueRouter from 'vue-router'
import router from "./router/index"
import axios from "axios";

import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)
// Vue.use(axios)
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
