const Post = require("../../connexionSQL");
const jwt = require('jsonwebtoken');

// supprime un commentaire

exports.deleteCommentaire =(req, res) => {

    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    const administrateur = decodedToken.administrateur
    let postId = req.params.id;

    let recupOne = `SELECT * FROM commentaire_post WHERE id_commentaire = ?`
    let suppComment = `DELETE FROM commentaire_post WHERE id_commentaire = ?`

    Post.query( recupOne, postId, (err, result) => {
        if (result.length == 0) {
            return res.status(400).json({message: "Aucun commentaire à supprimer !"})
        }
        if (userId !== result[0].id_utilisateur && administrateur === false) {
            // console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            // console.log("tu peux effacer les données !");
            Post.query( suppComment , postId, (err, result) => {
                            if (err) {
                                return res.status(500).json(err)         
                            }else
                                return res.status(200).json({ message: 'Votre commentaire à été supprimé !'})
                            })   
        }
    })

};