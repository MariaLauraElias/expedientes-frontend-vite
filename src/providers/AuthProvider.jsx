import React, { useReducer } from "react";
import AuthContext from "../contexts/AuthContext";
import authReducer from "../reducers/authReducer";
import axios from "axios";
import { types } from "../types/types";

//const loggedUser = JSON.parse(window.sessionStorage.getItem("loggedUser"));
//el estado inicial no deberia ser el storage

const initialState = { user: null, isLogged: false, errorMessage: "" };

//const initialState = loggedUser ? loggedUser : null;
//si uso la estructura del authReducer, en el initialState debo poner la misma estructura con el user y el is logged y el error message
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (values) => {
    try {
      const response = await axios.post("https://localhost:4000/login", {
        usuario: values.usuario,
        pass: values.pass,
      });

      window.sessionStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data)
      );
      dispatch({
        type: types.auth.loginType,
        payload: {
          user: response.data,
        },
      });
    } catch (error) {
      // Si ocurre un error, puedes manejarlo aquí, por ejemplo, mostrando un mensaje de error al usuario.
      alert(error.response.data.mensaje);
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem("loggedUser");

    dispatch({
      type: types.auth.logoutType,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
