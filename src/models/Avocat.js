const db = require("../db/db");
exports.addAvocat = (id,newAvocat, Callback) => {
  db.query(`INSERT INTO Avocat 
    (id, Prénom, Nom, Email, Password,
         Telephone, Adress, Ville, Presentation,Spécialité,
          Honorare, Spécialité_id, Ville_id) VALUES
           ("${id}",
           "${newAvocat.prénom}",
           "${newAvocat.nom}",
           "${newAvocat.Email}",
           "${newAvocat.Password}",
           "${newAvocat.Telephone}",
           "${newAvocat.Adress}",
           "${newAvocat.Ville}",
           "${newAvocat.Presentation}"
           ,"${newAvocat.Spécialité}",
           "${newAvocat.Honorare}",
          (SELECT id FROM Spécialité WHERE nom =${newAvocat.Spécialité}),
          (SELECT id FROM Ville WHERE nom =${newAvocat.Ville} )
           );`),
    (error, result) => {
      if (error) {
        console.log("error:", error);
        Callback(error, null);
        return;
      }
      Callback(null, result);
    };
};
