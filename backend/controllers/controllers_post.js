const Post = require("../connexionSQL");
const jwt = require('jsonwebtoken');

///////////////////////////////////// MESSAGES /////////////////////////////////////////////
       
// recuperation de tous les messages et partage que l'on place dans un tableau
// SELECT me permet de recup les infos voulue 
// FROM selectionne les tables d'ou viennent les infos
// WHERE specifie une condition ici l'id utilisateur doit etre egal à l'id utilisateur du post
// ORDER BY permet de trier les lignes dans un résultat d’une requête ici par date et DESC trie par ordre décroissant
exports.getAllPost = (req, res) => {

    let tableauPartage = []

    let selection = `SELECT posts.id_post, posts.id_utilisateur_post, posts.texte_post, posts.date_post,
    utilisateurs.pseudo_utilisateur
    FROM posts, utilisateurs
    WHERE utilisateurs.id_utilisateur = posts.id_utilisateur_post
    ORDER BY posts.date_post DESC`

    Post.query(selection, (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        };
        if(result.length == 0 ) {
            return res.status(404).json({message: "Aucune publication !"})
        }
        // utilisation de forEach pour iterer sur le tableau
        result.forEach(element => {
            let pull = {

                partageId: null,

                idPost: element.id_post,

                idUtilisateurPost: element.id_utilisateur_post,

                textePost: element.texte_post,

                datePost: element.date_post,

                pseudoUtilisateur: element.pseudo_utilisateur,

                type: "Post"
            }
            tableauPartage.push(pull)
        });
        // AND ici permet de rajouter une 3 eme condition a WHERE
        let selectionPartage = `SELECT partage_post.*, partage_post.id_partage, partage_post.id_post_partage,
        utilisateurs.pseudo_utilisateur,
        posts.texte_post
        FROM partage_post, utilisateurs, posts
        WHERE partage_post.id_utilisateur_partage = utilisateurs.id_utilisateur
        AND partage_post.id_post_partage = posts.id_post
        ORDER BY date_partage_post DESC `
        Post.query(selectionPartage, (err,result) => {
            if (err) {
                return res.status(400).json(err)         
            };

            result.forEach(element => {
                let pull = {
                    partageId: element.id_partage,

                    idPost: element.id_post_partage,

                    idUtilisateurPost: element.id_utilisateur_partage,

                    textePost: element.texte_post,

                    datePost: element.date_partage_post,

                    pseudoUtilisateur: element.pseudo_utilisateur,

                    type: "Partage"
                }
                tableauPartage.push(pull)
            });
            tableauPartage.sort((a,b) => new Date(b.datePost) - new Date(a.datePost)); // La méthode sort() trie les éléments d'un tableau, dans ce même tableau, et renvoie le tableau
            return res.status(201).json(tableauPartage)// si tous fonctionne on retourne le tableauPartage
        });    
    })
    
};

// nouveau message
// INSERT permet de rajouter des données ici dans posts
// VALUES specifie les valeurs à ajouter
// NULL valeur inconnue ici l'id du post qui sera donnée par la suite par ma base de donnée ( auto increment )
// NOW() permet de retourner la date et heure du systeme
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
                return res.status(200).json(result)
    })
};

// supprime un message
// DELETE permet de supprimer des données ici on supprime par l'id du post grace a req.params.id
// exports.deletePost = (req, res) => {

//     let supprime = `DELETE FROM posts WHERE id_post = ? `

//         Post.query( supprime , req.params.id, (err, result) => {
//             if (err) {
//                 return res.status(400).json(err)         
//             }else
//                 return res.status(201).json({ message: 'Votre post à été supprimé !'})
//             })   
// };


exports.deletePost = (req, res) => {
 
    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    const administrateur = decodedToken.administrateur
    let postId = req.params.id;

console.log(userId);

    let recupOne = `SELECT * FROM posts WHERE id_post = ?`
    let supprime = `DELETE FROM posts WHERE id_post = ? `

    Post.query( recupOne, postId, (err, result) => {
        if (userId !== result[0].id_utilisateur_post && administrateur === false) {
            console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            console.log("tu peux effacer les données !");
            Post.query( supprime , postId, (err, result) => {
                            if (err) {
                                return res.status(400).json(err)         
                            }else
                                return res.status(201).json({ message: 'Votre post à été supprimé !'})
                            })   
        }
    })
   
};




// recuperation des posts par utilisateur
exports.getUsersPosts = (req, res) => {
    let recup = `SELECT * FROM posts WHERE posts.id_utilisateur_post = ${req.params.id}`
        Post.query(recup, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(200).json(result)
    })
    
};

