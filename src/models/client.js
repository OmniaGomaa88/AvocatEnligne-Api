const db = require("../db/db");

exports.selectEmail= async(email,Callback)=>{
    let selectElmailQuery = await `SELECT * FROM Clients WHERE Email="${email}"  `;
    db.query(selectElmailQuery, (error, result) => {
        console.log(error)
      if (error) {
        console.log("error:", error);
        Callback(error, null);
        return;
      } else {
        Callback(null, result);
        console.log("result:", result);
      }
    });
}
exports.addClient = async( newClient, Callback) => {
    let AddClientQuery = await `INSERT INTO Clients 
    (Prénom,Nom,Email,Password,
         Telephone,Adresse) VALUES
           ("${newClient.prenom}",
           "${newClient.nom}",
           "${newClient.Email}",
           "${newClient.Password}",
           "${newClient.Telephone}",
           "${newClient.Adress}"
           );`;
    db.query(AddClientQuery, (error, result) => {
        console.log(error)

      if (error) {
        console.log("error:", error);
        Callback(error, null);
        return;
      } else {
        Callback(null, result);
        console.log("result:", result);
      }
    });
  };

  