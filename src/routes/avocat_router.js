const express = require("express");
const { request, response } = require("express");
const AvocatRouter = express.Router();
const isAuthAvocat = require("../middlewares/isAuthAvocat");
const avocatController = require("../controllers/Avocat_controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const limit = { fileSize: 2000000 };
const filefilte = function (req, file, cb) {
  cb(null, true);
};
const upload = multer({
  storage: storage,
  limits: limit,
  fileFilter: filefilte,
});

AvocatRouter.post(
  "/api/signup",
  upload.single("myImage"),
  avocatController.newAvocat
);

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
AvocatRouter.put(
  "/api/editTel",
  isAuthAvocat,
  avocatController.updateAvocatTel
);
AvocatRouter.post(
  "/api/editHonoraire",
  isAuthAvocat,
  avocatController.updateAvocatHonoraire
);

module.exports = AvocatRouter;
