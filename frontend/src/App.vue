<template>
  <div id="app">
    <pagehaute></pagehaute>
    <navbarinscription></navbarinscription>
    <pageconnexion></pageconnexion>
    <basdepage></basdepage>
  </div>
</template>

<script>

import PageHaute from "./components/PageHaute.vue"
import PageConnexion from "./components/PageConnexion.vue"
import BasDePage from "./components/BasDePage.vue"
import NavBarInscription from "./components/NavBarInscription.vue"



export default {
  name: 'App',
  components: {
      "pagehaute" : PageHaute,
      "pageconnexion" : PageConnexion,
      "basdepage" : BasDePage,
      "navbarinscription" : NavBarInscription
      
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
