
const Utilisateur = require("../../connexionSQL");

require("dotenv").config();


// recuperation d'un membre

exports.recupOneMembre = (req, res) => {
    let idParams = req.params.id

    let recupMembreOne = `SELECT * FROM utilisateurs WHERE id_utilisateur = ?`
        Utilisateur.query(recupMembreOne, idParams, (err, result) => {
            if (err) {
                return res.status(500).json(err)         
            }
            if (result.length == 0) {
                return res.status(400).json({message : "Il n'y a pas de membre avec cette id !"})
            }
            else
                return res.status(200).json(result) 
    })
};