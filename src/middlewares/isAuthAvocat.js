const jwt = require("jsonwebtoken");
const SECRET = "motSecret";
const isAuthAvocat = (request, response, next) => {
  const token = request.headers.token;

  jwt.verify(token, SECRET, (error, avocat) => {
    if (error) {
      response.send(error.message);
    } else {
      const {
        id,
        prenom,
        nom,
        Email,
        Telephone,
        Adress,
        Ville,
        Presentation,
        Specialite,
        Honorare,
       
      } = avocat;

      request.avocat = {
        id,
        prenom,
        nom,
        Email,
        Telephone,
        Adress,
        Ville,
        Presentation,
        Specialite,
        Honorare,
       
      };
      next();
    }
  });
};
module.exports = isAuthAvocat;
