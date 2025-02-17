const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");
const authorRoute = require("./author.routes");

/**
 *   @section Admin Routes
 *   All routes related to admin functionalities are grouped under '/admin'.
 *   @note This route is entry point for all admin routes
 *   
 *   Example:
 *   - /admin/login      => Admin login
 *   - /admin/setting  => Admin settings
 *   
 * @note These routes are managed separately in 'admin.routes.js'
 */

route.use("/admin", AdminRouters);


/**
 *   @section Author Routes
 *   All routes related to author functionalities are grouped under '/author'.
 *   @note This route is entry point for all author routes
 *   
 *   Example:
 *   - /author/login      => Author login
 *   - /author/setting  => Author settings
 *   
 * @note These routes are managed separately in 'author.routes.js'
 */
route.use("/author", authorRoute);

module.exports = route;
