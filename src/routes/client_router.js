const express = require("express");
const cleintController = require("../controllers/client_controller");
const clientRouter = express.Router();
const isAuth = require("../middlewares/isAuth");

clientRouter.post("/api/client/signup", cleintController.AddNewClient);
clientRouter.post("/api/client/Login", cleintController.clientLogin);
clientRouter.get("/api/client", isAuth, cleintController.getClient);

module.exports = clientRouter;
