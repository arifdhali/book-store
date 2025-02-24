const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout, AdminForgotPassword, AdminResetPasswordController, CheckingResetToken } = require("../controllers/auth/admin.controller");
const admin_protected_routes = require("./admin.protected.routes");
const AdminAuthenticateJWTtoken = require("../middleware/admin.auth");

/**
 * @section Admin Routes
 * These routes are publicly accessible and do not require authentication.
 */

/**
 * @route POST /login
 * @description Authenticates the author and issues a JWT token
 * @access Admin
 */

adminRoute.post("/login", AdminLogin);
/**
 * @route POST/logout 
 * @description Log out the author by clearing the token. 
 * @access Admin  
 */
adminRoute.post("/logout", AdminLogout);


/**
 * @route POST/forgot-password
 * @description Forgot password or password reset through the email 
 * @protected This will generate a token and that will be valid for 10 minutes 
 * @access Admin
 */
adminRoute.post("/forgot-password", AdminForgotPassword);


/**
 * @route POST/reset-password
 * @description Reset password will be validating the token with expired or not
 * @protected This will validdate the token and reset the password 
 * @access Admin
 */
adminRoute.post("/reset-password", AdminResetPasswordController);
adminRoute.get("/reset-password", CheckingResetToken);

/**
 * @section Protected Routes
 * All routes below this middleware require a valid JWT token.
 * The routes are managed under 'admin_protected_routes'.
 * 
 * @middleware AdminAuthenticateJWTtoken
 * This middleware checks the validity of the JWT token before granting access.
 */
adminRoute.use(AdminAuthenticateJWTtoken, admin_protected_routes)

module.exports = adminRoute;