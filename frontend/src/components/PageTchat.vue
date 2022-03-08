 <!-- body du chat -->

<template>
    
    <div id="chat"> 
        <!-- création d'un formulaire pour l'envoi de message avec v-on (raccourci @) pour ecouter l'évenement du formulaire et executer la fonction à la soumission du formulaire-->
        <!-- utilisation de l'interpolation {{syntaxe Mustache}} pour la liaison de donnée -->
        <h2 class="display-6 text-center m-4">Bienvenue sur le chat Groupomania : <br> <span class="titrePseudo">{{data.username}}</span></h2>
        <form @submit.prevent = EnvoiPost() class="form-group  mx-auto w-75 textarea">
            <label for="Textarea1" class="h4">Message :</label>
            <textarea class="form-control shadow-lg" id="Textarea1" rows="3" v-model="texte_post" placeholder="Ecrit ton petit message ..." required></textarea> 
            <button type="submit" class="btn btn-danger mt-2 mb-4 btn-lg envoyer" >Envoyer !</button>
        </form> 

        <!-- input de recherche par pseudo avec condition ajout pluriel si plus que 1 et affichage d'un message si il n'y a aucun résultat-->
        <div class="text-center mb-4">
        <input v-model="searchPseudo" type="search" id="search" placeholder="Rechercher par pseudo ..." class="form-control-lg ">
        <span v-if="searchPseudo && filtreListe.length >= 1"> {{filtreListe.length}} message<span v-if="filtreListe.length >= 2">s</span></span>
        <p v-if="filtreListe.length == []" class="text-danger">Aucun message avec ce pseudo !</p>
        </div>
            <!-- recuperation du tableau et utilisation d'une boucle v-for pour afficher mes données et ajout d'une condition v-if qui affiche un message si mon tableau es vide -->
            <div v-if="msg == '' " class="text-center display-6">Il n'y a aucun post pour le moment ! <br>Fait toi plaisir ! <br>Et écrit un petit message.</div>
            <div class="card cardPost shadow-lg mx-auto mb-4 p-2 text-primary d-flex w-75 "  v-bind:key="index" v-for="(post, index) in filtreListe">

            <div >
                <!-- affichage n° post et affichage des infos si c'est un Partage et ajout d'un button pour supprimer le partage avec condition v-if seul l'admin ou le créateur du partage peuvent le supprimer -->
                <p> Message n° : {{post.idPost}}</p>
                <div v-if="post.type == 'Partage'">Partagé le :{{post.datePost | formatDate }} <br> par {{post.pseudoUtilisateur}}
                <button :data-id ="post.partageId" v-if="post.idUtilisateurPost == parseInt(data.userId) || data.administrateur == 1 " v-on:click ="suppPartage($event)" type="submit" class="btn btn-link text-danger">Supprime le partage</button>
                </div>
            </div>    
            <div>
            <!-- affichage des infos si c'est un Post -->
            <p v-if="post.type == 'Post'">Ecrit le : {{post.datePost | formatDate}} <br> par {{post.pseudoUtilisateur}}</p>
            </div>
            <p class="text-dark">{{post.textePost}}</p> 
            
            <!-- bouton supprimer avec condition seul un administrateur ou le createur du post peuvent l'effacer et utilisation de v-bind(raccourci :) pour lier mes données et récuperer l'id du post-->
            <div v-if="post.idUtilisateurPost == parseInt(data.userId) || data.administrateur == 1" class="col-md-12"> 
                <button :data-id="post.idPost" v-on:click="SupprimeMessage($event)" type="submit" class="btn btn-outline-danger btn-rounded waves-effect col-md-6 col-12">Supprimer <b-icon icon="trash"></b-icon></button>               
            </div>

            <!-- bouton commentaire et partage avec utilisation de v-bind(raccourci :) pour lier mes données et ensuite récuperer l'id du post -->
            <div class="col-md-12 col-sm-12 m-1 mx-auto">
               <button :data-id="post.idPost" v-on:click ="commentMessage($event) " type="submit" class="btn btn-outline-primary btn-rounded waves-effect col-md-6 col-sm-6 col-12" >Voir les commentaires  <b-icon icon="chat-left-dots"></b-icon></button>
               <button :data-id="post.idPost" v-on:click ="partage($event)" type="submit" class="btn btn-outline-success btn-rounded waves-effect col-md-6 col-sm-6 col-12">Partage <b-icon icon="arrow-up-square"></b-icon></button>
            </div>
                
                <!-- creation d'un formulaire pour l'envoi de commentaire avec utilisation de v-on,v-bind-->
                 <div>
                    <form @submit.prevent  class="form-group mx-auto w-75">
                        <label for="Textarea1" class="h4" row="2" >Commentaire :</label>
                        <textarea class="form-control" id="Textarea1" rows="1" v-model="commentaire" placeholder="Ecrit ton petit commentaire ..." required></textarea> 
                        <button :data-id="post.idPost" v-on:click="EnvoiCommentaire($event)"  type="submit" class="btn btn-warning mt-2 mb-4  envoyer" >Envoi ton commentaire !</button>
                    </form>            
                </div>

                    <!-- recuperation des commentaires avec boucle v-for et placement avec la condition v-if -->
                <div class="verifComment"> 
                     <!-- <button  v-if="Commentaires.length > 0 " v-on:click="commentMessage($event) == false" class="btn text-dark btn-outline-warning  btn-rounded waves-effect">Cacher les commentaires</button>                  -->
                    <div v-for="commentaire in Commentaires" v-bind:key="commentaire.commentaireId"> 
                        <div  v-if="commentaire.id_post === post.idPost">                                
                            <div class="m-2">Commenté le {{commentaire.date_commentaire_post | formatDate}} par {{commentaire.pseudo_utilisateur}}  
                                <button v-if="commentaire.id_utilisateur == parseInt(data.userId) || data.administrateur == 1 " :data-ids="commentaire.id_commentaire" v-on:click="SupprimeCommentaire($event)" type="submit" class="btn btn-sm btn-outline-danger btn-rounded waves-effect">Supprimer</button>
                                <p class="text-dark">{{commentaire.commentaire}}</p> 
                                
                                                                                          
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
    // ici on stocke les données es variable qui seront utilisé par vue notamment grace à la syntaxe Mustache {{}}
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
            msg : [],
            username : "", 
            searchPseudo : ""       
        }
            
    },
