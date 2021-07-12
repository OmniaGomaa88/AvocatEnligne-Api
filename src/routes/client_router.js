const express =require ("express")
const cleintController =require("../controllers/client_controller")
const clientRouter = express.Router()
const isAuth= require("../middlewares/isAuth")

clientRouter.post("/api/cleint/signup",cleintController.AddNewClient)
clientRouter.post("/api/cleint/Login",cleintController.clientLogin)
clientRouter.get("/api/cleint",isAuth,cleintController.getClient)



module.exports=clientRouter