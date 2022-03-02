const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// recupèration de tous les commentaires d'un seul message

exports.recupAllCommentOnePost =(req, res) => {
    let recupCommentairesForOnePost = `SELECT * FROM commentaire_post
    WHERE id_post = ${req.params.id} `

    Post.query(recupCommentairesForOnePost, (err, result) => {
        if (err) {
            return res.status(500).json(err)         
        }
        if (result.length == 0) {
            return res.status(400).json({message: "Aucun messages ici !"})
        }
        else
            return res.status(200).json(result)
    })

};