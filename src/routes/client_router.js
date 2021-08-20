const express = require("express");
const cleintController = require("../controllers/client_controller");
const clientRouter = express.Router();
const isAuthClient = require("../middlewares/isAuthClient");


clientRouter.post("/api/client/signup", cleintController.AddNewClient);
clientRouter.post("/api/client/Login", cleintController.clientLogin);
clientRouter.get("/api/client", isAuthClient, cleintController.getClient);
clientRouter.put("/api/client/ubdateData",isAuthClient, cleintController.updateClientData);


module.exports = clientRouter;
