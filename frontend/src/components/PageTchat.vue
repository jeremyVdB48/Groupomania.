<template>
    
    <div>
        <h2 class="display-6 text-center">Tchat :</h2>
       <!-- <p class="text-center display-5">Bienvenue sur le chat Goupomania {{username}}</p> -->
        <div class="card m-5 p-2 text-primary" v-bind:key="index" v-for="(textAll, index) in texte">
            <p class="text-primary">Message n° : {{textAll.id_post}}<br> écrit le {{textAll.date_post | formatDate}}<br> par :</p>
            <p class="text-dark">{{textAll.texte_post}}</p>
            <button type="submit" class="btn btn-outline-warning btn-rounded" data-mdb-ripple-color="dark">Commentaires ( )</button>
        </div>
        
        <form @submit.prevent = EnvoiPost() class="form-group m-5">
            <label for="Textarea1" class="h4">Message :</label>
            <textarea class="form-control" id="Textarea1" rows="3" v-model="texte_post"></textarea> 
            <button type="submit" class="btn btn-danger m-2 btn-lg envoyer" >Envoyer !</button>
        </form>            
         
    </div>

</template>


<script>
import axios from "axios"

export default {
    name : "PageTchat",
    data(){
        return{
           
            texte : [],
            texte_post : "", 
            date_post : "",        
            id_utilisateur : ""
        }
            
    },

    mounted(){     
      
        axios
            .get("http://localhost:5000/api/post")
            .then(reponse => {
                console.log(reponse);
                for(const textAll of reponse.data){
                    this.texte.push(textAll)
                }
            })
            .catch((error) => {
                console.log(error);
                console.log("Problème avec le serveur !");
            })
    },

    methods: {
       EnvoiPost() {         
    
            
            axios
                .post("http://localhost:5000/api/post",{
                    texte_post: this.texte_post,
                    date_post:this.date_post,
                    id_utilisateur:this.id_utilisateur
                },
                )
                .then(reponse => {
                    console.log(reponse);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre posté !");
                })
       }

    }

}
</script>


<style>


</style>