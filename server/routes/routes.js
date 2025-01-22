const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");
const authorRoute = require("./author.routes");

// admin
route.use("/admin", AdminRouters);
// author
route.use("/author",  authorRoute);


module.exports = route;
