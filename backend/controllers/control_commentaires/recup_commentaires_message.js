const Post = require("../../connexionSQL");


// recupèration de tous les commentaires d'un seul message par l'id du post

exports.recupAllCommentOnePost =(req, res) => {
    let idPost = req.params.id
    let recupCommentairesForOnePost = `SELECT posts.* FROM posts WHERE posts.id_post = ? `
    

    Post.query(recupCommentairesForOnePost, [idPost], (err, result) => {
        if (err) {
            return res.status(500).json(err)         
        }
        if (result.length == 0) {
            return res.status(400).json({message: "Aucun commentaire ici !"})
        }
       // recup des infos commentaires + le pseudo de l'utilisateur et placement par ordre decroissante (ORDER BY , DESC)
        let recupInfoCommentaire = `SELECT commentaire_post.id_commentaire, commentaire_post.id_utilisateur, commentaire_post.id_post, commentaire_post.date_commentaire_post, commentaire_post.commentaire, utilisateurs.pseudo_utilisateur
        From commentaire_post
        LEFT JOIN utilisateurs ON utilisateurs.id_utilisateur = commentaire_post.id_utilisateur
        WHERE commentaire_post.id_post = ? 
        ORDER BY commentaire_post.id_commentaire DESC`

        Post.query(recupInfoCommentaire, [idPost], (err, result) => {
            if (err) {
                return res.status(500).json(err)         
            }
            if (result.length == 0) {
                return res.status(400).json({message: "Aucun commentaire ici !"})
            }else {
                return res.status(200).json(result)
            }
        })
    })

};