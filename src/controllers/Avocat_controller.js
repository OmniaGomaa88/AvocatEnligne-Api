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
      response.status(BAD_REQUEST).json({
        message: "le servre founuction plus.",
      });
    } else
      response.status(Ok).json({
        result,
      });
  });
};

exports.getAvocatById = (request, response) => {
  const { id } = request.params;
  Avocat.getById(id, (error, result) => {
    try {
      response.status(OK).json({
        result,
      });
    } catch (error) {
      response.status(BAD_REQUEST).json({
        message: "le servre founuction plus.",
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
  let data = request.body;
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
          Avocat.addAvocat(
            SpecialiteId,
            villId,
            request.body,
            (error, result) => {
              if (error) {
                response.status(BAD_REQUEST).json({
                  message: error,
                });
              }
              response.status(201).json({
                message: "user add successfule",
                data,
              });
              // console.log(result);
            }
          );
        }
      });
    });
  });
};
