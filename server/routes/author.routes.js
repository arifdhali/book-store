const express = require("express");
const authorRoute = express.Router();
const validAuthorVerify = require("../middleware/verify.auth");
const { AuthorLogin, AuthorLogout } = require("../controllers/auth/author.controller");
const HomepageController = require("../controllers/author/Home.Controller");


authorRoute.get("/", validAuthorVerify, HomepageController)



// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/logout", AuthorLogout);

module.exports = authorRoute;