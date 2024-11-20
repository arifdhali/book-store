const express = require("express");
const adminRoute = express.Router();
const { AdminLogin } = require("../controllers/auth/auth.controller");
const { validAdminVerify } = require("../middleware/verify.auth");
const { AddAuthorController } = require("../controllers/author.controller");
const uploadMulter = require("../utils/multer");



adminRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})

// author
const uploadAuthor = uploadMulter("author");
adminRoute.post("/author/add", uploadAuthor.single('profile_img'), AddAuthorController);


// auth
adminRoute.post("/login", AdminLogin);

module.exports = adminRoute;