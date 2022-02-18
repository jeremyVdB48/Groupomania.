import Vue from 'vue' // on importe vue
import App from './App.vue' // chemin vers ./App.vue
import VueRouter from "vue-router" // bibliotheque officielle pour la navigation dynamique dans vue.js
import Routes from './Routes' // chemin vers ./Routes
import moment from "moment" // permet de modifier le format de la date et heure
import VueSessionStorage from "vue-sessionstorage" // permet d'enregistrer dans une session storage installé mais pas utilisé
import VueLocalStorage from "vue-localstorage" // permet d'enregistrer dans le local storage 
import Vuex from "vuex" // Vuex nous aide à créer un store centralisé qui nous permettra d'avoir cette "source unique de vérité" pour récupérer nos datas. installé mais pas utilisé


// mise en place de bootstrap et des icons
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

// indique a vue d'utiliser(VueRouter,Bootstrap etc...)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSessionStorage)
Vue.use(VueLocalStorage)
Vue.use(Vuex)

// permet de modifier le format de la date et heure
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.config.productionTip = false

// configure la route
const router = new VueRouter({
  routes: Routes,
  mode: "history"// retire le # dans la barre de recherche
})

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
