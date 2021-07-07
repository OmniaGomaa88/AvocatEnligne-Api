const express =require ("express")
const { request, response } = require("express")
const AvocatRouter = express.Router()
const avocatController =require("../controllers/Avocat_controller")
AvocatRouter.post("/api/signup",avocatController.newAvocat)
AvocatRouter.get("/api/avocats",avocatController.getAllAvocat)
AvocatRouter.get("/api/avocat/:id",avocatController.getAvocatById)
module.exports=AvocatRouter