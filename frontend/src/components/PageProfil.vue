 <!-- body de la page profil -->

<template> 
 <!-- création d'un formulaire pour modifier les données utilisateur avec utilisation de pattern-->
<div class="container">
    <div class=" card cardProfil  m-auto mt-5 p-5 text-center ">
        <h2 class=" display-6 text-center connexionCompte">Modification du profil :</h2>
        <form @submit.prevent = Modifier() class=" text-center">
            <div  class="form-group p-2 ">
                <label for = "pseudo" class="h4">Pseudo : </label>
                <input id = "pseudo" type="text"  class="form-control m-auto w-50 text-center" required pattern="[a-zA-ZÀ-ÿ\-]{3,20}" v-model="pseudo_utilisateur">
            </div>

            <div class="form-group p-2">
                <label for = "password" class="h4">Password : </label>
                <input id = "password" type="password"  class="form-control m-auto w-50 text-center" required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" v-model="password_utilisateur" >
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
            password_utilisateur:"",       
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
                    password_utilisateur: this.password_utilisateur
                },
                 { 
                 headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                        }  
                  }      
                ) 
                .then(reponse => {
                    console.log("mise a jour de votre compte réussi !");
                    console.log(reponse);                   
                    this.$router.push ("/connexion")
                    
                }) 
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