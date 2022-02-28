const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken = crée et vérifie les tokens d'authentification
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // nous extrayons seulement le token du header Authorization de la requête entrante.
    
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN );

    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {

      throw 'Invalid user ID';
      
    } else {
      next();
    }

    //req.token = jwt.verify(token, process.env.SECRET_TOKEN ); // la fonction verify permet de decoder le token si le résultat n'est pas valide alors une erreur sera générée et protection du code avec dotenv
    
      //next(); // si tous fonctionne on passe l'exécution avec next()
    

  } catch(e) {
    console.log(e)
    res.status(401).json({
      error: new Error('Requete invalide !')
    });
  }
};
