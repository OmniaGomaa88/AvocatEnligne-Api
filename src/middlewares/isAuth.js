
const jwt = require('jsonwebtoken');
const SECRET = "motSecret";

const isAuth = (request, response, next) => {
  const token = response.cookie.authcookie;
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
      next();
    }
  })
};

module.exports = isAuth;