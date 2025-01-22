const express = require("express");
const authorRoute = express.Router();
const { AuthorLogin, AuthorLogout, AuthorRegister } = require("../controllers/auth/author.controller");
const uploadMulter = require("../utils/multer");
const author_protected_routes = require("./author.protected.routes");
const AuthorizedRole = require("../middleware/roleVerify");
const AuthorAuthenticateJWTtoken = require("../middleware/author.auth");
const uploadAuthor = uploadMulter("author");

// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/register", uploadAuthor.single('thumbnail'), AuthorRegister);
authorRoute.post("/logout", AuthorLogout);

/*
@ all protected routes here under the author_protected_routes
*/

authorRoute.use(AuthorAuthenticateJWTtoken, AuthorizedRole(['author']), author_protected_routes);

module.exports = authorRoute;