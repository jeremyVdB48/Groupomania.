const Post = require("../../connexionSQL");


// modifier un post 

// UPDATE permet de modifier ici on modifie un post
// SET est avec UPDATE pour spécifier les colonnes et les valeurs qui doivent être mises à jour dans une table

exports.modifyPost = (req, res) => {
    let texte = req.body.texte_post;
    let idPost = req.params.id;

    if (texte == "") {
        return res.status(400).json({message: "Envoyer au moins un mot !"})
    }
   
        let modifier = `UPDATE posts SET texte_post = ? WHERE id_post = ?`

            Post.query(modifier,[texte , idPost] , (err, result) => {
                if (err) {
                    return res.status(500).json(err)         
                }else
                    return res.status(201).json({ message: "message modifié avec succés !"})
            })
    
};