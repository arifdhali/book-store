const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout } = require("../controllers/auth/admin.controller");
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
 * @section Protected Routes
 * All routes below this middleware require a valid JWT token.
 * The routes are managed under 'admin_protected_routes'.
 * 
 * @middleware AdminAuthenticateJWTtoken
 * This middleware checks the validity of the JWT token before granting access.
 */
adminRoute.use(AdminAuthenticateJWTtoken, admin_protected_routes)

module.exports = adminRoute;