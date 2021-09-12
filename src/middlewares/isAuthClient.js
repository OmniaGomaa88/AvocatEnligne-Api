const jwt = require("jsonwebtoken");
const SECRET = "motSecret";
const isAuthClient = (request, response, next) => {
  const token = request.headers.token;
  console.log(token);
  jwt.verify(token, SECRET, (error, client) => {
    if (error) {
      response.status(400).send(error.message);
    } else {
      const {
        clientId,
        clientPrenom,
        clientNom,
        clientEmail,
        clientTelephone,
        clientAdress,
      } = client;

      request.client = {
        isClient:true,
        clientId,
        clientPrenom,
        clientNom,
        clientEmail,
        clientTelephone,
        clientAdress,
      };
      next();
    }
  });
};

module.exports = isAuthClient;
