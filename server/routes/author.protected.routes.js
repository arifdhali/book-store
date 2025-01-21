const express = require("express");
const author_protected_routes = express.Router();
const validAuthorVerify = require("../middleware/verify.auth");
const HomepageController = require("../controllers/author/Home.Controller");
const uploadMulter = require("../utils/multer");
const { AddBookController, BookListController, EditBookController, GetSingleBookController, DeleteBookController } = require("../controllers/author/Book.controller");
const { AddCouponController, GetAllCoupons, DeleteCouponsController } = require("../controllers/author/Coupon.controller");
const { GetSubscription } = require("../controllers/author/Subscription.controller");
const { GetOrderContoller } = require("../controllers/author/Order.controller");
const { SettingController } = require("../controllers/author/Settings.controller");

const uploadBook = uploadMulter("book");


author_protected_routes.get("/", validAuthorVerify, HomepageController)
author_protected_routes.post("/book/add", uploadBook.single("thumbnail"), AddBookController);
author_protected_routes.get("/book/list", BookListController);
author_protected_routes.get("/book/:book_id", GetSingleBookController);
author_protected_routes.patch("/book/:book_id", uploadBook.single("thumbnail"), EditBookController);
author_protected_routes.delete("/book/:book_id", DeleteBookController)

author_protected_routes.post("/coupon/add", AddCouponController);
author_protected_routes.get("/coupon", GetAllCoupons);
author_protected_routes.delete("/coupon/:couponID", DeleteCouponsController);

author_protected_routes.get("/subscription", GetSubscription);

author_protected_routes.get("/order", GetOrderContoller);
author_protected_routes.get("/settings", SettingController);

module.exports = author_protected_routes;