const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");
const jwt = require('jsonwebtoken');

// supprime un message

// on utilise jwt pour recuperer et comparer si le token lier au infos et different alors on aura une erreur

exports.deletePost = (req, res) => {
 
    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    const administrateur = decodedToken.administrateur
    let postId = req.params.id;

//console.log(userId);

    let recupOne = `SELECT * FROM posts WHERE id_post = ?`
    let supprime = `DELETE FROM posts WHERE id_post = ? `

    Post.query( recupOne, postId, (err, result) => {
        if (result.length == 0) {
            return res.status(400).json({message: "Aucun messages à supprimer !"})
        }
        if (userId !== result[0].id_utilisateur_post && administrateur === false) {
            // console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            // console.log("tu peux effacer les données !");
            Post.query( supprime , postId, (err, result) => {
                            if (err) {
                                return res.status(500).json(err)         
                            }else
                                return res.status(200).json({ message: 'Votre post à été supprimé !'})
                            })   
        }
    })
   
};