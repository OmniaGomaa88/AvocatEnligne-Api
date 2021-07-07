const express =require ("express")
const { request, response } = require("express")
const AvocatRouter = express.Router()
const avocatController =require("../controllers/Avocat_controller")
AvocatRouter.post("/api/signup",avocatController.newAvocat)
module.exports=AvocatRouter