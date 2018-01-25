import Vue from 'vue'
import App from '~/App.vue'
import router from '~/router'

var app = new Vue({
	el: '#app',
	render: h => h(App),
  router
}).$mount('#app')