const express =require ("express")
const router = express.Router()
const AvocatRouter =require ("../routes/avocat_router")

const { request, response } = require("express")
const notFound =require('../helpers/stuts_code')

router.use(AvocatRouter)
router.get("/api",(request,response)=>{
    response.json({
message:"hello world"
    })
})
router.use("*",(request,response)=>{
    response.status(notFound).json({
        message:'this page is not found'
    })
})
module.exports= router