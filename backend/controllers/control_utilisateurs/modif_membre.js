const bcrypt = require("bcrypt");

const Utilisateur = require("../../connexionSQL");

const regexPseudo = /[a-zA-ZÀ-ÿ\-\0-9]{3,20}/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Minimum huit caractères, au moins une lettre et un chiffre

// modification du compte   

// ajout de condition et utilisation de bcrypt pour hasher le mot de passe si le profil es modifié
exports.modifMembre = (req, res) => {

    if (!regexPseudo.test(req.body.pseudo_utilisateur)) {
        return res.status(400).json({error: " Le pseudo doit etre compris entre 3 et 20 caractéres ! "})
    }
    
    if (!regexPassword.test(req.body.password_utilisateur)) {
        return res.status(400).json({error: " Le mot de passe doit etre compris entre 2 et 50 caractères ! "})
    }
    if (pseudo == "" ||  password == "") {
         return res.status(400).json({error: " Tu doit remplir tous les champs pour pouvoir modifier ton profil ! "})
    }

    let pseudo   = req.body.pseudo_utilisateur;
    let password = req.body.password_utilisateur;
    let id       = req.params.id;

bcrypt.hash(password, 10) 
     .then((hash) => {
         password = hash
         let modifMember = `UPDATE utilisateurs SET pseudo_utilisateur = ? , password_utilisateur = ? WHERE id_utilisateur = ? `
        
            Utilisateur.query(modifMember, [ pseudo , password , id] , (err, result) => {
                if (err) {
                    return res.status(500).json(err)         
                }else
                    return res.status(201).json({message: "Vos information ont bien été mise à jour !" })
 
                })
            })

 };