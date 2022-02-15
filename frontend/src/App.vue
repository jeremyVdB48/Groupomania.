<template>
  <div id="app">
      <pagehaute></pagehaute>         
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