computed:{
    // fonction qui filtre les messages par pseudo
    filtreListe(){
        return this.msg.filter((post) => {
            return post.pseudoUtilisateur.toLowerCase().includes(this.searchPseudo.toLowerCase())
        })
    },

console:()=>console,
window:()=>window,
},
        
 // recuperation de tous les messages ////////////////////////////////
 created() {   
        let data = JSON.parse(this.$localStorage.get("utilisateur")); // on récupere les infos utilisateur stocké dans le local storage 

        axios
            .get("http://localhost:5000/api/post", {

                 headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}` // on récupere le token dans les infos utilisateur et on s'en sert pour sécuriser en verifiant le token
                        } 
          
            }) // si tous se passe bien on stock le resultat dans msg: []
            .then(reponse => {
                console.log("reponse api tous messages");
                console.log(reponse);
                this.msg = reponse.data;
            
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

// recuperation des commentaires /////////////////////////////////
            let data = JSON.parse(this.$localStorage.get("utilisateur"));
            
            axios
                .get("http://localhost:5000/api/post/comments/post",{

                   headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                        }  
                })
                .then(reponse => {
                    console.log("commentaires");
                    console.log(reponse);
                                    
                })
                .catch(error => console.log(error))

     },

// envoyer un message //////////////////////////////////////////////
// methods sert a créer nos fonction
    methods: {
       EnvoiPost() {   

            let data = JSON.parse(this.$localStorage.get("utilisateur"));
                 
            axios
                .post("http://localhost:5000/api/post",{ // 
                   texte_post: this.texte_post,
                   id_utilisateur_post: this.data.userId ,                   
                },
                { 
                 headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${data.token}`
                        }  
                  }      
                ) // si le message es bien pris en compte on rafraichit la page pour l'afficher
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
                   let data = JSON.parse(this.$localStorage.get("utilisateur")); 
                   let idPost = itemS.target.getAttribute("data-id") // ici on recupere l'idPost en utilisant target.getAttribute de l'element data-id que nous avant lier avec v-bind dans le template html
                    
                    axios
                        .post(`http://localhost:5000/api/post/${idPost}/comment`, {
                            
                            id_utilisateur: this.data.userId,                           
                            commentaire: this.commentaire                            
                        },
                        { 
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${data.token}`
                                }  
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
                        //    console.log(this.data.userId);
                }) 
                
        },
// supprimer un message //////////////////////////////////////////////
        SupprimeMessage(item) {

            let data = JSON.parse(this.$localStorage.get("utilisateur"));
            let idPost = item.target.getAttribute("data-id");

          if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
               axios
                .delete(`http://localhost:5000/api/post/${idPost} `, 
                {           
                       headers: {
                         "Content-type": "application/json",
                         Authorization: `Bearer ${data.token}`
                                }                
                })               
                .then(reponse => {
                    console.log("Message supprimé !");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                            console.log(error);
                })
         }      
                   
        },

