const client = require("../models/client");
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
 exports.AddNewClient=(request,response)=>{
    const {
        prenom,
        nom,
        Email,
        Password,
        Telephone,
        Adress,
      } = request.body;
      client.selectEmail(Email, (error, result) => {
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
          const saltRounds = 10;
          bcrypt.hash(Password, saltRounds, (error, hash) => {
            if (error) {
              console.log(error)

              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            } else {
              const newclient = {
                prenom,
                nom,
                Email,
                Password:hash,
                Telephone,
                Adress,
              };
              console.log("neclient object:", newclient);
              client.addClient(
                newclient,
                (error, result) => {
                  console.log(error)
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
          });
        }
      });
 }