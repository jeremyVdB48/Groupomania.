<!-- navbar de la page profil  -->

<template>
<div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="SuppMembre()" class="btn btn-outline-danger btn-lg m-3 mb-0" >Se désinscrire</button> <!--  au click du button on appel la fonction pour supprimer l'utilisateur  -->
         <button @click="$router.push('/')" class="btn btn-outline-danger btn-lg m-3 mb-0" >Retour <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise></button> <!-- au click du button on retourne sur la page de chat  -->
    </div>
    <div>

        <p class="h2 text-center">Bienvenue sur ton profil : <span class="usernameP">{{data.username}}</span></p> <!-- {{}} syntaxe " Mustache " liaison avec mon objet data recuperè avec axios  -->
        
    </div>
</div>

</template>


<script>

import axios from 'axios'

export default {
    name : "NavBarProfil",
    data() {
       return{
            data:JSON.parse(this.$localStorage.get('utilisateur')),
            id_utilisateur: "",
            utilisateur: "",
            pseudo_utilisateur: "",
            userId: ""
       } 
    },
// recuperation des infos de l'utilisateur avec axios
mounted() {
        let data = JSON.parse(this.$localStorage.get("utilisateur")); // recuperation dans mon local storage des infos utilisateur pour recuperer l'id et s'en servir pour la requete axios.get
        axios
            .get(`http://localhost:5000/api/utilisateur/recupOneMembre/${data.userId}`)
                .then(reponse => {
                    console.log(reponse);
                    this.utilisateur = reponse.data
                })
                .catch(error => console.log(error))
},

// ajout dans methods d'une fonction pour supprimer un utilisateur
methods: {

    SuppMembre() {
        
        let data = JSON.parse(this.$localStorage.get("utilisateur"));
        console.log(data);
        console.log(this.data.token);
        //  confirm("Suppression du compte ?")
            axios.
                delete(`http://localhost:5000/api/utilisateur/suppMembre/${data.userId}`,
                {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                        } 
                })                              
                .then(reponse => {
                    console.log(reponse);
                    localStorage.clear();
                    this.$router.push("/connexion");
                })
                .catch(error => console.log(error))
        
     }
}

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Quintessential&display=swap');
.usernameP{
    font-family: 'Dancing Script', cursive;
    color: blue;
    font-size: 40px;
}

</style>