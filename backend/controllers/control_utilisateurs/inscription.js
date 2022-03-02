const bcrypt = require("bcrypt");
require("dotenv").config();


const Utilisateur = require('C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js');


// inscription avec utilisation de bcrypt pour crypter le mot de passe

// ajout de condition avec des regex pour verifier les infos utilisateur
// const regexPseudo = /[a-zA-ZÀ-ÿ\-\0-9]{3,20}/
// const regexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,}/
// const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Minimum huit caractères, au moins une lettre et un chiffre

// exports.inscription = (req, res) => {

//     if (!regexPseudo.test(req.body.pseudo_utilisateur)) {
//         return res.status(400).json({error: " Le pseudo doit etre compris entre 3 et 20 caractéres ! "})
//     }
//     if (!regexEmail.test(req.body.email_utilisateur)) {
//         return res.status(400).json({error: " Format de l'email non valide ! "})
//     }
//     if (!regexPassword.test(req.body.password_utilisateur)) {
//         return res.status(400).json({error: " Le mot de passe doit etre compris entre 2 et 50 caractères ! "})
//     }
//     if (req.body.pseudo_utilisateur == "" || req.body.email_utilisateuremail == "" || req.body.password_utilisateur == "") {
//         return res.status(400).json({error: " Tu doit remplir tous les champs pour pouvoir modifier ton profil ! "})
//    }


//     let utilisateur = req.body;

//     bcrypt.hash(utilisateur.password_utilisateur, 10) 
//     .then((hash) => {
//         utilisateur.password_utilisateur = hash
//         Utilisateur.query(`INSERT INTO utilisateurs SET ?`, utilisateur, (err, result) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(400).json(err) 
            
//             }else
            
//             return res.status(201).json({message : 'Votre compte a bien été crée !'})
//         });
//     })

//     .catch(error => res.status(500).json( error ));
// };



exports.inscription = (req, res) => {
    let utilisateur = req.body;
    let email = req.body.email_utilisateur;
    let select = "SELECT * FROM utilisateur WHERE email_utilisateur = ?"

    Utilisateur.query( select , email, (err, result) => {
        if (email < 0) {
            console.log("Email déja utilisé !");
            res.status(401).json({message: "Email déja utilisé !"})
        } else {
            bcrypt.hash(utilisateur.password_utilisateur, 10)
            .then((hash) => {
                utilisateur.password_utilisateur = hash
                Utilisateur.query(`INSERT INTO utilisateurs SET ?`, utilisateur, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json(err) 
                    
                    }else
                    
                    return res.status(201).json({message : 'Votre compte a bien été crée !'})
                });
            })
        }
    })

}