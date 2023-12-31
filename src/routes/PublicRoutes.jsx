import { useContext } from 'react';
import { Navigate } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const PublicRoutes = ({children}) => {
  const { state } = useContext(AuthContext);
  return (!state.isLogged)?
     children : <Navigate to="/" />
}

export default PublicRoutes;