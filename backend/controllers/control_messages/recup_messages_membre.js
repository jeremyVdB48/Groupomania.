const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


// recuperation des posts par utilisateur

exports.getUsersPosts = (req, res) => {
    let idUtilisateur = req.params.id;

    let recup = " SELECT * FROM posts WHERE posts.id_utilisateur_post = ? ";

        Post.query(recup , idUtilisateur , (err, result) => {
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