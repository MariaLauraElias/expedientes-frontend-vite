import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutesAdm from "./routes/ProtectedRoutesAdm";
import ProtectedRoutesUsr from "./routes/ProtectedRoutesUsr";
import AuthContext from "./contexts/AuthContext";
//import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import FormularioConsulta from "./components/FormularioConsulta/FormularioConsulta";
import IngresoExptedieneForm from "./components/IngresoExpedienteForm/IngresoExptedieneForm";
import NotFound from "./components/Not Found/NotFound";
import LoginForm from "./components/FormularioLogin/LoginForm";
import CrearUsuario from "./components/AdminUsuario/CrearUsuario";
import ListarUsuario from "./components/AdminUsuario/ListarUsuario";
import  Dashboard  from "./pages/Dashboard";

function App() {
  const { state: loggedUser  } = useContext(AuthContext);
  

  return (
    <>
      {/* <NavBar /> */}
      <Dashboard />

      <div className=" text-center pt-5">
        <div className="d-flex justify-content-center align-items-center h-100">
          {/* Aqui deben renderizarse los componentes */}
          <Routes>
            {!loggedUser? (
              <Route path="/" element={<LoginForm />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}

            <Route
              path="/consulta"
              element={
                <ProtectedRoutesUsr>
                  <FormularioConsulta />
                </ProtectedRoutesUsr>
              }
            />
            <Route
              path="/ingresoexpediente"
              element={
                <ProtectedRoutesAdm>
                  <IngresoExptedieneForm />
                </ProtectedRoutesAdm>
              }
            />
            <Route
              path="/listarUsuarios"
              element={
                <ProtectedRoutesAdm>
                  <ListarUsuario  />
                </ProtectedRoutesAdm>
              }
            />
            <Route
              path="/agregarUsuarios"
              element={
                <ProtectedRoutesAdm>
                  <CrearUsuario />
                </ProtectedRoutesAdm>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
