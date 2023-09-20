import React, { useReducer } from "react";
import AuthContext from "../contexts/AuthContext";
import authReducer from "../reducers/authReducer";
import axios from "axios";
import { types } from "../types/types";


const initialState = { user: null, isLogged: false, errorMessage: "" };
const baseUrl = import.meta.env.VITE_API_URL;

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (values) => {
    try {
      const response = await axios.post(baseUrl + "/login", {
        usuario: values.usuario,
        pass: values.pass,
      });
      // window.sessionStorage.setItem(
      //   "loggedUser",
      //   JSON.stringify(response.data)
      // );
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
