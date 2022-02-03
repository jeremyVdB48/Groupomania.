<template> 
<div class=" card w-50 m-auto mt-5 p-5 text-center ">
    <h2 class=" display-6 text-center connexionCompte">Connexion à mon compte :</h2>
     <form @submit.prevent = Verif() class=" text-center" >
        <div class="form-group p-2 ">
            <label for = "pseudo" class="h4">Pseudo : </label>
            <input id = "pseudo" type="text" class="form-control m-auto w-50" required v-model="pseudo_utilisateur">
        </div>

        <div class="form-group p-2">
            <label for = "password" class="h4">Password : </label>
            <input id = "password" type="text" class="form-control m-auto w-50 " required v-model="password_utilisateur">
        </div>
        
        <button type="submit" class="btn btn-danger m-4 btn-lg connecter">Se connecter</button>

    </form> 
</div>
   
    
</template>

<script>
import axios from 'axios';


export default {
   name: "PageConnexion",
   data(){
       return {
           pseudo_utilisateur: "",
           password_utilisateur: ""         
          
       };
   }, 
   methods: {
       Verif() {
        
             axios
                .post("http://localhost:5000/api/utilisateur/connexion",{
                    pseudo_utilisateur: this.pseudo_utilisateur,
                    password_utilisateur: this.password_utilisateur,
                   
                }

                )
                .then(reponse => {
                    console.log(reponse);
                        localStorage.setItem("utilisateurs", JSON.stringify(reponse.data));                  
                        this.$router.push("/")
                })
                .catch(error =>{                  
                     console.log(error);
                     console.log("Echec !");
                })
                
                   
          
        
          
        }


          }
   }
   

</script>

<style >

.connexionCompte{
    color: #d1515a;
    
}

</style>