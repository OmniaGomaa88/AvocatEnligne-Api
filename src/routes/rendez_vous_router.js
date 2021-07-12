const express =require ("express")
const { request, response } = require("express")
const rendezVousRouter = express.Router()
const isAuth= require("../middlewares/isAuth")
const rendezVous_controuller = require("../controllers/rendezVous_controller")
rendezVousRouter.post("/api/addRendezVous/:id",isAuth,rendezVous_controuller.newRendezVous)
rendezVousRouter.get("/api/RendezVous",isAuth,rendezVous_controuller.findMesRendezVous)
rendezVousRouter.get("/api/client/RendezVous",isAuth,rendezVous_controuller.findClientRendezVous)
rendezVousRouter.post("/api/client/Annule/:id",isAuth,rendezVous_controuller.annulerParClient)
// rendezVousRouter.post("/api/client/updateAnnule/:id",isAuth,rendezVous_controuller.annulerParClient)


module.exports=rendezVousRouter