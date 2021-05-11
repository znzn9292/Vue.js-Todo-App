import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el: '#app',
  router,
  // render (createElement) {
  //     return createElement(App)
  // },
  render: h => h(App)
})
