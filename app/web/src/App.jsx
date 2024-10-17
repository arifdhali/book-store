import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { AdminLayout } from './layouts';
import { AdminHome, Users, Subscription, Authors } from './pages/admin';
import AppRoute from "./routes/routes"; // Import as default
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

console.log(AppRoute);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.HOME} element={<Main />} />
        {/* Admin routes */}
        <Route path={AppRoute.ADMIN.BASE} element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path={AppRoute.ADMIN.AUTHORS.BASE}>
            <Route path={AppRoute.ADMIN.AUTHORS.LIST} element={<Authors />} />
            <Route path={AppRoute.ADMIN.AUTHORS.VIEW} element={<Authors />} />
          </Route>
          <Route path={AppRoute.ADMIN.USERS} element={<Users />} />
          <Route path={AppRoute.ADMIN.SUBSCRIPTIONS} element={<Subscription />} />
        </Route>

        {/* Author routes */}
        <Route path='*' element={"Wrong"} />
      </Routes>
    </Router>
  );
}

export default App;
