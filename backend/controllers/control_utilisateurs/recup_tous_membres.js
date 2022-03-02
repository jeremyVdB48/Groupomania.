const Utilisateur = require('C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js');

require("dotenv").config();

// recuperation de tous les membres

exports.recupAllMembres = (req, res) => {

    let recupMembres = 'SELECT * FROM utilisateurs'

        Utilisateur.query(recupMembres, (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length == 0) {
                return res.status(400).json({message: "Aucun membre !"})
            }
            else       
                return res.status(200).json(result)       
    })
};