import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import LoginForm from "./components/FormularioLogin/LoginForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const { state } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!state.isLogged ? (
            <Route path="/" element={<LoginForm />} />
          ) : (
            <Route path="/*" element={<Dashboard />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
