import React, { useReducer} from "react";
import AuthContext from "../contexts/AuthContext";
import authReducer from "../reducers/authReducer"
import axios from "axios";
import { types } from "../types/types";

const loggedUser = JSON.parse(window.sessionStorage.getItem("loggedUser"));
const initialState = loggedUser ? loggedUser : null;

export const AuthProvider = ({ children }) => {

 const [state, dispatch] = useReducer(authReducer, initialState)

  
  const login = async (values) => {
        
      try {
        const response = await axios.post("http://localhost:3000/login", {
          usuario: values.usuario,
          pass: values.pass,
        });
  
        window.sessionStorage.setItem(
          "loggedUser",
          JSON.stringify(response.data)
        );
          dispatch({
            type: types.auth.loginType,
            payload: response.data
          })
  
      } catch (error) {
        // Si ocurre un error, puedes manejarlo aquí, por ejemplo, mostrando un mensaje de error al usuario.
        alert(error.response.data.mensaje);
      }
      
  };
  
  const logout = () => {
    window.sessionStorage.removeItem("loggedUser");
    dispatch({
      type: types.auth.logoutType,
      payload: null
    })
  };

  
  return (
    <AuthContext.Provider value={{ state,  login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
