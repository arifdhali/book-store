const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout } = require("../controllers/auth/admin.controller");
const AuthenticateJWTtoken = require("../middleware/verify.auth")
const AuthorizedRole = require("../middleware/roleVerify")
const admin_protected_routes = require("./admin.protected.routes");


// auth
adminRoute.post("/login", AdminLogin);
adminRoute.post("/logout", AdminLogout);

/*
@ all protected routes here under the admin_protected_routes
*/
adminRoute.use(AuthenticateJWTtoken, AuthorizedRole(['admin']), admin_protected_routes)

module.exports = adminRoute;