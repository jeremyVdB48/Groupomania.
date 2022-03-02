 <!-- body de la page connexion -->

<template> 

 <!-- creation du formulaire pour la connexion client -->
<div class="container">
    <div class=" card cardConnexion  m-auto mt-5 p-5 text-center ">
        <h2 class=" display-6 text-center connexionCompte">Connexion à mon compte :</h2>
        <form @submit.prevent = Verif()  class=" text-center" >
            <div class="form-group p-2 ">
                <label for = "pseudo" class="h4">Pseudo : </label>
                <input id = "pseudo" type="text" class="form-control m-auto w-50 text-center" required v-model="pseudo_utilisateur">  <!--required oblige l'utilisateur à entrer du texte et v-model lie les données du formulaire -->
            </div>

            <div class="form-group p-2">
                <label for = "password" class="h4">Password : </label>
                <input id = "password" type="password" class="form-control m-auto w-50 text-center" required v-model="password_utilisateur">
            </div>
            
            <button type="submit" class="btn btn-danger m-4 btn-lg connecter">Se connecter</button>
            <p v-if="message_erreur" class="text-danger messErreur">Mot de passe ou utilisateur inconnue au bataillon !</p>
        </form> 
    </div>
  
</div>   
</template>

<script>
import axios from 'axios';


export default {
   name: "PageConnexion",
   data(){
       return {
           pseudo_utilisateur: "",
           password_utilisateur: "",
           message_erreur : false         
          
       };
   }, 
   methods: {
       Verif() {

          
           // on envoi une requete post a la base de donnée pour verifier si les infos pseudo et password sont presente
             axios
                .post("http://localhost:5000/api/utilisateur/connexion",{
                    pseudo_utilisateur: this.pseudo_utilisateur,
                    password_utilisateur: this.password_utilisateur,
                   
                },
                {
                       headers: {
                         "Content-type": "application/json",
                         
              }
                }               
                )
                 // si le resultat es true on envoi les infos utilisateur dans le local storage et envoi sur la page de chat
                .then(reponse => {
                    console.log("connexion réussi !");
                    console.log(reponse);
                    let response = reponse.data
                    let dataUser = JSON.stringify(response);
                    this.$localStorage.set("utilisateur",dataUser);                                                          
                    this.$router.push("/")
                })
                 // en cas d'echec envoi d'une erreur
                .catch(error => {                  
                     console.log(error);
                     console.log("Mot de passe invalide !");
                    //  alert("Mot de passe ou utilisateur inconnue au bataillon !")
                    this.message_erreur = true
                })
             
        }
          }
   }
   

</script>

<style >

.connexionCompte {
    color: #d1515a;
    
}
.cardConnexion {
    opacity: 0.9;
    box-shadow: 3px 3px 5px #afafaf;
    border-style: outset;
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