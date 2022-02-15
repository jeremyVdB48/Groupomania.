<template>
    
    <div id="chat"> 
        <h2 class="display-6 text-center m-4">Bienvenue sur le chat Groupomania : {{data.username}}</h2>
        <form @submit.prevent = EnvoiPost() class="form-group  mx-auto w-75 textarea">
            <label for="Textarea1" class="h4">Message :</label>
            <textarea class="form-control " id="Textarea1" rows="3" v-model="texte_post" placeholder="Ecrit ton petit message ..." required></textarea> 
            <button type="submit" class="btn btn-danger mt-2 mb-4 btn-lg envoyer" >Envoyer !</button>
        </form>            

            <div class="card cardPost mx-auto mb-4 p-2 text-primary d-flex w-75 "  v-bind:key="index" v-for="(article, index) in AllArticles">
            <p class="text-primary">Message n° : {{article.id_post}}<br> écrit le {{article.date_post | formatDate}} </p>
            <p class="text-dark">{{article.texte_post}}</p>
    
            <div v-if="article.id_utilisateur_post == parseInt(data.userId) || parseInt(data.userId) == 19" class="col-md-12">
                 
                <button :data-id="article.id_post" v-on:click="SupprimeMessage($event)" type="submit" class="btn btn-outline-danger btn-rounded waves-effect col-md-6">Supprimer <b-icon icon="trash"></b-icon></button>
                
            </div>

            <div class="col-md-12 mt-2">
               <button :data-id="article.id_post" v-on:click="commentMessage($event)"  type="submit" class="btn btn-outline-primary btn-rounded waves-effect col-md-6 " >Voir les commentaires  <b-icon icon="chat-left-dots"></b-icon></button>
            </div>

                 <div>
                    <form @submit.prevent  class="form-group mx-auto w-75">
                        <label for="Textarea1" class="h4" row="2" >Commentaire :</label>
                        <textarea class="form-control" id="Textarea1" rows="1" v-model="commentaire" placeholder="Ecrit ton petit commentaire ..." required></textarea> 
                        <button :data-id="article.id_post" v-on:click="EnvoiCommentaire($event)"  type="submit" class="btn btn-warning mt-2 mb-4 btn-lg envoyer" >Envoi ton commentaire !</button>
                    </form>            

                </div>
                    
                <div class="verifComment">
                    <div v-for="commentaire in Commentaires" v-bind:key="commentaire.commentaireId">
                        <div  v-if="commentaire.id_post == article.id_post">                                
                            <div class="m-2">Commenté le {{commentaire.date_commentaire_post | formatDate}} <button v-if="article.id_utilisateur_post == parseInt(data.userId) || parseInt(data.userId) == 19 " :data-ids="commentaire.id_commentaire" v-on:click="SupprimeCommentaire($event)" type="submit" class="btn btn-sm btn-outline-danger btn-rounded waves-effect">Supprimer</button>
                                <p class="text-dark">{{commentaire.commentaire}}</p> 
                                <button v-if="Commentaires.length > 0" v-on:click="commentMessage($event) == false" class="btn text-dark btn-outline-warning  btn-rounded waves-effect">Cacher les commentaires</button>
                                                            
                            </div>                              
                        </div>                           
                    </div>  
                </div>
    </div>
     
    </div>

</template>


<script>
import axios from "axios"

