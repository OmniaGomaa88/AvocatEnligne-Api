const Avocat = require("../models/Avocat");
const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "motSecret";
const {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  EMAIL_EXISTE,
} = require("../helpers/stuts_code");
const { json } = require("body-parser");

exports.getAllAvocat = (request, response) => {
  const ville = request.params.ville;
  const Specialite = request.params.Specialite;

  Avocat.getAll(ville, Specialite, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else
      response.status(OK).json({
        result,
      });
  });
};

exports.getAvocatById = (request, response) => {
  const { id } = request.params;
  Avocat.getById(id, (error, result) =>  {
    if(error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
      
    } else{
      response.status(OK).json({
        result,
      });
     
    }
  });
};
exports.newAvocat = (request, response) => {
  const {
    prenom,
    nom,
    Email,
    Password,
    Telephone,
    Adress,
    Ville,
    Presentation,
    Specialite,
    Honorare,
  } = request.body;
  console.log(request.body);
  
  let SpecialiteId = 0;
  let villId = 0;
  Avocat.selectSpecialiteId(Specialite, (error, result) => {
    if (error) {
      console.log(error);
    }
    SpecialiteId = result[0].id;
    console.log("SpecialiteId in controller:", SpecialiteId);

    Avocat.villId(Ville, (error, result) => {
      if (error) {
        console.log(error);
      }
      villId = result[0].id;
      console.log("villId in controller:", villId);

      Avocat.selectEmail(Email, (error, result) => {
        console.log("emeil in selectEmail controller", Email);
        console.log(result);
        if (error) {
          console.log(error);
        } else if (result.length !== 0) {
          response.status(EMAIL_EXISTE).json({
            message:
              "Un utilisateur utilisant cette adress email est dèjà enregistré",
          });
        } else {
          const saltRounds= 10
          bcrypt.hash(Password,saltRounds,(error,hash)=>{
            if(error){
              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            }
            else{
              const newAvocat = {
                prenom,
                nom,
                Email,
                Password:hash,
                Telephone,
                Adress,
                Ville,
                Presentation,
                Specialite,
                Honorare,
              }
              console.log("neAvocat object:",newAvocat)
              Avocat.addAvocat(
                SpecialiteId,
                villId,
                newAvocat,
                (error, result) => {
                  if (error) {
                    response.status(SERVER_ERROR).json({
                      message: "le servre founuction plus.",
                    });
                  }
                  response.status(OK).json({
                    message: "user add successfule",
                    result,
                  });
                   console.log(result);
                }
              );
            }
           
          })
          
        }
      });
    });
  });
};
