const express = require("express");
const authorRoute = express.Router();
const { AuthorLogin, AuthorLogout, AuthorRegister, AuthorForgotPassword, CheckingResetToken, AuthorResetPasswordController } = require("../controllers/auth/author.controller");
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
 * @route POST/forgot-password
 * @description Forgot password or password reset through the email 
 * @protected This will generate a token and that will be valid for 10 minutes 
 * @access Author
 */
authorRoute.post("/forgot-password", AuthorForgotPassword);
/**
 * @route POST/reset-password
 * @description Reset password will be validating the token with expired or not
 * @protected This will validdate the token and reset the password 
 * @access Admin
 */
authorRoute.post("/reset-password", AuthorResetPasswordController);
authorRoute.get("/reset-password", CheckingResetToken);


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