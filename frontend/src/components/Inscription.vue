<template>
    <div>

        <navbarconnexion></navbarconnexion>
        <pageinscription></pageinscription>
        <basdepage></basdepage>
    </div>

</template>


<script>

import NavBarConnexion from "./NavBarConnexion.vue"
import PageInscription from "./PageInscription.vue"
import BasDePage from "./BasDePage.vue"

export default {
   name : "Inscription",
   components:{
       "navbarconnexion" : NavBarConnexion,
       "pageinscription" : PageInscription,
       "basdepage" : BasDePage
   }
}
</script>


<style>

</style>