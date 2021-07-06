const express =require ("express")
const AvocatRouter = express.Router()
const avocatController =require("../controllers/Avocat_controller")
AvocatRouter.post("/api/signup",avocatController.newAvocat())