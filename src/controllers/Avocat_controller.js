const Avocat =require("../models/Avocat")
const { request, response } = require("express")
const body_parser =require("body-parser")
const status =require("../helpers/stuts_code")

exports.newAvocat=((error,result)=>{
    const {
        prénom ,
        nom,
        Email,
        Password,
        Telephone,
        Adress,
        Ville,
        Presentation,
        Spécialité,
        Honorare
     }=request.body
     const {Avocat_id}=request.params;
     Avocat.addAvocat(Avocat_id,request.body,(error,result)=>{
        if(error){
            response.status(500).json({
               message:error
            })
         }
                response.status(201).json({
              result
            })
console.log(result)
     })
   
     })