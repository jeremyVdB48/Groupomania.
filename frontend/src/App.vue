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

</style>
