import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import './plugins/element.js'
import './assets/css/font/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css' 
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$http=axios
Vue.use(animated)
// 配置请求的根路径
// axios.defaults.baseURL = 'http://shopeach.lqtt.icu:8888/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
