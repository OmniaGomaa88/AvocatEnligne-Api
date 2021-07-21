const express = require("express");
const cors =require("cors")
const db=require("./db/db")
const router= require("./routes/index")

const cookie=require("cookie-parser")

const server = express();
server.use(cors())
server.use(cookie())
server.use(express.json());

server.use(express.urlencoded({extended: false}));

server.use(router)
server.listen(8080, () => {
    console.log('Connexion !');
})

