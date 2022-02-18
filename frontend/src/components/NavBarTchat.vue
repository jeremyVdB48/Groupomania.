 <!-- navbar du chat -->

<template>

 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-outline-danger btn-lg m-3 mb-0" @click="$router.push('/modifMembre/:id')">Profil</button> <!-- au click envoi sur la page profil -->
    <button @click="deco()" class="btn btn-outline-danger btn-lg m-3 mb-0" >Se déconnecter</button> <!-- au click du bouton envoi de la fonction deco -->
    
</div>

</template>


<script>
export default {
    name : "NavBarTchat",
    methods : {
        deco() { // fonction qui vide mon local storage et envoi sur la page connexion
            localStorage.clear();
            location.href = "/connexion";
        }
    }
}
</script>


<style>


</style>