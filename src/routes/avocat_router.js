const express =require ("express")
const { request, response } = require("express")
const AvocatRouter = express.Router()
const avocatController =require("../controllers/Avocat_controller")
AvocatRouter.post("/api/signup",avocatController.newAvocat)
AvocatRouter.get("/api/avocats/:ville/:Specialite",avocatController.getAllAvocat)
AvocatRouter.get("/api/avocat/:id",avocatController.getAvocatById)
AvocatRouter.get("/api/specialits",avocatController.fiendAllSpecialites)
AvocatRouter.post("/api/sigin",avocatController.login)
AvocatRouter.post("/api/editData/:id",avocatController.updateAvocatData)
AvocatRouter.post("/api/editTel/:id",avocatController.updateAvocatTel)
AvocatRouter.post("/api/editHonoraire/:id",avocatController.updateAvocatHonoraire)

module.exports=AvocatRouter