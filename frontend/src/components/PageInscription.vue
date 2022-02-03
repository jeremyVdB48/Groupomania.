<template>
    <div class=" card w-50 m-auto mt-5 p-5 text-center ">
    <h2 class=" display-6 text-center connexionCompte">Inscription :</h2>
    <form @submit.prevent = inscrire() class=" text-center">
        <div class="form-group p-2 ">
            <label for = "pseudo" class="h4">Pseudo : </label>
            <input id = "pseudo" type="text" required pattern="[a-zA-ZÀ-ÿ\-]{3,20}" class="form-control m-auto w-50"  v-model="pseudo_utilisateur">
        </div>

        <div class="form-group p-2">
            <label for = "email" class="h4">Email : </label>
            <input id = "email" type="text" required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" class="form-control m-auto w-50 "  v-model="email_utilisateur">
        </div>

        <div class="form-group p-2">
            <label for = "password" class="h4">Password : </label>
            <input id = "password" type="text" required pattern="[a-zA-ZÀ-ÿ\-\0-9]{2,50}" class="form-control m-auto w-50 "  v-model="password_utilisateur">
        </div>

        <button type="submit" class="btn btn-danger m-4 btn-lg connecter">S'inscrire</button>

    </form>
   
    </div>
</template>

<script>

 import axios from "axios"

export default {
    name : "PageInscription",
    data() {
        return {
            pseudo_utilisateur:"",
            email_utilisateur:"",
            password_utilisateur:""
        }
    },
    

    methods: {
        inscrire(){

            axios
                .post("http://localhost:5000/api/utilisateur/inscription",{
                    pseudo_utilisateur: this.pseudo_utilisateur,
                    email_utilisateur: this.email_utilisateur,
                    password_utilisateur: this.password_utilisateur
                },
         
            )
            .then(reponse => {
                console.log(reponse);
                if(reponse.status ==201){
                    this.$router.push ("/connexion")
                }
            })
            .catch((error) => {
                console.log(error);
                console.log("Echec de votre inscription !");
            })
        }
   }
}


</script>

<style>

</style>