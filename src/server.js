const express = require("express");

const db=require("./db/db")
const cookie=require("cookie-parser")
const server = express();

const cors =require("cors")
server.use(cookie())
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.listen(3000, () => {
    console.log('Connexion !');
})

