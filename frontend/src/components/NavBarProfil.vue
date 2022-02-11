<template>
<div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="SuppMembre()" class="btn btn-outline-danger btn-lg m-3 mb-0" >Se désinscrire</button> 
         <button @click="$router.push('/')" class="btn btn-outline-danger btn-lg m-3 mb-0" >Retour <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise></button>
    </div>
    <div>

        <p class="h2 text-center">Bienvenue sur ton profil : {{data.username}}</p>
        
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

mounted() {
        let data = JSON.parse(this.$localStorage.get("utilisateur"));
        axios
            .get(`http://localhost:5000/api/utilisateur/recupOneMembre/${data.userId}`)
                .then(reponse => {
                    console.log(reponse);
                    this.utilisateur = reponse.data
                })
                .catch(error => console.log(error))
},

methods: {

    SuppMembre() {
        
        let data = JSON.parse(this.$localStorage.get("utilisateur"));
         if(confirm("Suppression du compte ?")){
            axios.
                delete(`http://localhost:5000/api/utilisateur/suppMembre/${data.userId}`,{
                    
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

}
</script>


<style>


</style>