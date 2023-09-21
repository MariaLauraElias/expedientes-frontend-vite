import { useContext } from 'react';
import { Navigate } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const PrivateRoutes = ({children}) => {
  const { state } = useContext(AuthContext);
  return (state.isLogged)?
     children : <Navigate to="/auth" />
}

export default PrivateRoutes