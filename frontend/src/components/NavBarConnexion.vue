<!-- navBar avec bouton connexion  -->

<template>
 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-outline-danger btn-lg m-3 mb-0" @click="$router.push('/connexion')">Connexion</button>
</div>

</template>


<script>
export default {
    name : "NavBarConnexion"
}
</script>


<style>


</style>