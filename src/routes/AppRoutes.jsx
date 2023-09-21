import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import GeneralLayout from "../layouts/GeneralLayout";
import LoginForm from "../layouts/LoginForm";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
        index={true}
          path="/auth"
          element={
            <PublicRoutes>
              <LoginForm />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <GeneralLayout />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
