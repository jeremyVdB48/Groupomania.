const mysql = require("mysql"); 
require("dotenv").config()

const db = mysql.createConnection({

    host: "localhost", 

    database: "groupomania", 
 
    user: process.env.SQL_USER, 
 
    password: process.env.SQL_PASSWORD
 
  });
  db.connect((err) => {
    if (err) {
      console.log(err.message);
      
    } else {
      console.log("Connectée à mySQL !");
    }

    
  });

  module.exports = db;