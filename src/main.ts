import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin'

Vue.config.productionTip = false

import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
