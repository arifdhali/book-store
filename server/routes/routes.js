const express = require("express");
const route = express.Router();
const AdminRouters = require("./Admin");

route.use("/admin", AdminRouters);

module.exports = route;