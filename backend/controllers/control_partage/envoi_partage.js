const Post = require("../../connexionSQL");



// partage de post

exports.partage =(req, res) => {
    let idUtilisateurPost = req.body.id_utilisateur_post;
    let id = req.params.id;

    let partages = `INSERT INTO partage_post VALUES (NULL , ? , ? , NOW() )`

    Post.query(partages, [idUtilisateurPost , id ] , (err, result) => {
        if (err) {
            return res.status(500).json(err)         
        }else
            return res.status(201).json({message: "Partage réussi !"})
    })
};