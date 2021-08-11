const db = require("../db/db");
exports.villId =  (Ville, Callback) => {
    let villIdQuery =  `SELECT id FROM Ville WHERE nom ="${Ville}"`;
    db.query(villIdQuery, (error, result) => {
      if (error) {
        console.log("error:", error);
        return;
      } else {
        Callback(null, result);
      }
    });
  };
  exports.getAllVills= async (Callback) => {
    let villsQuery = await `SELECT * FROM Ville `;
    db.query(villsQuery, (error, result) => {
      if (error) {
        console.log("error:", error);
        return;
      } else {
        Callback(null, result);
      }
    });
  };