
const jwt = require('jsonwebtoken');
const SECRET = "motSecret";
const { request, response } = require("express");
const isAuth = (request, response, next) => {
  const token = request.cookies.authcookie;
 
console.log(token)
  jwt.verify(token, SECRET, (error, avocat) => {
    if (error) {
      response.send(error.message);
    } else {
      const {
        id,
        prenom,
        nom,
        Email,
        Password,
        Telephone,
        Adress,
        Ville,
        Presentation,
        Specialite,
        Honorare,
        exp } = avocat;
     

      // Useless or not ?!
      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");
        response.json({
           message:"Session expired. Try to reconnect you."
        });
      }

      request.avocat = { 
        id,
        prenom,
        nom,
        Email,
        Password,
        Telephone,
        Adress,
        Ville,
        Presentation,
        Specialite,
        Honorare,
     };
  
  

     
    }
  })
  jwt.verify(token, SECRET, (error, client) => {
    if (error) {
      response.send(error.message);
    } else {
         const {
          clientId,
          clientPrenom,
          clientNom,
          clientEmail,
          clientPassword,
          clientTelephone,
          clientAdress,
          expier } = client;

      // Useless or not ?!
      if (Date.now() / 1000 >= expier) {
        response.clearCookie("authcookie");
        response.json({
           message:"Session expired. Try to reconnect you."
        });
      }

  
     request.client = { 
       clientId,
          clientPrenom,
          clientNom,
          clientEmail,
          clientPassword,
          clientTelephone,
          clientAdress,
     
    };
  

      next();
    }
  })
};

module.exports = isAuth;