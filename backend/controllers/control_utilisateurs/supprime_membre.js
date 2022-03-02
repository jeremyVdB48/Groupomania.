const jwt    = require("jsonwebtoken");
require("dotenv").config();


const Utilisateur = require('C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js');

// pour supprimer un compte

// on utilise jwt pour recuperer et comparer si le token lier au infos et different alors on aura une erreur
exports.suppMembre = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    let utilisateurId = req.params.id;

    let recupMembreOne = `SELECT * FROM utilisateurs WHERE id_utilisateur = ?`
    let suppCompte = 'DELETE FROM utilisateurs WHERE id_utilisateur= ?'

    Utilisateur.query( recupMembreOne, utilisateurId, (err, result) => {
        if (userId !== result[0].id_utilisateur ) {
            // console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            // console.log("tu peux effacer les données !");
            Utilisateur.query(suppCompte, req.params.id ,(err, result) => {
                        if (err) {
                            return res.status(400).json(err)         
                        }else
                            return res.status(201).json({ message: "Votre compte à été supprimé !" })
                })       
        }
    })
     

};