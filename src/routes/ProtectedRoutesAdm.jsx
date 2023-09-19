import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutesAdm = ( {children} ) => {
  const {state} = useContext(AuthContext)
  
  if (state.isLogged && state.user.nivel_permiso === 'ADM'){
    return children
  }else{
    return <Navigate to={'/'} />
  }
}

export default ProtectedRoutesAdm
