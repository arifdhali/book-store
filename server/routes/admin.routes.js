const express = require("express");
const adminRoute = express.Router();
const { AdminLogin, AdminLogout } = require("../controllers/auth/admin.controller");
const admin_protected_routes = require("./admin.protected.routes");
const AdminAuthenticateJWTtoken = require("../middleware/admin.auth");


// auth
adminRoute.post("/login", AdminLogin);
adminRoute.post("/logout", AdminLogout);

/*
   @ all protected routes here under the admin_protected_routes
*/
adminRoute.use(AdminAuthenticateJWTtoken, admin_protected_routes)

module.exports = adminRoute;