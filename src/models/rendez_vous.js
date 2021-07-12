const db = require("../db/db");
 exports.addRendezVous = async (avocatId, data,clientId, Callback) => {
   let addRendezVousdQuery = await `INSERT INTO RendezVous 
     (client_situation,date,heure,avocat_id,client_id) VALUES
     ("${data.client_situation}",
     "${data.date}",
     "${data.heure}",
     "${avocatId}",
     "${clientId}");`;
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
console.log(avocatId)
db.query(getRendezVousQuery, (error, result) => {
  if (error) {
    Callback(error, null);
    console.log("error:", error);
    return;
  } else {
    console.log(result)
    Callback(null, result);
  }
});
}
// get client rendez-vous  avec avocat data 
exports.getClientRendezVous= async(clientId,Callback)=>{
  let getClientRendezVousQuery = await `SELECT * FROM
  Avocat  inner join RendezVous
   ON Avocat.id =RendezVous.avocat_id
where client_id=${clientId}`;
console.log(clientId)
db.query(getClientRendezVousQuery, (error, result) => {
  if (error) {
    Callback(error, null);
    console.log("error:", error);
    return;
  } else {
    Callback(null, result);
   
  }
});
}
// annuler rendez-vous par client
exports.rendezVousAnnuleClient=async(rendezVousId,clientId,Callback)=>{
   
  let rendezVousAnnuleClient = await `UPDATE RendezVous SET
  annulé=true
  WHERE id=${rendezVousId} AND client_id=${clientId}`
  db.query(rendezVousAnnuleClient, (error, result) => {
    if (error) {
      Callback(error, null);
      console.log("error:", error);
      return;
    } else {
      Callback(null, result);
      
    }
  });
  
}