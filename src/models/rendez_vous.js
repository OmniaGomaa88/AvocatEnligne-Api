const db = require("../db/db");
 exports.addRendezVous = async (avocatId, data, Callback) => {
   let addRendezVousdQuery = await `INSERT INTO RendezVous 
     (client_situation,date,heure,avocat_id,client_id) VALUES
     ("${data.client_situation}",
     "${data.date}",
     "${data.heure}",
     "${avocatId}",
     "${data.clientId}");`;
   db.query(addRendezVousdQuery, (error, result) => {
     if (error) {
      Callback(error, null);
      console.log("error:", error);
      return;
    } else {
      console.log(result)
       Callback(null, result);
    }
 });
};
// get avocat rendez-vous  avec client data 
exports.getMesRendezVous= async(avocatId,Callback)=>{
  let getRendezVousQuery = await `SELECT * FROM
  Clients  inner join RendezVous
   ON Clients.id =RendezVous.client_id
where avocat_id=${avocatId}`;
db.query(getRendezVousQuery, (error, result) => {
  if (error) {
    Callback(error, null);
    console.log("error:", error);
    return;
  } else {
    Callback(null, result);
  }
});
}