// modifier un post 
// UPDATE permet de modifier ici on modifie un post
// SET est avec UPDATE pour spécifier les colonnes et les valeurs qui doivent être mises à jour dans une table
exports.modifyPost = (req, res) => {

   
        let modifier = `UPDATE posts SET texte_post = "${req.body.texte_post}" WHERE id_post = ${req.params.id}`
            Post.query(modifier, (err, result) => {
                if (err) {
                    return res.status(400).json(err)         
                }else
                    return res.status(201).json({ message: "message modifié avec succés !"})
            })
    
};

///////////////////////////////// COMMENTAIRE DE POST /////////////////////////////////////////////

// nouveau commentaire
exports.commentaire =(req, res) => {
    let comment = `INSERT INTO commentaire_post VALUES (NULL, ${req.body.id_utilisateur}, ${req.params.id}, NOW(), "${req.body.commentaire}")`
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
                return res.status(200).json(result)
        })
};

// recuperation d'un commentaire
exports.recupOneCommentaire =(req, res) => {
    let recupOneComment = `SELECT * FROM commentaire_post WHERE id_commentaire = ${req.params.id}`
        Post.query(recupOneComment, (err, result) => {
            if (err) {
                return res.status(400).json(err)         
            }else
                return res.status(200).json(result)
        })
}

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
        if (userId !== result[0].id_utilisateur && administrateur === false) {
            console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            console.log("tu peux effacer les données !");
            Post.query( suppComment , postId, (err, result) => {
                            if (err) {
                                return res.status(400).json(err)         
                            }else
                                return res.status(201).json({ message: 'Votre commentaire à été supprimé !'})
                            })   
        }
    })


    // let suppComment = `DELETE FROM commentaire_post WHERE id_commentaire = ${req.params.id}`
    //     Post.query(suppComment, (err, result) => {
    //         if (err) {
    //             return res.status(400).json(err)         
    //         }else
    //             return res.status(201).json({ message: 'Votre commentaire a été supprimé !'})
    //     })
};

// recupèration de tous les commentaires d'un seul message
exports.recupAllCommentOnePost =(req, res) => {
    let recupCommentairesForOnePost = `SELECT * FROM commentaire_post
    WHERE id_post = ${req.params.id} `

    Post.query(recupCommentairesForOnePost, (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        }else
            return res.status(200).json(result)
    })

};

//////////////////////////////// PARTAGE DE POST //////////////////////////////

// partage de post
exports.partage =(req, res) => {
    let partages = `INSERT INTO partage_post VALUES (NULL, ${req.body.id_utilisateur_post}, ${req.params.id}, NOW())`
    Post.query(partages, (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        }else
            return res.status(201).json({message: "Partage réussi !"})
    })
}

// recuperation d'un partage
exports.recupPartage =(req, res) => {
    let recupUnPartage = `SELECT partage_post.*, posts.texte_post
    FROM partage_post, posts
     WHERE posts.id_post = partage_post.id_post_partage AND partage_post.id_partage = ${req.params.id} `
    Post.query(recupUnPartage, (err, result) => {
        if (err) {
            return res.status(400).json(err)         
        }if(result.length == 0) {
            return res.status(400).json({message: "Aucun partage éffectué"})
        } else      
            return res.status(200).json(result)
    })
}

// supprime un partage
exports.suppUnPartage =(req, res) => {

    const token = req.headers.authorization.split(' ')[1];   
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );
    const userId = decodedToken.userId;
    const administrateur = decodedToken.administrateur
    let postId = req.params.id;

    let recupOne = `SELECT * FROM partage_post WHERE id_partage = ?`
    let suppPartage = `DELETE FROM partage_post WHERE id_partage = ? `

    Post.query( recupOne, postId, (err, result) => {
        if (userId !== result[0].id_utilisateur_partage && administrateur === false) {
            console.log("pas les droit d'effacer !");
            return res.status(403).json({message: "Pas les droits !"})
        }else{
            console.log("tu peux effacer les données !");
            Post.query( suppPartage , postId, (err, result) => {
                            if (err) {
                                return res.status(400).json(err)         
                            }else
                                return res.status(201).json({ message: 'Votre partage à été supprimé !'})
                            })   
        }
    })


    // let suppPartage = `DELETE FROM partage_post WHERE id_partage = ${req.params.id}`
    // Post.query(suppPartage, (err, result) => {
    //     if (err) {
    //         return res.status(400).json(err)         
    //     } else      
    //         return res.status(201).json({message: "Partage supprimé !"})
    // })
}

