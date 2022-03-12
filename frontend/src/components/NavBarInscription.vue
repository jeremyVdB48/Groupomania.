<template>
 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
     <!-- ici on utilise v-on:click pour écouter l'évenement du click button et avec $router.push on envoi sur la page /inscription -->
      <button class="btn btn-outline-danger btn-lg m-3 mb-0" @click="$router.push('/inscription')">Inscription</button>
</div>

</template>


<script>
export default {
    name : "NavBarInscription"
}
</script>


<style>


</style>