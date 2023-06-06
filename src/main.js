import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock/index.js'
import axios from 'axios';
import i18n from '../src/store/i18n';
import './plugins'

Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
