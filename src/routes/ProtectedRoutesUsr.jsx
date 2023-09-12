import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutesUsr = ( {children} ) => {
  const {state: user} = useContext(AuthContext)
  
  if (user && (user.nivel_permiso === 'USR' || user.nivel_permiso === 'ADM' || user.nivel_permiso === 'USRF')){
    return children
  }else{
    return <Navigate to={'/'} />
  }
}

export default ProtectedRoutesUsr