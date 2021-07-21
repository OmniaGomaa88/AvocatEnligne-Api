const express = require("express");
const { request, response } = require("express");
const villeRouter = express.Router();
const villeController = require("../controllers/ville_controller");
villeRouter.get("/api/vills", villeController.findAllvills);
module.exports = villeRouter;
