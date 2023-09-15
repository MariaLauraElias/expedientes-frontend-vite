import React, { useReducer } from "react";
import UserContext from "../contexts/UserContext";
import userReducer from "../reducers/userReducer";
import AxiosInstance from "../config/AxiosInstance";
import { types } from "../types/types";

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer);

  const api = AxiosInstance();

  const getAllUsers = async () => {
    try {
      const { data } = await api.get("/usuarios");
      dispatch({
        type: types.user.getAllType,
        payload: data.usuarios,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data.usuario;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (values) => {
    try {
      const response = await api.post("/usuarios/nuevo", {
        nombre: values.nombre,
        apellido: values.apellido,
        usuario: values.usuario,
        legajo: values.legajo,
        pass: values.pass,
        mail: values.mail,
        nivel_permiso: values.nivel_permiso,
        activo: values.activo,
      });
      if (response.status === 201) {
        dispatch({
          type: types.user.addType,
          payload: values,
        });
      }
      alert("Usuario creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (id, values) => {
    try {
      const response = await api.patch("/usuarios", {
        ...values,
        id_usuario: id,
      });

      if (response.status === 200) {
        const newState = state.map((user) => {
          if (user.id_usuario === id) {
            return { ...user, ...values };
          }
          return state;
        });
        dispatch({
          type: types.user.updateType,
          payload: newState,
        });
      }
      alert("Usuario modificado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete("/usuarios", {
        data: {
          id_usuario: id,
        },
      });
      if (response.status === 200) {
        const newUserList = state.filter((user) => {
          return user.id_usuario !== id;
        });

        dispatch({
          type: types.user.deleteType,
          payload: newUserList,
        });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        getAllUsers,
        getUserById,
        updateUser,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
