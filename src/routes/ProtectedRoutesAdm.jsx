import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutesAdm = ( {children} ) => {
  const {state: user} = useContext(AuthContext)
  
  if (user && user.nivel_permiso === 'ADM'){
    return children
  }else{
    return <Navigate to={'/'} />
  }
}

export default ProtectedRoutesAdm
