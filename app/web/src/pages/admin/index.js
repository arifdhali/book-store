import { lazy } from "react";
const AdminHome = lazy(() => import("./AdminHome"));
const Users = lazy(() => import("./users/Users"));
const Authors = lazy(() => import("./authors/Authors"));
const Subscription = lazy(() => import("./authors/Subscription"));
const Login = lazy(() => import("./auth/Login"));
const ForgotPass = lazy(() => import("./auth/Forgot-pass"));
const AddAuthor = lazy(() => import("./authors/Add"));
const Category = lazy(() => import("./Category"));

export {
    AdminHome,
    Users,
    Authors,
    Subscription,
    Login,
    ForgotPass,
    AddAuthor,
    Category
}