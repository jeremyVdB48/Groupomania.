 <!-- page profil -->

<template>
<div>
    <navbarprofil></navbarprofil>
    <pageprofil></pageprofil>
    <basdepage></basdepage>
    
</div>
</template>


<script>

import NavBarProfil from "../NavBarProfil.vue"
import PageProfil from "../PageProfil.vue"
import BasDePage from "../BasDePage.vue"

export default {
   name : "Profil",
   components:{
       "navbarprofil" : NavBarProfil,
       "pageprofil" : PageProfil,
       "basdepage" : BasDePage
   },
   data(){
       return{
           
       }
   }
}
</script>


<style>

</style>