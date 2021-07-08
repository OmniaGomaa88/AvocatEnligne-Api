const express =require ("express")
const cleintController =require("../controllers/client_controller")
const clientRouter = express.Router()
clientRouter.post("/api/cleint/signup",cleintController.AddNewClient)

module.exports=clientRouter