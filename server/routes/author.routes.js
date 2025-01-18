const express = require("express");
const authorRoute = express.Router();
const validAuthorVerify = require("../middleware/verify.auth");
const { AuthorLogin, AuthorLogout, AuthorRegister } = require("../controllers/auth/author.controller");
const HomepageController = require("../controllers/author/Home.Controller");
const uploadMulter = require("../utils/multer");
const { AddBookController, BookListController, EditBookController, GetSingleBookController, DeleteBookController } = require("../controllers/author/Book.controller");
const { AddCouponController, GetAllCoupons, DeleteCouponsController } = require("../controllers/author/Coupon.controller");
const { GetSubscription } = require("../controllers/author/Subscription.controller");
const { GetOrderContoller } = require("../controllers/author/Order.controller");

const uploadAuthor = uploadMulter("author");
const uploadBook = uploadMulter("book");


authorRoute.get("/", validAuthorVerify, HomepageController)
authorRoute.post("/book/add", uploadBook.single("thumbnail"), AddBookController);
authorRoute.get("/book/list", BookListController);
authorRoute.get("/book/:book_id", GetSingleBookController);
authorRoute.patch("/book/:book_id", uploadBook.single("thumbnail"), EditBookController);
authorRoute.delete("/book/:book_id", DeleteBookController)

authorRoute.post("/coupon/add", AddCouponController);
authorRoute.get("/coupon", GetAllCoupons);
authorRoute.delete("/coupon/:couponID", DeleteCouponsController);

authorRoute.get("/subscription", GetSubscription);

authorRoute.get("/order",GetOrderContoller);


// auth
authorRoute.post("/login", AuthorLogin);
authorRoute.post("/register", uploadAuthor.single('thumbnail'), AuthorRegister);
authorRoute.post("/logout", AuthorLogout);

module.exports = authorRoute;