export default {
    name : "PageTchat",
    data(){
        return{
            data: JSON.parse(this.$localStorage.get("utilisateur")),    
            texte : "",
            texte_post : "", 
            date_post : "",        
            id_utilisateur : "",
            id_utilisateur_post : "",
            id_post : "",
            Commentaires : [],
            commentaire : "",
            comment: "",
            info : "",
            AllArticles : [],
            username : "",
                   
            
        }
            
    },
computed:{

console:()=>console,
window:()=>window,
},
        
 // recuperation de tous les messages ////////////////////////////////
 created() {       
        axios
            .get("http://localhost:5000/api/post")
            .then(reponse => {
                console.log("reponse api tous messages");
                console.log(reponse);
                //this.msg = reponse.data;
                for(const post of reponse.data.reverse()){
                    this.AllArticles.push(post)
                }

               
            })
            .catch((error) => {
                console.log(error);
                console.log("Problème avec le serveur !");
            })
// recup tous les membres ///////////////////////////////
         axios
            .get("http://localhost:5000/api/utilisateur/recupAllMembres")
            .then(reponse => {
                console.log("reponse api tous utilisateurs");
                console.log(reponse);
                              
            })
            .catch((error) => {
                console.log(error);
                console.log("Problème avec le serveur !");
            })

}, 
     



   mounted() {          
// recuperation de l' utilisateur //////////////////////////////

            let data = JSON.parse(this.$localStorage.get("utilisateur"));
            axios
                .get(`http://localhost:5000/api/utilisateur/recupOneMembre/${data.userId}`)
                .then(reponse => {
                    console.log("api info utilisateur !");
                    console.log(data);
                    this.utilisateur = reponse.data
                })
                .catch(error => console.log(error))


// recuperation des commentaires /////////////////////////////////
    
            axios
                .get("http://localhost:5000/api/post/comments/post")
                .then(reponse => {
                    console.log("commentaires");
                    console.log(reponse);
                                    
                })
                .catch(error => console.log(error))

    },

// envoyer un message //////////////////////////////////////////////

    methods: {
       EnvoiPost() {   
                   
            axios
                .post("http://localhost:5000/api/post",{
                   texte_post: this.texte_post,
                   id_utilisateur_post: this.data.userId              
                    
                },
                )
                .then(reponse => {                
                    console.log(reponse);
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre posté !");
                })
                
       },
      
// envoyer un commentaire ////////////////////////////////////////////

        EnvoiCommentaire(itemS) {

                   let idPost = itemS.target.getAttribute("data-id")
                    
                    axios
                        .post(`http://localhost:5000/api/post/${idPost}/comment`, {
                            
                            id_utilisateur: this.data.userId,                           
                            commentaire: this.commentaire
                            
                        }
                        )
                        .then(reponse => {                
                        console.log(reponse);
                        console.log("commentaire envoyé !");
                        location.reload();
                })
                        .catch((error) => {
                            console.log(error);
                            console.log("Votre commentaire n'a pas pu etre posté !");
                           console.log(this.data.userId);
                }) 
                
        },
// supprimer un message //////////////////////////////////////////////
        SupprimeMessage(item) {
            
            let idPost = item.target.getAttribute("data-id")
           
               axios
                .delete(`http://localhost:5000/api/post/${idPost} `)              
                .then(reponse => {
                    console.log("Message supprimé !");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                            console.log(error);
                           alert ("Votre message n'a pas pu être supprimé car il y a un ou plusieurs commentaires !")
                })
              
                   
        },

// recuperation des commentaire d'un message //////////////////////
        commentMessage(Item) {
            
            let idPost = Item.target.getAttribute("data-id")
            console.log(idPost);

            axios
                .get(`http://localhost:5000/api/post/comments/post/${idPost}`,{
                    
                })
                 .then(reponse => {
                    console.log("Recup tous les commentaires d'un post !");
                    console.log(reponse);
                    this.Commentaires = reponse.data

                })
                .catch((error) => {
                            console.log(error);                          
                })
        },

// supprime un commentaire ////////////////////////////////////////////
        SupprimeCommentaire(ITem) {

             let iDPost = ITem.target.getAttribute("data-ids")
           
               axios
                .delete(`http://localhost:5000/api/post/comment/${iDPost} `)              
                .then(reponse => {
                    console.log("Commentaire supprimé !");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                            console.log(error);
                            console.log("Votre commentaire n'a pas pu être supprimé !");
                })

        },

      

    }

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Quintessential&display=swap');
.cardPost{
    box-shadow: 3px 3px 5px #afafaf;
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
    border-style: outset;

    animation: boutonCadabra 1.5s linear;
    animation-timing-function: ease;
    transform-origin: left;

    opacity: 0.9;

}
.textarea{
    opacity: 0.9;
    animation: boutonAbra 1.5s linear;
}

#Textarea1{
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
    box-shadow: 3px 3px 5px #afafaf;
    border-style: outset;
}

@keyframes boutonCadabra {
    0%{transform: scaleX(0.1);}
    100%{transform: scaleX(1);}
    0%{opacity: 0;}
    100%{opacity: 0.9;}
}
@keyframes boutonAbra {
  
    0%{opacity: 0;}
    100%{opacity: 0.9;}
}


</style>