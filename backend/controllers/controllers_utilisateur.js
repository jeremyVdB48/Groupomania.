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
    let idParams = req.params.id

    let recupMembreOne = `SELECT * FROM utilisateurs WHERE id_utilisateur = ?`
        Utilisateur.query(recupMembreOne, idParams, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(200).json(result) 
    })
};

// modification du compte   UPDATE utilisateurs SET pseudo_utilisateur ='${pseudo}', email_utilisateur ='${email}', password_utilisateur ='${password}' WHERE id_utilisateur=${id}
exports.modifMembre = (req, res) => {
   let pseudo   = req.body.pseudo_utilisateur;
   let email    = req.body.email_utilisateur;
   let password = req.body.password_utilisateur;
   let id       = req.params.id;

    if (pseudo == "" || email == "" || password == "") {
        return res.status(400).json({error: " Tu doit remplir tous les champs pour pouvoir modifier ton profil ! "})
    }

   bcrypt.hash(password, 10) 
    .then((hash) => {
        password = hash
        let modifMember = `UPDATE utilisateurs SET pseudo_utilisateur = ? , email_utilisateur = ? , password_utilisateur = ? WHERE id_utilisateur = ? `

   Utilisateur.query(modifMember, [ pseudo , email , password , id] , (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        }else
            return res.status(201).json({message: "Vos information ont bien été mise à jour !" })

   })
    })
};

// pour supprimer un compte
exports.suppMembre = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    let utilisateurId = req.params.id;

    let recupMembreOne = `SELECT * FROM utilisateurs WHERE id_utilisateur = ?`
    let suppCompte = 'DELETE FROM utilisateurs WHERE id_utilisateur= ?'

    Utilisateur.query( recupMembreOne, utilisateurId, (err, result) => {
        if (userId !== result[0].id_utilisateur ) {
            console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            console.log("tu peux effacer les données !");
            Utilisateur.query(suppCompte, req.params.id ,(err, result) => {
                        if (err) {
                            return res.status(400).json(err)         
                        }else
                            return res.status(201).json({ message: "Votre compte à été supprimé !" })
                })       
        }
    })

    
    //     Utilisateur.query(suppCompte, req.params.id ,(err, result) => {
    //         if (err) {
    //             return res.status(400).json(err)         
    //         }else
    //             return res.status(201).json({ message: "Votre compte à été supprimé !" })
    // })       

};

// inscription avec utilisation de bcrypt pour crypter le mot de passe

const regexPseudo = /[a-zA-ZÀ-ÿ\-\0-9]{3,20}/
const regexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,}/
const regexPassword = /[a-zA-ZÀ-ÿ\-\0-9]{2,50}/

exports.inscription = (req, res) => {

    if (!regexPseudo.test(req.body.pseudo_utilisateur)) {
        return res.status(400).json({error: " Le pseudo doit etre compris entre 3 et 20 caractéres ! "})
    }
    if (!regexEmail.test(req.body.email_utilisateur)) {
        return res.status(400).json({error: " Format de l'email non valide ! "})
    }
    if (!regexPassword.test(req.body.password_utilisateur)) {
        return res.status(400).json({error: " Le mot de passe doit etre compris entre 2 et 50 caractères ! "})
    }

    let utilisateur = req.body;

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

    .catch(error => res.status(500).json( error ));
};

// connexion au compte avec utilisation de bcrypt(compare) et utilisation de jsonwebtoken pour créer un jeton unique
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

