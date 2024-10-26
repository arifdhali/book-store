const express = require("express");
const adminRoute = express.Router();


adminRoute.get("/", (req, res) => {
    res.send("Working");
})
adminRoute.post("/login", (req, res) => {
    res.send("Working");
})

module.exports = adminRoute;