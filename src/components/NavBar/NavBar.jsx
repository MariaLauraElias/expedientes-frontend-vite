import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCollapse,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import AuthContext from "../../contexts/AuthContext";



export default function NavBar() {
  const { state: user, logout } = useContext(AuthContext);
  const isAdmin = user && user.nivel_permiso === "ADM" ? true : false;
  const [showBasic, setShowBasic] = useState(false);

  const onLogout = () => {
    alert("¿quiere cerrar sesión?");
    logout();
  };
  //defino aquí estas lineas de estilo porque son dinámicas
  let activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img
              src="logolegislatura.png"
              height="30"
              alt="logo legislatura"
              loading="lazy"
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right className="mb-2 mb-lg-0">
              <MDBNavbarItem active>
                {user && (
                  <NavLink
                    to={"/"}
                    className={"nav-link"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Home
                  </NavLink>
                )}
              </MDBNavbarItem>
              <MDBNavbarItem>
                {user && (
                  <NavLink
                    to={"/consulta"}
                    className={"nav-link"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Consulta Expediente
                  </NavLink>
                )}
              </MDBNavbarItem>
              <MDBNavbarItem>
                {isAdmin && (
                  <NavLink
                    to={"/ingresoexpediente"}
                    className={"nav-link"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Ingresar Expediente
                  </NavLink>
                )}
              </MDBNavbarItem>
              {isAdmin && (
                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link"
                      role="button"
                    >
                      Administrar Usuarios
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>
                        <NavLink
                          to={"/listarUsuarios"}
                          className={"nav-link"}
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                        >
                          Listar Usuarios
                        </NavLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                        <NavLink
                          to={"/agregarUsuarios"}
                          className={"nav-link"}
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                        >
                          Agregar Usuarios
                        </NavLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              )}

              {user && (
                <MDBBtn
                  outline
                  color="gris"
                  size="sm"
                  type="button"
                  className="ms-auto"
                  onClick={onLogout}
                >
                  Cerrar Sesión
                </MDBBtn>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}
