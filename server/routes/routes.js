const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");

route.use("/admin", AdminRouters);


module.exports = route;