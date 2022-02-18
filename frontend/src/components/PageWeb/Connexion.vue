 <!-- page connexion -->

<template>
    <div>
        <navbarinscription></navbarinscription>
        <pageconnexion></pageconnexion>
        <basdepage></basdepage>
    
    </div>
</template>


<script>

import NavBarInscription from "../NavBarInscription.vue"
import PageConnexion from "../PageConnexion.vue"
import BasDePage from "../BasDePage.vue"

export default {
   name : "Connexion",
   components:{
       "navbarinscription" : NavBarInscription,
       "pageconnexion" : PageConnexion,
       "basdepage" : BasDePage
   }
  
}
</script>


<style>

</style>