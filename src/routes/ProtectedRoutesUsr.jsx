import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutesUsr = ( {children} ) => {
  const {state} = useContext(AuthContext)
  
  if (state.isLogged ){
    return children? children : <Outlet />
  }else{
    return <Navigate to={'/'} />
  }
}

export default ProtectedRoutesUsr