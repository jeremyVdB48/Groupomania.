<template>
<div>
    <h1> Salutation membre n° {{ id }}</h1>
    <navbarprofil></navbarprofil>
    <pageprofil></pageprofil>
    <basdepage></basdepage>
    
</div>
</template>


<script>

import NavBarProfil from "./NavBarProfil.vue"
import PageProfil from "./PageProfil.vue"
import BasDePage from "./BasDePage.vue"

export default {
   name : "Profil",
   components:{
       "navbarprofil" : NavBarProfil,
       "pageprofil" : PageProfil,
       "basdepage" : BasDePage
   },
   data(){
       return{
           id: this.$route.params.id
       }
   }
}
</script>


<style>

</style>