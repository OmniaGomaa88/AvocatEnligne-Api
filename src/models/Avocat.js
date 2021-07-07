const db = require("../db/db");


exports.SelectIds= async(SpécialitéNom,villeNom,Callback)=>{
let SelectQuery =  await `SELECT id FROM Spécialité WHERE nom =${newAvocat.Spécialité}`
}

// add new avocat 
exports.addAvocat = (newAvocat, Callback) => {
  db.query(`INSERT INTO Avocat 
    (Prénom,Nom,Email,Password,
         Telephone,Adress,Ville,Presentation,Spécialité,
          Honorare) VALUES
           ("${newAvocat.prénom}",
           "${newAvocat.nom}",
           "${newAvocat.Email}",
           "${newAvocat.Password}",
           "${newAvocat.Telephone}",
           "${newAvocat.Adress}",
           "${newAvocat.Ville}",
           "${newAvocat.Presentation}"
           ,"${newAvocat.Spécialité}",
           "${newAvocat.Honorare}");`,
    (error, result) => {
      if (error) {
        console.log("error:", error);
        Callback(error, null);
        return;
      }
      
      Callback(null, result);
    });
};
