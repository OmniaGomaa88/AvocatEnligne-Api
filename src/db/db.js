
const mysql = require("mysql2");
 const db= mysql.createConnection({
    host:"localhost",
   socketPath: "/home/simplon/.config/Local/run/zZyCPrE49/mysql/mysqld.sock",
    user: "root",
    password:"root",
    database: "Avocat"

})
db.connect((error)=>{
    if (error) throw error;
    console.log("connection de dataBase fonctionne")
    })
    module.exports=db;