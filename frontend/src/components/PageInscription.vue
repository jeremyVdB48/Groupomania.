 <!-- body de la page inscription  -->

<template>
 <!-- création d'un formulaire pour enregistrer les infos du nouveau membre -->
    <div class="container">
    <div class=" card cardInscription  m-auto  mt-5 p-5 text-center ">
    <h2 class=" display-6 text-center connexionCompte">Inscription :</h2>
    <form @submit.prevent = inscrire() class=" text-center formInscription">  <!-- @submit envoi le formulaire et .prevent annule le comportement par default(recharge la page) -->
        <div class="form-group p-2 ">
            <label for = "pseudo" class="h4">Pseudo : </label>
            <input id = "pseudo" type="text" required pattern="[a-zA-ZÀ-ÿ\-]{3,20}" class="form-control m-auto w-50 text-center " placeholder=" Ex : Jean " v-model="pseudo_utilisateur">  <!-- rajout de pattern pour rajouter des contraintes de valeur-->
        </div>

        <div class="form-group p-2">
            <label for = "email" class="h4">Email : </label>
            <input id = "email" type="text" required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" class="form-control xs-col-12 m-auto w-50 text-center" placeholder=" Ex : JeanDeLaFontaine@hotmail.fr" v-model="email_utilisateur">
        </div>

        <div class="form-group p-2">
            <label for = "password" class="h4">Password : </label>
            <input id = "password" type="password" required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" class="form-control m-auto w-50 text-center" placeholder=" Minimum huit caractères, au moins une lettre et un chiffre" v-model="password_utilisateur">
        </div>

        <button type="submit" class="btn btn-danger m-4 btn-lg  connecter">S'inscrire</button>

    </form>
    </div>
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
            // envoi(post) des informations utilisateur pour l'inscription dans la base de donnée
            axios
                .post("http://localhost:5000/api/utilisateur/inscription",{
                    pseudo_utilisateur: this.pseudo_utilisateur,
                    email_utilisateur: this.email_utilisateur,
                    password_utilisateur: this.password_utilisateur
                },
         
            ) 
            .then(reponse => {
                console.log(reponse);               
                this.$router.push ("/connexion")
                
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

.cardInscription{
    opacity: 0.9;
    box-shadow: 3px 3px 5px #afafaf;
}


</style>