
const jwt = require('jsonwebtoken');
const SECRET = "motSecret";

const isAuth = (request, response, next) => {
  const token = response.cookie.authcookie;

  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      response.send(error.message);
    } else {
      const {
          id,
        email,
        password,
        first_name,
        last_name,
        role,
        exp } = user;

      // Useless or not ?!
      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");
        response.json({
           message:"Session expired. Try to reconnect you."
        });
      }

      request.user = { 
          id,
        email,
        password,
        first_name,
        last_name,
        role
     };
      next();
    }
  })
};

module.exports = isAuth;