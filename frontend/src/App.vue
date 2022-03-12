<!--  -->

<template>
  <div id="app">
      <pagehaute></pagehaute>   
            <!-- router-view définit l'endroit ou apparaitrons les composants définit par chaque route  -->
      <router-view></router-view> 
  </div>
</template>


<script>

import PageHaute from "./components/PageHaute"

export default {
  name: 'App',
  components: {
      "pagehaute": PageHaute
      
  }
}
</script>

<style>

body{
  background-image: url("./assets/icon.png");
  background-repeat: no-repeat;
  background-position: center;
  background-position: fixed;
  background-size: 80%;
}


</style>
