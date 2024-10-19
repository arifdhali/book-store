import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout, AuthLayout } from './layouts';
import { AdminHome, Users, Subscription, Authors, Login, ForgotPass } from './pages/admin';
import AppRoute from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './pages/Home';
import ErrorPage from "./404";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path={AppRoute.HOME} element={<Home />} />

          {/* AUTH PAGES */}
          <Route path={AppRoute.AUTH.BASE} element={<AuthLayout />} >
            <Route path={AppRoute.AUTH.ADMIN.LOGIN} element={<Login />} />
            <Route path={AppRoute.AUTH.ADMIN.FORGOTPASS} element={<ForgotPass />} />


          </Route>

        {/* Admin routes */}
        <Route path={AppRoute.ADMIN.BASE} element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          {/* Author routes */}
          <Route path={AppRoute.ADMIN.AUTHORS.BASE}>
            <Route path={AppRoute.ADMIN.AUTHORS.LIST} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.ADD} element={"Add"} />
            <Route path={AppRoute.ADMIN.AUTHORS.SUBSCRIPTIONS} element={<Subscription />} />
            <Route path={`${AppRoute.ADMIN.AUTHORS.VIEW(':id')}`} element={"Specific authors"} />
          </Route>

          <Route path={AppRoute.ADMIN.USERS} element={<Users />} />
        </Route>
        {/* Catch-all route */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
