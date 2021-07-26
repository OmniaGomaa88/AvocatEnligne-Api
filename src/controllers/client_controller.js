const client = require("../models/client");
const Avocat = require("../models/Avocat");
const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "motSecret";
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60;
const {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  EMAIL_EXISTE,
  UNAUTHORIZED,
} = require("../helpers/stuts_code");
const { json } = require("body-parser");
exports.AddNewClient = (request, response) => {
  const { prenom, nom, Email, Password, Telephone, Adress } = request.body;
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
          console.log(error);

          response.status(SERVER_ERROR).json({
            message: "le servre founuction plus.",
          });
        } else {
          const newclient = {
            prenom,
            nom,
            Email,
            Password: hash,
            Telephone,
            Adress,
          };
          console.log("neclient object:", newclient);
          client.addClient(newclient, (error, result) => {
            console.log(error);
            if (error) {
              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            }
            response.status(OK).json({
              message: "user add successfule",
              prenom: newclient.prenom,
              nom: newclient.nom,
              Email: newclient.Email,
              Telephone: newclient.Telephone,
              Adress: newclient.Adress,
            });
            console.log(result);
          });
        }
      });
    }
  });
};
// login de  client
exports.clientLogin = (request, response) => {
  const { email, password } = request.body;
  console.log(request.body);
  client.selectEmail(email, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else if (result.length === 0) {
      response.status(UNAUTHORIZED).json({
        message: "email n'exist pas",
      });
    } else {
      const hash = result[0].Password;
      bcrypt.compare(password, hash, (error, correct) => {
        console.log(password);
        console.log(hash);
        if (error) {
          console.log(error);
        }
      else  if (!correct) {
          response.status(UNAUTHORIZED).json({
            message: "votre mot de pass n'est pas correct",
          });
        }
        else{
          const client = {
            clientId: result[0].id,
            clientPrenom: result[0].Prénom,
            clientNom: result[0].Nom,
            clientEmail: result[0].Email,
            clientPassword: result[0].Password,
            clientTelephone: result[0].Telephone,
            clientAdress: result[0].Adresse,
            expier: MAXAGE,
          };
          jwt.sign(client, SECRET, (error, token) => {
            if (error) {
              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            }
            request.client = {
              clientId: result[0].id,
              clientPrenom: result[0].Prénom,
              clientNom: result[0].Nom,
              clientEmail: result[0].Email,
              clientPassword: result[0].Password,
              clientTelephone: result[0].Telephone,
              clientAdress: result[0].Adresse,
            };
  
            response.status(OK).json({
                token: token,
                isClient: true,
                isAvocat:false,
                id: request.client.clientId,
                prenom: request.client.clientPrenom,
                nom: request.client.clientNom,
                Email: request.client.clientEmail,
                Telephone: request.client.clientTelephone,
                Adress: request.client.clientAdress,
              
            });
            console.log("token",token)
          });
        } 
      });
    }
  });
};
exports.getClient = (request, response) => {
  const clientId = request.client.clientId;
  console.log(clientId);
  client.getClient(clientId, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else {
      response.status(OK).json({
        result,
      });
    }
  });
};
