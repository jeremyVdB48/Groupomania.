const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");

require("dotenv").config();

const Utilisateur = require("../connexionSQL");

// recuperation de tous les membres
exports.recupAllMembres = (req, res) => {
    let recupMembres = 'SELECT * FROM utilisateurs'
        Utilisateur.query(recupMembres, (err, result) => {
            if (err) {
                return res.status(400).json(err)
            } else       
                return res.status(200).json(result)       
    })
};

// recuperation d'un membre
exports.recupOneMembre = (req, res) => {
    let recupMembreOne = `SELECT * FROM utilisateurs WHERE id_utilisateur =  ("${req.params.id}")`
        Utilisateur.query(recupMembreOne, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json(result) 
    })
};

// modification du compte
exports.modifMembre = (req, res) => {
   let pseudo   = req.body.pseudo_utilisateur;
   let email    = req.body.email_utilisateur;
   let password = req.body.password_utilisateur;
   let id       = req.body.id_utilisateur;

   bcrypt.hash(req.body.password_utilisateur, 10) 
    .then((hash) => {
        password = hash
   Utilisateur.query(`UPDATE utilisateurs SET pseudo_utilisateur ='${pseudo}', email_utilisateur ='${email}', password_utilisateur ='${password}' WHERE id_utilisateur=${id} `, (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        }else
            return res.status(201).json({message: "Vos information ont bien été mise à jour !" })

   })
    })
};

// pour supprimer un compte
exports.suppMembre = (req, res) => {
    let suppCompte = 'DELETE FROM utilisateurs WHERE id_utilisateur= ?'
        Utilisateur.query(suppCompte, req.params.id ,(err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json({ message: "Votre compte à été supprimé !" })
    })       

};

// inscription avec utilisation de bcrypt pour crypter le mot de passe
exports.inscription = (req, res) => {
    const utilisateur = req.body
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
    });

};

// connexion au compte avec utilisation de bcrypt(compare) et utilisation de jsonwebtoken pour créer un jeton unique
exports.connexion = (req, res) => {    
    Utilisateur.query(`SELECT * FROM utilisateurs WHERE pseudo_utilisateur = '${req.body.pseudo_utilisateur}'`,(err, result) => { 
        if (result.length == 0){
            return res.status(400).json({error: "Utilisateur inconnue !"})
        }      
        if (result.length > 0 ){
            bcrypt.compare(req.body.password_utilisateur, result[0].password_utilisateur)
            .then(valid => {
                if(!valid ){
                    return res.status(400).json({message:"Mot de passe invalide !"})
                }else
                return res.status(201).json({
                    userId: result[0].id_utilisateur,
                    username: result[0].pseudo_utilisateur,
                    token: jwt.sign(
                        {userId: result[0].id_utilisateur},
                        'process.env.SECRET_TOKEN',
                        { expiresIn: '24h'}
                    )
                })
            })

            .catch(error => res.status(500).json( error ));
        }
        
    })
   
};
