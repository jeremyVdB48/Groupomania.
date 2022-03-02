const Post = require("C:/Users/vdbje/Desktop/P7/backend/connexionSQL.js");


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