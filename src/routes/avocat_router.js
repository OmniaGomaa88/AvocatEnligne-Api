const express = require("express");
const { request, response } = require("express");
const AvocatRouter = express.Router();
const isAuth = require("../middlewares/isAuth");
const avocatController = require("../controllers/Avocat_controller");
AvocatRouter.post("/api/signup", avocatController.newAvocat);
AvocatRouter.get(
  "/api/avocats/:ville/:Specialite",
  avocatController.getAllAvocat
);
AvocatRouter.get("/api/avocat/:id", avocatController.getAvocatById);
AvocatRouter.get("/api/specialits", avocatController.fiendAllSpecialites);
AvocatRouter.post("/api/sigin", avocatController.login);
AvocatRouter.post("/api/editData", isAuth, avocatController.updateAvocatData);
AvocatRouter.post("/api/editTel", isAuth, avocatController.updateAvocatTel);
AvocatRouter.post(
  "/api/editHonoraire",
  isAuth,
  avocatController.updateAvocatHonoraire
);

module.exports = AvocatRouter;
