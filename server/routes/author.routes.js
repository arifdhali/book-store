const express = require("express");
const authorRoute = express.Router();
const { AuthorLogin, AuthorLogout, AuthorRegister } = require("../controllers/auth/author.controller");
const uploadMulter = require("../utils/multer");
const author_protected_routes = require("./author.protected.routes");
const AuthorAuthenticateJWTtoken = require("../middleware/author.auth");
const uploadAuthor = uploadMulter("author");

/**
 * @section Author Routes
 * These routes are publicly accessible and do not require authentication.
 */

/**
 * @route POST /login
 * @description Authenticates the author and issues a JWT token
 * @access Author
 */

authorRoute.post("/login", AuthorLogin);
/**
 * @route POST /register
 * @description Registers a new author account
 * @access Author
 */

authorRoute.post("/register", AuthorRegister);

/**
 * @route POST/logout 
 * @description Log out the author by clearing the token. 
 * @access Author  
 */

authorRoute.post("/logout", AuthorLogout);

/**
 * @section Protected Routes
 * All routes below this middleware require a valid JWT token.
 * The routes are managed under 'author_protected_routes'.
 * 
 * @middleware AuthorAuthenticateJWTtoken
 * This middleware checks the validity of the JWT token before granting access.
 */
authorRoute.use(AuthorAuthenticateJWTtoken, author_protected_routes);

module.exports = authorRoute;