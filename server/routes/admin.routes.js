const express = require("express");
const adminRoute = express.Router();
const { AdminLogin } = require("../controllers/auth/admin.controller");
const { validAdminVerify } = require("../middleware/verify.auth");



adminRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})


adminRoute.post("/login", AdminLogin);

module.exports = adminRoute;