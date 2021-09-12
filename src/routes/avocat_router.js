const express = require("express");
const { request, response } = require("express");
const AvocatRouter = express.Router();
const isAuthAvocat = require("../middlewares/isAuthAvocat");
const avocatController = require("../controllers/Avocat_controller");


AvocatRouter.post(
  "/api/signup",
  avocatController.newAvocat
);
// AvocatRouter.post("/api/upload", avocatController.AddAvocatProfileImage);

AvocatRouter.get(
  "/api/avocats/:ville/:Specialite",
  avocatController.getAllAvocat
);

AvocatRouter.get("/api/NouveauxAvocats", avocatController.findNouveuxAvocat);

AvocatRouter.get("/api/avocat/:id", avocatController.getAvocatById);
AvocatRouter.get(
  "/api/avocatprofile",
  isAuthAvocat,
  avocatController.getAvocatData
);

AvocatRouter.get("/api/specialits", avocatController.fiendAllSpecialites);

AvocatRouter.post("/api/sigin", avocatController.login);

AvocatRouter.put(
  "/api/editData",
  isAuthAvocat,
  avocatController.updateAvocatData
);


module.exports = AvocatRouter;
