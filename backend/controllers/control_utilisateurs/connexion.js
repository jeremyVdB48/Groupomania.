const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");


const Utilisateur = require('C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js');

require("dotenv").config();


// connexion au compte avec utilisation de bcrypt(compare) et utilisation de jsonwebtoken pour créer un jeton unique qui contiendra les infos de l'utilisateur

exports.connexion = (req, res) => {  
    let pseudo = req.body.pseudo_utilisateur
    let password = req.body.password_utilisateur

    let userInfo = `SELECT * FROM utilisateurs WHERE pseudo_utilisateur = ?`
   
   Utilisateur.query(userInfo, pseudo, (err, result) => { 
       if (result.length == 0){
           return res.status(401).json({error: "Utilisateur inconnue !"})
       }      
       if (result.length > 0 ){
           bcrypt.compare(password, result[0].password_utilisateur)
           .then(valid => {
               if(!valid ){
                   return res.status(401).json({message:"Mot de passe invalide !"})
               } 
               let status = {
                   "userId" : result[0].id_utilisateur,
                   "administrateur" : !!result[0].administrateur
               }
               return res.status(200).json({
                   userId: result[0].id_utilisateur,
                   username: result[0].pseudo_utilisateur,
                   token: jwt.sign(status,
                        process.env.SECRET_TOKEN,
                         { expiresIn: '24h'}),
                   administrateur:  result[0].administrateur,                    
                   
               })
               
           })

           .catch(error => res.status(500).json( error ));
       }
       
   })
  
};