import * as React from 'react';
import { useContext } from 'react';
import { NavLink, Navigate} from "react-router-dom";

import AuthContext from '../contexts/AuthContext';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from "@mui/icons-material/Dashboard";

import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";





export default function NavLateral() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { state , logout } = useContext(AuthContext);
  const isAdmin = state.isLogged && state.user.nivel_permiso === "ADM" ? true : false;

  //defino aquí estas lineas de estilo porque son dinámicas
  let activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };

  const onLogout = () => {
    alert("¿quiere cerrar sesión?");
    logout();
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menú
        </ListSubheader>
      }
    >
      {state.isLogged && (
        <NavLink
          to={"/"}
          className={"nav-link"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="H.L.T." />
      </ListItemButton>
      </NavLink>
      )}
      {state.isLogged && (
        <NavLink
          to={"/consulta"}
          className={"nav-link"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
      <ListItemButton>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Consulta" />
      </ListItemButton>
      </NavLink>
      )}
      {isAdmin && (
        <NavLink
          to={"/agregarexpediente"}
          className={"nav-link"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
      <ListItemButton>
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary="Agregar Expte." />
      </ListItemButton>
      </NavLink>
      )}
      {isAdmin && (
        <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Admin. Usuarios" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <NavLink
            to={"/listarUsuarios"}
            className={"nav-link"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Listar Usuarios" />
          </ListItemButton>
          </NavLink>
        </List>
        <List component="div" disablePadding>
        <NavLink
            to={"/agregarUsuarios"}
            className={"nav-link"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar Usuario" />
          </ListItemButton>
          </NavLink>
        </List>
      </Collapse>
      </>
      )}
      <ListItemButton onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItemButton>
    </List>

  );
}