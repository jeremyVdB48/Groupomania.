const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// recuperation d'un commentaire

exports.recupOneCommentaire =(req, res) => {
    let idCommentaire = req.params.id;

    let recupOneComment = `SELECT * FROM commentaire_post WHERE id_commentaire = ?`

        Post.query(recupOneComment , idCommentaire , (err, result) => {
            if (err) {
                return res.status(500).json(err)         
            }
            if (result.length == 0) {
                return res.status(400).json({message: "Aucun commentaire ici !"})
            }
            else
                return res.status(200).json(result)
        })
}