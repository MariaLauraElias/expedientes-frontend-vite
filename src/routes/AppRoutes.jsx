import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layouts/Dashboard";
import LoginForm from "../layouts/LoginForm";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
        index={true}
          path="/"
          element={
            <PublicRoutes>
              <LoginForm />
            </PublicRoutes>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
