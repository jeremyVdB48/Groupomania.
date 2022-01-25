const Post = require("../connexionSQL");

//  `SELECT  posts.id_post, posts.texte_post, posts.date_post, utilisateurs.pseudo_utilisateur 
//     FROM  posts, utilisateurs 
//         WHERE posts.id_post = utilisateurs.id_utilisateur  `

///////////////////////////////////// MESSAGES /////////////////////////////////////////////
       
// recuperation de tous les messages
exports.getAllPost = (req, res) => {
    let recupAll = 'SELECT * FROM posts'
        Post.query(recupAll, (err, result) => {                  
            if (err) {
                return res.status(400).json(err)
            } else       
                return res.status(201).json(result)
           
        
    })
};
// nouveau message
exports.createPost = (req, res) => {
    let requete = `INSERT INTO posts VALUES  (NULL, "${req.body.texte_post}", NOW(), ${req.body.id_utilisateur_post})`
        Post.query(requete, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json({ message: 'Votre post à été publié !'})
    });       
    
    
};
// recupere un message
exports.getOnePost = (req, res) => {
    let recupOne = `SELECT * FROM posts WHERE id_post = ("${req.params.id}")`   
        Post.query( recupOne, (err, result) => {
            if (err) {
                return res.status(400).json(err)
            }else
                return res.status(201).json(result)
    })
};

// supprime un message
exports.deletePost = (req, res) => {
    let supprime = `DELETE FROM posts WHERE id_post = ("${req.params.id}")`
        Post.query( supprime ,(err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json({ message: 'Votre post à été supprimé !'})
    })       
};

// recuperation des posts par utilisateur
exports.getUsersPosts =(req, res) => {
    let recup = `SELECT * FROM posts WHERE posts.id_utilisateur_post = ${req.params.id}`
        Post.query(recup, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json(result)
    })
    
};

///////////////////////////////// COMMENTAIRE DE POST /////////////////////////////////////////////

// commentaire
exports.commentaire =(req, res) => {
    let comment = `INSERT INTO commentaire_post VALUES (NULL, ${req.body.id_utilisateur}, ${req.body.id_post}, NOW(), "${req.body.commentaire}")`
        Post.query(comment, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json({ message: 'Votre commentaire a été publié !'})
    })
};

// recuperation de tous les commentaires
exports.recupAllCommentaire =(req, res) => {
    let recupAllComment = `SELECT * FROM commentaire_post`
        Post.query(recupAllComment, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json(result)
        })
};

// recuperation d'un commentaire
exports.recupOneCommentaire =(req, res) => {
    let recupOneComment = `SELECT * FROM commentaire_post WHERE id_commentaire = ${req.params.id}`
        Post.query(recupOneComment, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json(result)
        })
}

// supprime un commentaire
exports.deleteCommentaire =(req, res) => {
    let suppComment = `DELETE FROM commentaire_post WHERE id_commentaire = ${req.params.id}`
        Post.query(suppComment, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(201).json({ message: 'Votre commentaire a été supprimé !'})
        })
};