const express = require("express");
const authorRoute = express.Router();
const validAuthorVerify = require("../middleware/verify.auth");
const { AuthorLogin, AuthorLogout, AuthorRegister } = require("../controllers/auth/author.controller");
const HomepageController = require("../controllers/author/Home.Controller");
const uploadMulter = require("../utils/multer");
const { AddBookController } = require("../controllers/author/Book.controller");

const uploadAuthor = uploadMulter("author");


authorRoute.get("/", validAuthorVerify, HomepageController)
authorRoute.post("/book/add",uploadAuthor.single("thumbnail"), AddBookController);


// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/register", uploadAuthor.single('thumbnail'), AuthorRegister);
authorRoute.post("/logout", AuthorLogout);

module.exports = authorRoute;