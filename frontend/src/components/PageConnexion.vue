<template> 
<div class=" card w-50 m-auto mt-5 p-5 text-center ">
    <h2 class=" display-6 text-center connexionCompte">Connexion à mon compte :</h2>
    <div class=" text-center">
        <div class="form-group p-2 ">
            <label for = "pseudo" class="h4">Pseudo : </label>
            <input id = "pseudo" type="text" class="form-control m-auto w-50">
        </div>

        <div class="form-group p-2">
            <label for = "password" class="h4">Password : </label>
            <input id = "password" type="text" class="form-control m-auto w-50 " >
        </div>

        <button type="button" class="btn btn-danger m-4 btn-lg connecter">Se connecter</button>

    </div>
   
    </div>
</template>

<script>
export default {
   name: "PageConnexion"
}
</script>

<style >

.connexionCompte{
    color: #d1515a;
    
}

</style>