const RendezVous = require("../models/rendez_vous");
const { request, response } = require("express");
const { OK, SERVER_ERROR } = require("../helpers/stuts_code");
//
exports.newRendezVous = (request, response) => {
  const avocatId = request.params.id;
  const { client_situation, date} = request.body;
  const clientId = request.client.clientId;
  RendezVous.addRendezVous(
    avocatId,
    request.body,
    clientId,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(SERVER_ERROR).json({
          message: error,
        });
      } else {
        response.status(OK).json({
         result
        });
      }
    }
  );
};
// get avocat rendez-vous  avec client data
exports.findMesRendezVous = (request, response) => {
  const avocatId = request.avocat.id;
  RendezVous.getMesRendezVous(avocatId, (error, result) => {
    if (error) {
      console.log(error);
      response.status(SERVER_ERROR).json({
        message: error,
      });
    } else {
      response.status(OK).json({
        result,
      });
    }
  });
};
// get client rendez-vous  avec avocat data
exports.findClientRendezVous = (request, response) => {
  const clientId = request.client.clientId;
  console.log(request);
  RendezVous.getClientRendezVous(clientId, (error, result) => {
    if (error) {
      console.log(error);
      response.status(SERVER_ERROR).json({
        message: error,
      });
    } else {
      response.status(OK).json({
        result,
      });
    }
  });
};
exports.annulerParClient = (request, response) => {
  const rendezVousId = request.body.rendezVousId;
  const clientId = request.client.clientId;
  RendezVous.rendezVousAnnuleClient(rendezVousId, clientId, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else {
      response.status(OK).send({
        message: "le rendez-vous est annulé.",
      });
    }
  });
};
exports.annulerParAvocat = (request, response) => {
  const rendezVousId = request.body.rendezVousId;
  const avocatId = request.avocat.id;
  RendezVous.rendezVousAnnuleClient(avocatId, rendezVousId, (error, result) => {
    console.log(avocatId);
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else {
      response.status(OK).json({
        message: "le rendez-vous est annulé.",
      });
    }
  });
};
