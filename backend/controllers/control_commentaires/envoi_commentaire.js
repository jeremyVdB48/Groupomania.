const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// nouveau commentaire

exports.commentaire =(req, res) => {
    let idUtilisateur = req.body.id_utilisateur;
    let id = req.params.id;
    let commentaire = req.body.commentaire

    if (commentaire == "") {
        return res.status(400).json({message: "Envoyer au moins un mot !"})
    }

    let comment = `INSERT INTO commentaire_post VALUES (NULL, ? , ? , NOW() , ? )`

        Post.query(comment, [idUtilisateur , id , commentaire] , (err, result) => {
            if (err) {
                return res.status(500).json(err)         
            }else
                return res.status(201).json({ message: 'Votre commentaire a été publié !'})
    })
};