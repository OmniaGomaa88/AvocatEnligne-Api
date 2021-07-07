const db = require("../db/db");

exports.getAll = async (ville, Specialite, Callback) => {
  let getAllQuery = await `SELECT * FROM Avocat WHERE Ville="${ville}" and Spécialité="${Specialite}" `;
  db.query(getAllQuery, (error, result) => {
    try {
      Callback(null, result);
      console.log(result);
    } catch (error) {
      console.log("error:", error);
      Callback(error, null);
      return;
    }
  });
};
exports.getById = async (id, Callback) => {
  let getById = await `SELECT * From Avocat WHERE id="${id}"`;
  db.query(getById, (error, result) => {
    try {
      Callback(null, result);
      console.log(result);
    } catch (error) {
      Callback(error, null);
      console.log("error:", error);
      return;
    }
  });
};

exports.selectSpecialiteId = async (Specialite, Callback) => {
  let SpecialiteIdQuery = await `SELECT id FROM Spécialité WHERE nom ="${Specialite}"`;
  db.query(SpecialiteIdQuery, (error, result) => {
    try {
      Callback(null, result);
      console.log("the spec id:", result);
    } catch (error) {
      console.log("error:", error);
      Callback(error, null);
      return;
    }
  });
};

exports.villId = async (Ville, Callback) => {
  let villIdQuery = await `SELECT id FROM Ville WHERE nom ="${Ville}"`;
  db.query(villIdQuery, (error, result) => {
    try {
      Callback(null, result);
      console.log("the city id:", result);
    } catch (error) {
      Callback(error, null);
      console.log(error);
      return;
    }
  });
};

// add new avocat
exports.addAvocat = async (SpecialiteId, villId, newAvocat, Callback) => {
  let AddAvocatQuery = await `INSERT INTO Avocat 
  (Prénom,Nom,Email,Password,
       Telephone,Adress,Ville,Presentation,Spécialité,
        Honorare, Spécialité_id, Ville_id) VALUES
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
         "${villId}"
         );`;
  console.log("the SpecialiteId in addAvocat:", SpecialiteId);
  console.log("the villId in addAvocat:", villId);

  db.query(AddAvocatQuery, (error, result) => {
    try {
      Callback(null, result);
      console.log("resulet:", result);
    } catch (error) {
      console.log("error:", error);
      Callback(error, null);
      return;
    }
  });
};
