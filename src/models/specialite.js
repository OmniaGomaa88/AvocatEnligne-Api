
const db= require("../db/db")
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