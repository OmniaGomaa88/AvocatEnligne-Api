const db = require("../db/db");

exports.getAll = async (ville, Specialite, Callback) => {
  let getAllQuery = await `SELECT * FROM Avocat WHERE Ville="${ville}" and Spécialité="${Specialite}" `;
  db.query(getAllQuery, (error, result) =>  {
    if(error) {
      console.log("error:", error);
      return;
    } else{
      Callback(null, result);
     
    }
  });
};
exports.getById = async (id, Callback) => {
  let getById = await `SELECT * From Avocat WHERE id="${id}"`;
  db.query(getById, (error, result) =>  {
    if(error) {
      console.log("error:", error);
      return;
    } else{
      Callback(null, result);
     
    }
  });
};

exports.selectSpecialiteId = async (Specialite, Callback) => {
  let SpecialiteIdQuery = await `SELECT id FROM Spécialité WHERE nom ="${Specialite}"`;
  db.query(SpecialiteIdQuery, (error, result) =>  {
    if(error) {
      console.log("error:", error);
      return;
    } else{
      Callback(null, result);
     
    }
  });
};

exports.villId = async (Ville, Callback) => {
  let villIdQuery = await `SELECT id FROM Ville WHERE nom ="${Ville}"`;
  db.query(villIdQuery, (error, result) =>  {
    if(error) {
      console.log("error:", error);
      return;
    } else{
      Callback(null, result);
     
    }
  });
};
exports.selectEmail = async (email, Callback) => {
  let selectElmail = await `SELECT * FROM Avocat WHERE Email="${email}"`;
  db.query(selectElmail, (error, result) => {
    if(error) {
      console.log("error:", error);
      return;
    } else{
      Callback(null, result);
     
    }
  });
};
// add new avocat
exports.addAvocat =  (SpecialiteId, villId, newAvocat, Callback) => {
  let AddAvocatQuery =  `INSERT INTO Avocat 
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
console.log(newAvocat.Password)
  db.query(AddAvocatQuery, (error, result) => {
    if(error){
      console.log("error:", error);
      Callback(error, null);
      return;
    }
    else {
      Callback(null, result);
      console.log("result:", result);
  
    } 
     
  });
};
