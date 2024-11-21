const express = require("express");
const adminRoute = express.Router();
const { AdminLogin } = require("../controllers/auth/auth.controller");
const { validAdminVerify } = require("../middleware/verify.auth");
const { AddAuthorController, GetAllAuthorsController } = require("../controllers/admin/author.controller");
const uploadMulter = require("../utils/multer");



adminRoute.get("/", validAdminVerify, (req, res) => {
    res.send("Working");
})

// author
const uploadAuthor = uploadMulter("author");
adminRoute.post("/authors/add", uploadAuthor.single('profile_img'), AddAuthorController);
adminRoute.get("/authors/list",GetAllAuthorsController);


// auth
adminRoute.post("/login", AdminLogin);

module.exports = adminRoute;