import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";
import Toast from 'components/common/toast/'
import fastClick from 'fastclick'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(Toast)
Vue.use(VueLazyload, {
  loading: 'data:image/gif;base64,R0lGODlhAQABAPAAAObm5gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
})

fastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
