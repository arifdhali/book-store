const express = require("express");
const adminRoute = express.Router();
const { AdminLogin } = require("../controllers/auth/admin.controller");

adminRoute.get("/", (req, res) => {
    res.send("Working");
})



adminRoute.post("/login", AdminLogin);

module.exports = adminRoute;