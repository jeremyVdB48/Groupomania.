<template>

 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-outline-danger btn-lg m-3 mb-0" @click="$router.push('/modifMembre/:id')">Profil</button>
    <button @click="deco()" class="btn btn-outline-danger btn-lg m-3 mb-0" >Se déconnecter</button>
    
</div>

</template>


<script>
export default {
    name : "NavBarTchat",
    methods : {
        deco() {
            localStorage.clear();
            location.href = "/connexion";
        }
    }
}
</script>


<style>


</style>