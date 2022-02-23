const express = require("express");
const Route   = express.Router();

const auth    = require("../middleware/auth");
const routeControllers_utilisateurs = require("../controllers/controllers_utilisateur");

// Routes pour les utilisateurs

Route.get("/recupAllMembres", routeControllers_utilisateurs.recupAllMembres);
Route.get("/recupOneMembre/:id", routeControllers_utilisateurs.recupOneMembre);
Route.put("/modifMembre/:id", routeControllers_utilisateurs.modifMembre);
Route.delete("/suppMembre/:id",auth, routeControllers_utilisateurs.suppMembre);
Route.post("/connexion", routeControllers_utilisateurs.connexion);
Route.post("/inscription", routeControllers_utilisateurs.inscription);

module.exports = Route;