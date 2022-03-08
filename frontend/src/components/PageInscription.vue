 <!-- body de la page inscription  -->

<template>
 <!-- création d'un formulaire pour enregistrer les infos du nouveau membre avec utilisation de pattern -->
    <div class="container">
    <div class=" card cardInscription  m-auto  mt-5 p-5 text-center ">
    <h2 class=" display-6 text-center connexionCompte">Inscription :</h2>
    <form @submit.prevent = inscrire() class=" text-center formInscription">  <!-- @submit envoi le formulaire et .prevent annule le comportement par default(recharge la page) -->
        <div class="form-group p-2 ">
            <label for = "pseudo" class="h4">Pseudo : </label>
            <input id = "pseudo" type="text" required pattern="[a-zA-ZÀ-ÿ\-]{3,20}" class="form-control m-auto w-50 text-center " placeholder=" Ex : Jean " v-model="pseudo_utilisateur"> 
        </div>

        <div class="form-group p-2">
            <label for = "email" class="h4">Email : </label>
            <input id = "email" type="text" required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" class="form-control xs-col-12 m-auto w-50 text-center" placeholder=" Ex : JeanDeLaFontaine@hotmail.fr" v-model="email_utilisateur">
        </div>

        <!-- message d'erreur en cas d'email déja utilisé -->
        <p v-if="message_err" class="text-danger messErreur">Email déja utilisé !</p>

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
            password_utilisateur:"",
            message_err: false
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
            .catch((error) => { // // si l'erreur est une erreur 401 on passe le message a true
                if (error.response.status === 401) {
                    this.message_err = true
                }
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
.messErreur {
    animation: pulse 1.5s linear;
}

@keyframes pulse {

    0%{opacity: 1;}
    25%{opacity: 0;}
    50%{opacity: 1;}
    75%{opacity: 0;}
    100%{opacity: 1;}
}


</style>