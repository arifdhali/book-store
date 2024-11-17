const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");
const VerifyValidOrNot = require("../middleware/verify.auth");


route.use("/admin", AdminRouters);


module.exports = route;