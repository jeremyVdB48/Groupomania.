const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// nouveau message

// INSERT permet de rajouter des données ici dans posts
// VALUES specifie les valeurs à ajouter
// NOW() permet de retourner la date et heure du systeme

exports.createPost = (req, res) => {
    let texte = req.body.texte_post;
    let idUtilisateur = req.body.id_utilisateur_post;

    if (texte == "") {
        return res.status(400).json({message: "Envoyer au moins un mot !"})
    }

    let requete = "INSERT INTO posts ( texte_post, date_post, id_utilisateur_post) VALUES  ( ?, NOW(), ?)"

        Post.query(requete , [ texte , idUtilisateur] , (err, result) => {
            if (err) {
                return res.status(500).json(err)      
            }else
                return res.status(201).json({ message: 'Votre post à été publié !'})
    });       
    
    
};