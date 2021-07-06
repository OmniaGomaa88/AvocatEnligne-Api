const AvocatRouter =require ("../routes/avocat_router")
const express =require ("express")
const { request, response } = require("express")
const notFound =require('../helpers/stuts_code')
const router = express.Router()
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