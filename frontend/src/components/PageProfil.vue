 <!-- body de la page profil -->

<template> 
 <!-- création d'un formulaire pour modifier les données utilisateur -->
<div class="container">
    <div class=" card cardProfil  m-auto mt-5 p-5 text-center ">
        <h2 class=" display-6 text-center connexionCompte">Modification du profil :</h2>
        <form @submit.prevent = Modifier() class=" text-center">
            <div  class="form-group p-2 ">
                <label for = "pseudo" class="h4">Pseudo : </label>
                <input id = "pseudo" type="text"  class="form-control m-auto w-50" v-model="pseudo_utilisateur">
            </div>

            <div class="form-group p-2">
                <label for = "email" class="h4">Email : </label>
                <input id = "email" type="text"  class="form-control m-auto w-50 " v-model="email_utilisateur" >
            </div>

            <div class="form-group p-2">
                <label for = "password" class="h4">Password : </label>
                <input id = "password" type="text"  class="form-control m-auto w-50 " v-model="password_utilisateur" >
            </div>

            <button type="submit" class="btn btn-danger m-4 btn-lg connecter">Modifier</button>
        </form>  
    </div>
</div>
</template>


<script>

import axios from "axios"

export default {
   name: "PageProfil",
    data() {
        return {
             pseudo_utilisateur:"",
            email_utilisateur:"",
            password_utilisateur:""
        }
    },

    methods: {
        // ici on utilise put pour modifier les informations utilisateur
        Modifier() {

             let data = JSON.parse(this.$localStorage.get("utilisateur"));
    console.log(data);
            axios
                .put(`http://localhost:5000/api/utilisateur/modifMembre/${data.userId}`,{
                    pseudo_utilisateur: this.pseudo_utilisateur,
                    email_utilisateur: this.email_utilisateur,
                    password_utilisateur: this.password_utilisateur
                },
                 { 
                 headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                        }  
                  }      
                ) // si resultat es true on envoi le status 201 et envoi sur la page connexion
                .then(reponse => {
                    console.log("mise a jour de votre compte réussi !");
                    console.log(reponse);
                    // if(reponse.status==201){
                         this.$router.push ("/connexion")
                    // }
                })// si resultat es false
                .catch((error) => {
                    console.log(error);
                    console.log("Echec de la mise à jour de votre compte !");
                })
        }
    }

}


</script>


<style >

.connexionCompte{
    color: #d1515a;
    
}
.cardProfil{
    opacity: 0.9;
}

</style>