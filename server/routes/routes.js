const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");
const AuthorRouters = require("./author.routes");


// admin
route.use("/admin", AdminRouters);
// author
route.use("/author", AuthorRouters);


module.exports = route;