// recuperation des commentaire d'un message //////////////////////
        commentMessage(Item) {
            
            let idPost = Item.target.getAttribute("data-id");
            console.log(idPost);

            axios
                .get(`http://localhost:5000/api/post/comments/post/${idPost}`,{
                    
                })
                 .then(reponse => {
                    console.log("Recup tous les commentaires d'un post !");
                    console.log(reponse);
                    this.Commentaires = reponse.data

                }) // si l'erreur est une erreur 400 ecrit au préalable dans le backend on envoie une alert
                .catch((error) => {
                    if (error.response.status === 400) {
                        alert("Aucun commentaire sur ce message !")
                    }
                    console.log(error);                          
                })
        },

// supprime un commentaire ////////////////////////////////////////////
        SupprimeCommentaire(ITem) {

             let iDPost = ITem.target.getAttribute("data-ids");
             let data = JSON.parse(this.$localStorage.get("utilisateur"));
             console.log(data.token);

             if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
               axios
                .delete(`http://localhost:5000/api/post/comment/${iDPost} `,
                {
                     headers: {
                         "Content-type": "application/json",
                         Authorization: `Bearer ${data.token}`
                                }                
                })              
                .then(reponse => {
                    console.log("Commentaire supprimé !");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                            console.log(error);
                            console.log("Votre commentaire n'a pas pu être supprimé !");
                })
             }
        },

    // partage un post
        partage(ITEm) {

            let idPoST = ITEm.target.getAttribute("data-id");
            let data = JSON.parse(this.$localStorage.get("utilisateur"));

            axios
                .post(`http://localhost:5000/api/post/partage/post/${idPoST}`, {
                    id_utilisateur_post: this.data.userId
                },
                     { 
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${data.token}`
                                }  
                        }      
                )
                .then(reponse => {
                    console.log("Fonction partage !!");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                        console.log(error);
                        console.log("Votre partage n'a pas fonctionné !");
                })

        },

    // supprime un partage
    suppPartage(i) {

        let id = i.target.getAttribute("data-id");
        let data = JSON.parse(this.$localStorage.get("utilisateur"));

         if (confirm("Êtes-vous sûr de vouloir supprimer ce partage ?")) {
        axios
            .delete(`http://localhost:5000/api/post/partage/post/${id}`,
            {
                  headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${data.token}`
                                }  
            })
            .then(reponse => {
                    console.log("Partage supprimé !");
                    console.log(reponse);
                    location.reload();

                })
                .catch((error) => {
                            console.log(error);
                            console.log("Votre partage n'a pas pu être supprimé !");
                })
    }}
    }
    
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Quintessential&display=swap');
.titrePseudo{
    font-family: 'Dancing Script', cursive;
    color: blue;
}
.cardPost{
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