const express = require("express");
const authorRoute = express.Router();
const { validAdminVerify } = require("../middleware/verify.auth");
const { AuthorLogin, AuthorLogout } = require("../controllers/auth/author.controller");


authorRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})



// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/logout", AuthorLogout);

module.exports = authorRoute;