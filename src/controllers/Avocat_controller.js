const Avocat = require("../models/Avocat");
const { request, response } = require("express");

const {OK, SERVER_ERROR, BAD_REQUEST} = require("../helpers/stuts_code");
const { json } = require("body-parser");


exports.getAllAvocat= (request,response)=>{
  const ville=request.params.ville
   const Specialite = request.params.Specialite

   Avocat.getAll(ville,Specialite,(error,result)=>{
    if (error) {
      response.status(500).json({
        message: 'le servre founuction plus.'
      });
    }else 
    response.status(200).json({
      result
    });

   })
 
  
}

exports.getAvocatById=(request,response)=>{
 const {id}=request.params
 Avocat.getById(id,(error,result)=>{
   try{
 response.status(OK).json({
     result
   })
   }
   catch(error){
     response.status(BAD_REQUEST).json({
      message: 'le servre founuction plus.'
     })
   }
  
 })
}
exports.newAvocat = (request, response) => {
  const {
    prénom,
    nom,
    Email,
    Password,
    Telephone,
    Adress,
    Ville,
    Presentation,
    Spécialité,
    Honorare,
  } = request.body;
  console.log(request.body);
  let data = request.body;

  Avocat.selectSpécialitéId(request.body, (error, result) => {
      console.log(data.Ville)
         if(error){
           console.log(error)
         }
         let SpécialitéId= result[0].id
    });
  Avocat.villId(request.body,
    (error, result) => {
      if(error){
        console.log(error)
      }
      let villId= result[0].id
    });
  Avocat.addAvocat(SpécialitéId, villId, request.body, (error, result) => {
    if (error) {
      response.status(500).json({
        message: error,
      });
    }
    response.status(201).json({
      message: "user add successfule",
      data,
    });
    console.log(result);
  });
};
