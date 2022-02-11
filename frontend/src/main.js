import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import Routes from './Routes'
import moment from "moment"
import VueSessionStorage from "vue-sessionstorage"
import VueLocalStorage from "vue-localstorage"

// mise en place de bootstrap et des icons
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSessionStorage)
Vue.use(VueLocalStorage)

// permet de modifier le format de la date et heure
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: "history"// retire le # dans la barre de recherche
})

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
