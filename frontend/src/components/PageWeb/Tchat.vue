<template>
    <div>
        <navbartchat></navbartchat>
        <pagetchat></pagetchat>
        <basdepage></basdepage>
    </div>
</template>



<script>
import NavBarTchat from '../NavBarTchat'
import PageTchat from "../PageTchat.vue"
import BasDePage from "../BasDePage.vue"

export default {
   name : "Tchat",
   components:{
       "navbartchat" : NavBarTchat,
       "pagetchat"  : PageTchat,
       "basdepage" : BasDePage

   }
}
</script>



<style>

</style>

