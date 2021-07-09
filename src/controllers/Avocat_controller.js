const Avocat = require("../models/Avocat");
const Specialite = require("../models/specialite");
const ville = require("../models/ville");
const client = require("../models/client");
const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "motSecret";
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60;
const {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  EMAIL_EXISTE,
  UNAUTHORIZED,
} = require("../helpers/stuts_code");
const { json } = require("body-parser");

exports.getAllAvocat = (request, response) => {
  const ville = request.params.ville;
  const Specialite = request.params.Specialite;

  Avocat.getAll(ville, Specialite, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else
      response.status(OK).json({
        result,
      });
  });
};

exports.getAvocatById = (request, response) => {
  const { id } = request.params;
  Avocat.getById(id, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else {
      response.status(OK).json({
        result,
      });
    }
  });
};
exports.newAvocat = (request, response) => {
  const {
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
  } = request.body;
  console.log(request.body);

  let SpecialiteId = 0;
  let villId = 0;
  Avocat.selectSpecialiteId(Specialite, (error, result) => {
    if (error) {
      console.log(error);
    }
    SpecialiteId = result[0].id;
    console.log("SpecialiteId in controller:", SpecialiteId);

    ville.villId(Ville, (error, result) => {
      if (error) {
        console.log(error);
      }
      villId = result[0].id;
      console.log("villId in controller:", villId);

      Avocat.selectEmail(Email, (error, result) => {
        console.log("emeil in selectEmail controller", Email);
        console.log(result);
        if (error) {
          console.log(error);
        } else if (result.length !== 0) {
          response.status(EMAIL_EXISTE).json({
            message:
              "Un utilisateur utilisant cette adress email est dèjà enregistré",
          });
        } else {
          const saltRounds = 10;
          bcrypt.hash(Password, saltRounds, (error, hash) => {
            if (error) {
              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            } else {
              const newAvocat = {
                prenom,
                nom,
                Email,
                Password: hash,
                Telephone,
                Adress,
                Ville,
                Presentation,
                Specialite,
                Honorare,
              };
              console.log("neAvocat object:", newAvocat);
              Avocat.addAvocat(
                SpecialiteId,
                villId,
                newAvocat,
                (error, result) => {
                  if (error) {
                    response.status(SERVER_ERROR).json({
                      message: "le servre founuction plus.",
                    });
                  }
                  response.status(OK).json({
                    message: "user add successfule",
                    prenom: newAvocat.prenom,
                    nom: newAvocat.nom,
                    Email: newAvocat.Email,
                    Telephone: newAvocat.Telephone,
                    Adress: newAvocat.Adress,
                    Ville: newAvocat.Ville,
                    Presentation: newAvocat.Presentation,
                    Specialite: newAvocat.Specialite,
                    Honorare: newAvocat.Honorare,
                  });
                  console.log(result);
                }
              );
            }
          });
        }
      });
    });
  });
};
// get specialite
exports.fiendAllSpecialites = (request, response) => {
  Avocat.getAllSpecialite((error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else
      response.status(OK).json({
        result,
      });
  });
};
// login de avocat et client
exports.login = (request, response) => {
  const { Email, password } = request.body;
  Avocat.selectEmail(Email, (error, result) => {
    if (error) {
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      });
    } else if (result.length === 0) {
      client.selectEmail(Email, (error, result) => {
        if (error) {
          response.status(SERVER_ERROR).json({
            message: "le servre founuction plus.",
          });
        } else if (result.length === 0) {
          response.status(UNAUTHORIZED).json({
            message: "email n'exist pas",
          });
        }
        const hash = result[0].password;
        bcrypt.compare(password, hash, (error, correct) => {
          if (!correct) {
            response.status(UNAUTHORIZED).json({
              message: "votre mot de pass n'est pas correct",
            });
          }
          const user = {
            id: result[0].id,
            prenom: result[0].Prénom,
            nom: result[0].Nom,
            Email: result[0].Email,
            Password: result[0].Password,
            Telephone: result[0].Telephone,
            Adress: result[0].Adress,
            Ville: result[0].Ville,
            Presentation: result[0].Presentation,
            Specialite: result[0].Spécialité,
            Honorare: result[0].Honorare,
            exp: MAXAGE,
          };
          jwt.sign(user, SECRET, (error, token) => {
            if (error) {
              response.status(SERVER_ERROR).json({
                message: "le servre founuction plus.",
              });
            }
            request.user = {
              id: result[0].id,
              prenom: result[0].Prénom,
              nom: result[0].Nom,
              Email: result[0].Email,
              Password: result[0].Password,
              Telephone: result[0].Telephone,
              Adress: result[0].Adress,
              Ville: result[0].Ville,
              Presentation: result[0].Presentation,
              Specialite: result[0].Spécialité,
              Honorare: result[0].Honorare,
            };
            response.cookie("authcookie", token, { maxAge: MAXAGE });
            response.status(OK).json({
              token: token,
              user: {
                id: request.user.id,
                prenom: request.user.Prénom,
                nom: request.user.Nom,
                Email: request.user.Email,
                Password: request.user.Password,
                Telephone: request.user.Telephone,
                Adress: request.user.Adress,
                Ville: request.user.Ville,
                Presentation: request.user.Presentation,
                Specialite: request.user.Spécialité,
                Honorare: request.user.Honorare,
              },
            });
            
          });
        });
      });
    }
  });
};

// ubdate data

exports.updateAvocatData=(request,response)=>{
  const {id}=request.params
  const Email= request.body.Email
  const Adress= request.body.Adress
  const Ville= request.body.Ville
  const Presentation= request.body.Presentation
  Avocat.update(
                id,
                Email,
                Adress,
                Ville,
                Presentation,
       (error,result)=>{
    if(error){
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      })
    }
    response.status(OK).json({
      result
    })
  })
}
exports.updateAvocatTel=(request,response)=>{
  const {id}=request.params
  const Telephone= request.body.Telephone
  Avocat.updateTel(
                id,
                Telephone,
       (error,result)=>{
    if(error){
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      })
    }
    response.status(OK).json({
      result
    })
  })
}
exports.updateAvocatHonoraire=(request,response)=>{
  const {id}=request.params
  const Honorare= request.body.Honorare
  Avocat.updateHonoraire(
                id,
                Honorare,
       (error,result)=>{
    if(error){
      response.status(SERVER_ERROR).json({
        message: "le servre founuction plus.",
      })
    }
    response.status(OK).json({
      result
    })
  })
}
