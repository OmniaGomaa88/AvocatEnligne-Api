const express =require ("express")
const { request, response } = require("express")
const rendezVousRouter = express.Router()
const isAuth= require("../middlewares/isAuth")
const rendezVous_controuller = require("../controllers/rendezVous_controller")
rendezVousRouter.post("/api/addRendezVous/:id",rendezVous_controuller.newRendezVous)
rendezVousRouter.get("/api/avocat/RendezVous",rendezVous_controuller.findMesRendezVous)
rendezVousRouter.get("/api/client/RendezVous",isAuth,rendezVous_controuller.findClientRendezVous)
rendezVousRouter.post("/api/client/updateAnnule/:id",rendezVous_controuller.annulerParClient)

module.exports=rendezVousRouter