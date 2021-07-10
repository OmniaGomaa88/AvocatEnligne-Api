const RendezVous = require("../models/rendez_vous");
const { request, response } = require("express");
const { OK, SERVER_ERROR } = require("../helpers/stuts_code");
// 
 exports.newRendezVous = (request, response) => {
   const avocatId = request.params.id;
 
   const {
     client_situation,
     date,
    // pour l'instant on vais avoire le  client id manuellement
     clientId,
   } = request.body;
   RendezVous.addRendezVous(avocatId, request.body, (error, result) => {
     if (error) {
       console.log(error);
       response.status(SERVER_ERROR).json({
         message: error,
       });
     } else {
       response.status(OK).json({
         client_situation: request.body.client_situation,
         date: request.body.date,
         heure: request.body.heure
       });
     }
   });
 };
// get avocat rendez-vous  avec client data 
exports.findMesRendezVous=(request,response)=>{
 // pour l'instant on vais avoire avocat  id manuellement
  let avocatId=2
  RendezVous.getMesRendezVous(avocatId,(error,result)=>{
    if (error) {
      console.log(error);
      response.status(SERVER_ERROR).json({
        message: error,
      });
    } else {
      response.status(OK).json({
        id: result[0].id,
        client:{
        prenom:result[0].prénom,
        nom:result[0].Nom,
        email:result[0].Email,
        telphone:result[0].Telephone,
        adress:result[0].Adresse
        },
        RedezVous:{
          client_situation:result[0].client_situation,
          date:result[0].date,
          heure:result[0].heure,
        }
      });
    }
  })
}
// get client rendez-vous  avec avocat data 
exports.findClientRendezVous=(request,response)=>{
  // pour l'instant on vais avoire client Id   manuellement
   let clientId=2
   RendezVous.getClientRendezVous(clientId,(error,result)=>{
     if (error) {
       console.log(error);
       response.status(SERVER_ERROR).json({
         message: error,
       });
     } else {
       response.status(OK).json({
         id: result[0].id,
         avocat:{
         prenom:result[0].prénom,
         nom:result[0].Nom,
         email:result[0].Email,
         telphone:result[0].Telephone,
         adress:result[0].Adresse,
         Ville:result[0].Ville,
         presentation:result[0].presentation,
         specialite:result[0].Spécialité,
         honoraire:result[0].Honorare
         },
         RedezVous:{
           client_situation:result[0].client_situation,
           date:result[0].date,
           heure:result[0].heure,
         }
       });
     }
   })
 }
