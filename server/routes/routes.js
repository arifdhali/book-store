const express = require("express");
const route = express.Router();
const AdminRouters = require("./admin.routes");
const AuthorRouters = require("./author.routes");
const validAuthorVerify = require('../middleware/verify.auth');

// admin
route.use("/admin", AdminRouters);
// author
route.use("/author",  AuthorRouters);


module.exports = route;
