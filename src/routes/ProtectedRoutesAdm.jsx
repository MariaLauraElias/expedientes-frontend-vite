import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutesAdm = ( {children} ) => {
  const {state} = useContext(AuthContext)
  
  return (state.isLogged && state.user.nivel_permiso === 'ADM')?
  children : <Navigate to="/" />
}

export default ProtectedRoutesAdm


