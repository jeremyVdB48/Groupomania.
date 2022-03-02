const express = require("express");
const Route   = express.Router();

const auth    = require("../middleware/auth");

///////////////////////////////////////////////// MESSAGE ///////////////////////////////////////////////////////////////////

// constante qui envoi sur chaque route du dossier controllers (control_messages)
const routeControllers_posts_tous_messages = require("../controllers/control_messages/recup_tous_messages");
const routeControllers_posts_envoi_message = require("../controllers/control_messages/envoi_message");
const routeControllers_posts_recup_un_message = require("../controllers/control_messages/recup_un_message");
const routeControllers_posts_supprime_message = require("../controllers/control_messages/supprime_message");
const routeControllers_posts_recup_messages_membre = require("../controllers/control_messages/recup_messages_membre");
const routeControllers_posts_modif_message = require("../controllers/control_messages/modif_message");


// Routes pour les messages
Route.get("/", routeControllers_posts_tous_messages.getAllPost);
Route.post("/", routeControllers_posts_envoi_message.createPost);
Route.get("/:id", routeControllers_posts_recup_un_message.getOnePost);
Route.delete("/:id",auth, routeControllers_posts_supprime_message.deletePost);
Route.get("/user:id/posts", routeControllers_posts_recup_messages_membre.getUsersPosts);
Route.put("/:id", auth, routeControllers_posts_modif_message.modifyPost);

///////////////////////////////////////////////// COMMENTAIRE ////////////////////////////////////////////////////////////////////

// constante qui envoi sur chaque route du dossier controllers (control_commentaires)
const routeControllers_posts_envoi_commenatire = require("../controllers/control_commentaires/envoi_commentaire");
const routeControllers_posts_recup_tous_commentaires = require("../controllers/control_commentaires/recup_tous_commentaires");
const routeControllers_posts_recup_un_commentaire = require("../controllers/control_commentaires/recup_un_commentaire");
const routeControllers_posts_supprime_commentaire = require("../controllers/control_commentaires/supprime_commentaire");
const routeControllers_posts_recup_commentaires_message = require("../controllers/control_commentaires/recup_commentaires_message");

// route commentaire 
Route.post("/:id/comment", auth, routeControllers_posts_envoi_commenatire.commentaire);
Route.get("/comments/:id", routeControllers_posts_recup_tous_commentaires.recupAllCommentaire);
Route.get("/comment/:id", routeControllers_posts_recup_un_commentaire.recupOneCommentaire);
Route.delete("/comment/:id", auth, routeControllers_posts_supprime_commentaire.deleteCommentaire);
Route.get("/comments/post/:id", routeControllers_posts_recup_commentaires_message.recupAllCommentOnePost);

//////////////////////////////////////////////// PARTAGE //////////////////////////////////////////////////////////////////////////

// constante qui envoi sur chaque route du dossier controllers (control_partage)
const routeControllers_posts_envoi_partage = require("../controllers/control_partage/envoi_partage");
const routeControllers_posts_recup_un_partage = require("../controllers/control_partage/recup_un_partage");
const routeControllers_posts_supprime_un_partage = require("../controllers/control_partage/supprime_un_partage");

// route partage de post
Route.post("/partage/post/:id", auth, routeControllers_posts_envoi_partage.partage);
Route.get("/partage/post/:id", routeControllers_posts_recup_un_partage.recupPartage);
Route.delete("/partage/post/:id", auth, routeControllers_posts_supprime_un_partage.suppUnPartage);


module.exports = Route;
