const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// recuperation de tous les commentaires

exports.recupAllCommentaire =(req, res) => {
    let recupAllComment = `SELECT * FROM commentaire_post`
        Post.query(recupAllComment, (err, result) => {
            if (err) {
                return res.status(500).json(err)         
            }
            if (result.length == 0) {
                return res.status(400).json({message: "Aucun commentaires ici !"})
            }
            else
                return res.status(200).json(result)
        })
};