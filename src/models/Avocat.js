const db = require("../db/db");

exports.getAll = async (ville, Specialite, Callback) => {
  let getAllQuery = await `SELECT * FROM Avocat WHERE Ville="${ville}" and Spécialité="${Specialite}" `;
  db.query(getAllQuery, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};
exports.getNouveauxAvocat = (Callback) => {
  let getNouveuxQuery =
    " SELECT * FROM Avocat ORDER BY Avocat.id DESC LIMIT 3 ";
  db.query(getNouveuxQuery, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};
exports.getById = async (id, Callback) => {
  let getById = await `SELECT * From Avocat WHERE id="${id}"`;
  db.query(getById, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};

exports.selectSpecialiteId = async (Specialite, Callback) => {
  let SpecialiteIdQuery = await `SELECT id FROM Spécialité WHERE nom ="${Specialite}"`;
  db.query(SpecialiteIdQuery, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};

exports.selectEmail = async (email, Callback) => {
  let selectElmail = await `SELECT * FROM Avocat WHERE Email="${email}"`;
  db.query(selectElmail, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};
// add new avocat
exports.addAvocat =  (SpecialiteId, villId, newAvocat, Callback) => {
  let AddAvocatQuery = `INSERT INTO Avocat 
  (Prénom,Nom,Email,Password,
       Telephone,Adress,Ville,Presentation,Spécialité,
        Honorare, Spécialité_id, Ville_id,image) VALUES
         ("${newAvocat.prenom}",
         "${newAvocat.nom}",
         "${newAvocat.Email}",
         "${newAvocat.Password}",
         "${newAvocat.Telephone}",
         "${newAvocat.Adress}",
         "${newAvocat.Ville}",
         "${newAvocat.Presentation}"
         ,"${newAvocat.Specialite}",
         "${newAvocat.Honorare}",
         "${SpecialiteId}",
         "${villId}",
         "${newAvocat.image}"
         );`;
  console.log(newAvocat.Password);
  db.query(AddAvocatQuery, (error, result) => {
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
// exports.uploadAvocatImage = (selectedFile, Callback) => {
//   let AddAvocatImage = `INSERT INTO Avocat 
//   (image) VALUES
//          ("${selectedFile}");`;
//   db.query(AddAvocatImage, (error, result) => {
//     if (error) {
//       console.log("error:", error);
//       Callback(error, null);
//       return;
//     } else {
//       Callback(null, result);
//       console.log("result:", result);
//     }
//   });
// };
// select all spicialite
exports.getAllSpecialite = async (Callback) => {
  let specialiteQuery = await `SELECT * FROM Spécialité `;
  db.query(specialiteQuery, (error, result) => {
    if (error) {
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};
exports.getAvocat = async (avocaId, Callback) => {
  let getAvocatQuery = await `SELECT * FROM Avocat WHERE id=${avocaId}`;
  db.query(getAvocatQuery, (error, result) => {
    console.log(error);
    if (error) {
      console.log("error:", error);
      Callback(error, null);
      return;
    } else {
      Callback(null, result);
    }
  });
};
exports.update = (id, Adress, Honorare, Telephone, Presentation, Callback) => {
  let updateDataQuery = `UPDATE Avocat SET
  Adress="${Adress}",
  Honorare=${Honorare},
  Telephone=${Telephone},
  Presentation="${Presentation}"
  WHERE id =${id}`;
  db.query(updateDataQuery, (error, result) => {
    if (error) {
      Callback(error, null);
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
    }
  });
};


