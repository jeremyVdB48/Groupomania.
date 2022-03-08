const Post = require("../../connexionSQL");


// recupere un message

exports.getOnePost = (req, res) => {
    let idPost = req.params.id

    let recupOne = "SELECT * FROM posts WHERE id_post = ? " 

        Post.query( recupOne, idPost , (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length == 0) {
                return res.status(400).json({message: "Aucun message ici !"})
            }
            else
                return res.status(200).json(result)
    })
};