import { lazy } from "react";
const AdminHome = lazy(() => import("./AdminHome"));
const Users = lazy(() => import("./users/Users"));
const Authors = lazy(() => import("./authors/Authors"));
const Subscription = lazy(() => import("./authors/Subscription"));
const Login = lazy(() => import("./auth/Login"));
const ForgotPass = lazy(() => import("./auth/Forgot-pass"));
const AddAuthor = lazy(() => import("./authors/Add"));
const EditAuthor = lazy(() => import("./authors/Edit"));
const Category = lazy(() => import("./category/Category"));
const CategoryAdd = lazy(() => import("./category/Add"))

export {
    AdminHome,
    Users,
    Authors,
    Subscription,
    Login,
    ForgotPass,
    AddAuthor,
    EditAuthor,
    Category,
    CategoryAdd
}