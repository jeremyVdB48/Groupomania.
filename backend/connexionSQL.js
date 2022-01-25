const mysql = require("mysql"); 


const db = mysql.createConnection({

    host: "localhost", 

    database: "groupomania", 
 
    user: "root", 
 
    password: "" 
 
  });
  db.connect((err) => {
    if (err) {
      console.log(err.message);
      
    } else {
      console.log("Connectée à mySQL !");
    }

    
  });

  module.exports = db;