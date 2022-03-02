const express = require("express");
const Route   = express.Router();

const auth    = require("../middleware/auth");

//////////////////////////////////////////////// UTILISATEUR //////////////////////////////////////////////////////////

// constante qui envoi sur chaque route du dossier controllers
const routeControllers_utilisateurs_all_membres = require("../controllers/control_utilisateurs/recup_tous_membres")
const routeControllers_utilisateurs_un_membres = require("../controllers/control_utilisateurs/recup_un_membre")
const routeControllers_utilisateurs_modif_membres = require("../controllers/control_utilisateurs/modif_membre")
const routeControllers_utilisateurs_supprime_membres = require("../controllers/control_utilisateurs/supprime_membre")
const routeControllers_utilisateurs_connexion_membres = require("../controllers/control_utilisateurs/connexion")
const routeControllers_utilisateurs_inscription_membres = require("../controllers/control_utilisateurs/inscription")

// Routes pour les utilisateurs
Route.get("/recupAllMembres", routeControllers_utilisateurs_all_membres.recupAllMembres);
Route.get("/recupOneMembre/:id", routeControllers_utilisateurs_un_membres.recupOneMembre);
Route.put("/modifMembre/:id", auth, routeControllers_utilisateurs_modif_membres.modifMembre);
Route.delete("/suppMembre/:id", auth, routeControllers_utilisateurs_supprime_membres.suppMembre);
Route.post("/connexion", routeControllers_utilisateurs_connexion_membres.connexion);
Route.post("/inscription", routeControllers_utilisateurs_inscription_membres.inscription);

module.exports = Route;