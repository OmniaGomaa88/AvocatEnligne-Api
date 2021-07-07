const db = require("../db/db");

exports.getAll=async(Avocat,Callback)=>{
let getAllQuery= await `SELECT * FROM Avocat WHERE Ville="${Avocat.ville}" and Spécialité="${Avocat.Spécialité}" `
  db.query(getAllQuery,(error,result)=>{
    try{
      Callback(null,result)
      console.log(result)
    }catch(error){
      console.log("error:",error)
      Callback(error,null)
      return
    }
  })  
}
exports.getById=async(id,Callback)=>{
  let getById = await `SELECT * From Avocat WHERE id="${id}"`
  db.query(getById,(error,result)=>{
    try{
      Callback(null,result)
      console.log(result)
    }catch(error){
      Callback(error,null)
      console.log("error:",error)
      return
    }
  })
}

exports.selectSpécialitéId = async (newAvocat, Callback) => {
  let SpécialitéIdQuery = await `SELECT id FROM Spécialité WHERE nom ="${newAvocat.Spécialité}"`;
  db.query(SpécialitéIdQuery,
    (error, result) => {
      try {
        Callback(null, result);
      } catch (error) {
        console.log("error:", error);
        Callback(error, null);
        return;
      }
    });
  }
  
  exports.villId = async (newAvocat, Callback) => {
    let villIdQuery = await `SELECT id FROM Ville WHERE nom ="${newAvocat.Ville}"`;
    db.query(villIdQuery,
      (error, result) => {
        try {
          Callback(null, result);
         
        } catch (error) {
          Callback(error, null);
          console.log(error);
          return;
        }
      });
  };


// add new avocat
exports.addAvocat = async (SpécialitéId, villId, newAvocat, Callback) => {
  let AddAvocatQuery = await `INSERT INTO Avocat 
  (Prénom,Nom,Email,Password,
       Telephone,Adress,Ville,Presentation,Spécialité,
        Honorare, Spécialité_id, Ville_id) VALUES
         ("${newAvocat.prénom}",
         "${newAvocat.nom}",
         "${newAvocat.Email}",
         "${newAvocat.Password}",
         "${newAvocat.Telephone}",
         "${newAvocat.Adress}",
         "${newAvocat.Ville}",
         "${newAvocat.Presentation}"
         ,"${newAvocat.Spécialité}",
         "${newAvocat.Honorare}",
         "${SpécialitéId}",
         "${villId}"
         );`;

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
