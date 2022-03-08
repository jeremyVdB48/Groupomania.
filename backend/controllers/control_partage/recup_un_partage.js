const Post = require("../../connexionSQL");


// recuperation d'un partage

exports.recupPartage =(req, res) => {
    let id = req.params.id;

    let recupUnPartage = `SELECT partage_post.*, posts.texte_post
    FROM partage_post, posts
     WHERE posts.id_post = partage_post.id_post_partage AND partage_post.id_partage = ? `

    Post.query(recupUnPartage, id ,  (err, result) => {
        if (err) {
            return res.status(500).json(err)         
        }if(result.length == 0) {
            return res.status(400).json({message: "Aucun partage à éffectué !"})
        } else      
            return res.status(200).json(result)
    })
};