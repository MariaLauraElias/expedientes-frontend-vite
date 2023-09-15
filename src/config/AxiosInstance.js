import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; 

const instance = axios.create({
  baseURL: 'https://localhost:4000', 
  headers: {
    'Content-Type': 'application/json',
    // Otros encabezados si es necesario
  },
});

//creo una isntancia de axios que tenga como base de datos la url de mi backend
const AxiosInstance = () => {
  const { state: user } = useContext(AuthContext); 

  if (user && user.token) {
    instance.defaults.headers.common['authorization'] = `Bearer ${user.token}`;
  } else {
    delete instance.defaults.headers.common['authorization'];
  }

  return instance;
};

export default AxiosInstance;

