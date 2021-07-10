const express =require ("express")
const { request, response } = require("express")
const rendezVousRouter = express.Router()
const rendezVous_controuller = require("../controllers/rendezVous_controller")
rendezVousRouter.post("/api/addRendezVous/:id",rendezVous_controuller.newRendezVous)
rendezVousRouter.get("/api/MesRendezVous",rendezVous_controuller.findMesRendezVous)
rendezVousRouter.get("/api/clientRendezVous",rendezVous_controuller.findClientRendezVous)


module.exports=rendezVousRouter