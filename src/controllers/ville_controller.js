const { request, response } = require("express");
const ville =require("../models/ville")
const {
    OK,
    SERVER_ERROR,
    BAD_REQUEST,
    EMAIL_EXISTE,
  } = require("../helpers/stuts_code");
exports.findAllvills=(request,response)=>{
    ville.getAllVills((error,result)=>{
        if (error) {
            response.status(SERVER_ERROR).json({
              message: "le servre founuction plus.",
            });
          } else
            response.status(OK).json({
              result,
            });
    })
}