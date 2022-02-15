const express    = require("express"); // npm install --save express
const bodyParser = require("body-parser"); // npm install --save body-parser
const helmet     = require("helmet"); // npm install --save helmet
const cors       = require("cors"); // npm install --save cors
const morgan = require("morgan")
const routePost        = require("./routes/routes_posts");
const routeUtilisateur = require("./routes/routes_utilisateurs");

const app = express();
app.use(morgan("dev"))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json()); 
app.use(helmet());
app.use(cors());

//Routes
app.use("/api/post", routePost);
app.use("/api/utilisateur", routeUtilisateur);

module.exports = app;