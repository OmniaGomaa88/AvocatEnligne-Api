const Avocat = require("../models/Avocat");
const { request, response } = require("express");
const status = require("../helpers/stuts_code");

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
  Avocat.addAvocat( request.body, (error, result) => {
    if (error) {
      response.status(500).json({
        message: error,
      });
    }
    response.status(201).json({
      result,
    });
    console.log(result);
  });
};
