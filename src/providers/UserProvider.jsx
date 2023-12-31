import React, { useReducer } from "react";
import UserContext from "../contexts/UserContext";
import userReducer from "../reducers/userReducer";
import AxiosInstance from "../config/AxiosInstance";
import { types } from "../types/types";

const initialState = { isLoaded: false, users: [] };
//queda pendiente manejar el estado de los mensajes de errores
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const api = AxiosInstance();

  const getAllUsers = async () => {
    try {
      const { data } = await api.get("/usuarios");
      dispatch({
        type: types.user.getAllType,
        payload: {
          isLoaded: true,
          users: data.usuarios,
        },
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
        pass2: values.pass2,
        mail: values.mail,
        nivel_permiso: values.nivel_permiso,
        activo: values.activo,
      });
      if (response.status === 201) {
        dispatch({
          type: types.user.addType,
          payload: {
            isLoaded: true,
            users: values,
          },
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
        const newState = state.users.map((user) => {
          if (user.id_usuario === id) {
            return { ...values, id_usuario: id };
          } else {
            return user;
          }
        });

        dispatch({
          type: types.user.updateType,
          payload: {
            isLoaded: true,
            users: newState,
          },
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
        const newUserList = state.users.filter((user) => {
          return user.id_usuario !== id;
        });

        dispatch({
          type: types.user.deleteType,
          payload: {
            isLoaded: true,
            users: newUserList,
          },
        });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const editarPass = async (id, values) => {
    try {
      const response = await api.patch("/usuarios/changepsw", {
        ...values,
        id_usuario: id,
      });
      if (response.status === 200) {
        dispatch({
          type: types.user.editPass,
          payload: {
            isLoaded: true,
          },
        });
        alert("Contraseña modificada correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarPassPropia = async (values) => {
    try {
      const response = await api.patch("/usuarios/changeselfpsw", {
        ...values,
      });
      if (response.status === 200) {
        dispatch({
          type: types.user.editPassOwn,
          payload: {
            isLoaded: true,
          },
        });
        alert("Contraseña modificada correctamente");
      }
    } catch (error) {
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
        editarPass,
        editarPassPropia,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
