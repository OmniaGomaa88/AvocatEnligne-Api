const express = require("express");
const { request, response } = require("express");
const rendezVousRouter = express.Router();
const isAuthClient = require("../middlewares/isAuthClient");
const isAuthAvocat =require('../middlewares/isAuthAvocat')

const rendezVous_controuller = require("../controllers/rendezVous_controller");


rendezVousRouter.post(
  "/api/addRendezVous/:id",
  isAuthClient,
  rendezVous_controuller.newRendezVous
);


rendezVousRouter.get(
  "/api/RendezVous",
  isAuthAvocat,
  rendezVous_controuller.findMesRendezVous
);
rendezVousRouter.get(
  "/api/client/RendezVous",
  isAuthClient,
  rendezVous_controuller.findClientRendezVous
);

rendezVousRouter.post(
  "/api/client/Annule",
  isAuthClient,
  rendezVous_controuller.annulerParClient
);


rendezVousRouter.post(
  "/api/Annule",isAuthAvocat,
  rendezVous_controuller.annulerParAvocat
);

module.exports = rendezVousRouter;
