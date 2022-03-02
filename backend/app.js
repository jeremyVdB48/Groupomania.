// importation des packages,routes et headers 

const express    = require("express"); // npm install --save express
const bodyParser = require("body-parser"); // npm install --save body-parser
const helmet     = require("helmet"); // npm install --save helmet
const cors       = require("cors"); // npm install --save cors
const morgan     = require("morgan"); // npm install morgan --dev

const routePost        = require("./routes/routes_posts"); // route messages
const routeUtilisateur = require("./routes/routes_utilisateurs"); // route utilisateurs

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json()); 
app.use(helmet()); // Helmet aide à protéger de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
app.use(cors());
app.use(morgan("dev"))

//Routes
app.use("/api/post", routePost);
app.use("/api/utilisateur", routeUtilisateur);

module.exports = app;